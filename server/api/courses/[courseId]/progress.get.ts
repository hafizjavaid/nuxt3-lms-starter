import type { H3Event } from 'h3';
import db from '~/utils/db';
export default defineEventHandler(async (event: H3Event) => {
    // For Route Protection
    await requireUserSession(event);
    const session = await getUserSession(event)
    const publishedChapters = await db.chapter.findMany({
        where: {
            courseId: event.context.params?.courseId,
            isPublished: true,
        },
        select: {
            id: true,
        },
    })
    const publishedChapterIds = publishedChapters.map(({ id }) => id)

    const validCompletedChapters = await db.userProgress.count({
        where: {
            userId: session.user?.id,
            isCompleted: true,
            chapterId: {
                in: publishedChapterIds,
            },
        },
    })
    const progressPercentage = (validCompletedChapters / publishedChapters.length) * 100
    return progressPercentage
})