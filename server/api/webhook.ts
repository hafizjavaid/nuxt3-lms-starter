import Stripe from "stripe"
import db from '~/utils/db'




export default defineEventHandler(async (event) => {
    const signature = getHeader(event, 'Stripe-Signature') as string;
    console.log(signature, 'signature');

    const body = await readRawBody(event);
    // Verify the webhook signature
    let stripeEvent: Stripe.Event
    try {
        // @ts-ignore
        stripeEvent = stripe.webhooks.constructEvent(body, signature, useRuntimeConfig().stripeWebhookSecret);
    } catch (error) {
        console.error(error);
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid signature',
        });
    }
    const session = stripeEvent.data.object as Stripe.Checkout.Session
    const userId = session?.metadata?.userId
    const courseId = session?.metadata?.courseId
    if (stripeEvent.type === 'checkout.session.completed') {
        if (!userId || !courseId) {

            throw createError({
                statusCode: 400,
                statusMessage: 'Webhook Error: Missing metadata',
            });
        }

        await db.purchase.create({
            data: {
                userId,
                courseId,
            },
        })
    } else {
        throw createError({
            statusCode: 200,
            statusMessage: `Webhook Error: Unhandled event type ${stripeEvent.type}`,
        });
    }
    return 200;
});