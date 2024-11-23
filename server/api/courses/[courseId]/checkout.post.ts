import type { H3Event } from 'h3';
import db from '~/utils/db';
import Stripe from 'stripe'
import { stripe } from '~/server/utils';
export default defineEventHandler(async (event: H3Event) => {

    // For Route Protection
    await requireUserSession(event);
    const userSession = await getUserSession(event)

    const course = await db.course.findUnique({
        where: {
            id: event.context.params?.courseId,
            isPublished: true,
        },
    })
    if (!course) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Not Found',
        });

    }
    if (userSession.user && event.context.params?.courseId) {

        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId: userSession.user.id,
                    courseId: event.context.params?.courseId,
                },
            },
        })

        if (purchase) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Already Purchased',
            });
        }
        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
            {
                quantity: 1,
                price_data: {
                    currency: 'usd',
                    unit_amount: Math.round(course.price! * 100),
                    product_data: {
                        name: course.title,
                        description: course.description!,
                    },
                },
            },
        ]

        let stripeCustomer = await db.stripeCustomer.findUnique({
            where: {
                userId: userSession.user.id,
            },
            select: {
                stripeCustomerId: true,
            },
        })

        if (!stripeCustomer) {
            const customer = await stripe.customers.create({
                email: userSession.user.email
            })

            stripeCustomer = await db.stripeCustomer.create({
                data: {
                    userId: userSession.user.id,
                    stripeCustomerId: customer.id,
                },
            })
        }

        const stripeSession = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            payment_method_types: ['card'],
            customer: stripeCustomer.stripeCustomerId,
            // Replace with ENV Variable
            cancel_url: `http://localhost:3000/courses/${course.id}?canceled=1`,
            success_url: `http://localhost:3000/courses/${course.id}?success=1`,
            metadata: {
                userId: userSession.user.id,
                courseId: course.id,
            },
        })

        return stripeSession.url
    }

})