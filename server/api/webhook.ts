import Stripe from "stripe";
import db from "~/utils/db";

export default defineEventHandler(async (event) => {

    const signature = getHeader(event, 'Stripe-Signature') as string;

    const body = await readRawBody(event);


    let stripeEvent: Stripe.Event;

    try {

        // @ts-ignore
        stripeEvent = stripe.webhooks.constructEvent(body, signature, useRuntimeConfig().stripeWebhookSecret);


    } catch (error) {
        console.log(error);
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid Signature'
        })

    }

    const session = stripeEvent.data.object as Stripe.Checkout.Session;

    const userId = session.metadata?.userId;
    const courseId = session.metadata?.courseId;

    if (stripeEvent.type === 'checkout.session.completed') {
        if (!userId || !courseId) {
            throw createError({
                statusCode: 400,
                statusMessage: 'webhooks error: Missing MetaData'
            })
        }

        await db.purchase.create({
            data: {
                userId,
                courseId
            }
        })
    }

    // else {
    //     throw createError({
    //         statusCode: 400,
    //         statusMessage: 'webhooks error: Unhandled event type'
    //     })
    // }

    return 200;


})