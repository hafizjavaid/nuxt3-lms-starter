import type { H3Event } from 'h3';
import db from '~/utils/db';

export default defineEventHandler(async (event: H3Event) => {

    // For Route Protection
    await requireUserSession(event);
    const session = await getUserSession(event)
    const { isCompleted } = await readBody(event);
    if (session.user?.id && event.context.params?.chapterId) {
        const userProgress = await db.userProgress.upsert({
            where: {
                userId_chapterId: {
                    userId: session.user?.id,
                    chapterId: event.context.params?.chapterId,
                },
            },
            update: {
                isCompleted,
            },
            create: {
                userId: session.user?.id,
                isCompleted,
                chapterId: event.context.params?.chapterId,
            },
        })

        return userProgress
    }


})