import Stripe from "stripe";
import db from "~/utils/db";

export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    if (session.user) {


        const course = await db.course.findUnique({
            where: {
                id: event.context.params?.courseId,
                isPublished: true
            }
        })

        if (!course) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Course not found'
            })
        }

        if (event.context.params?.courseId) {

            const purchase = await db.purchase.findUnique({
                where: {
                    userId_courseId: {
                        userId: session.user.id,
                        courseId: event.context.params?.courseId
                    }
                }
            })

            if (purchase) {
                throw createError({
                    statusCode: 400,
                    statusMessage: 'Already Purchased'
                })
            }

            let stripeCustomer = await db.stripeCustomer.findUnique({
                where: {
                    userId: session.user.id
                },
                select: {
                    stripeCustomerId: true
                }
            })

            if (!stripeCustomer) {

                const customer = await stripe.customers.create({
                    email: session.user.email
                })

                stripeCustomer = await db.stripeCustomer.create({
                    data: {
                        userId: session.user.id,
                        stripeCustomerId: customer.id
                    }
                })

            }

            const stripeSession = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        quantity: 1,
                        price_data: {
                            currency: 'usd',
                            unit_amount: Math.round(course.price! * 100),
                            product_data: {
                                name: course.title,
                                description: course.description!
                            }
                        }
                    }
                ],
                mode: 'payment',
                payment_method_types: ['card'],
                customer: stripeCustomer.stripeCustomerId,
                cancel_url: `http://localhost:3000/courses/${course.id}?canceled=1`,
                success_url: `http://localhost:3000/courses/${course.id}?success=1`,
                metadata: {
                    userId: session.user.id,
                    courseId: course.id
                }
            })

            return stripeSession.url

        }

    }
})