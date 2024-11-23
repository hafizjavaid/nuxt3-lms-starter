import type { H3Event } from 'h3';
import db from '~/utils/db';
export default defineEventHandler(async (event: H3Event) => {
    // For Route Protection
    await requireUserSession(event);
    const session = await getUserSession(event)


    if (session.user?.id && event.context.params?.courseId) {
        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId: session.user.id,
                    courseId: event.context.params?.courseId,
                },
            },
        })
        return purchase
    }
})