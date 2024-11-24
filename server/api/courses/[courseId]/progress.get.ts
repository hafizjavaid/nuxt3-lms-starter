import db from "~/utils/db";

export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    if (session.user) {

        const publishedChapters = await db.chapter.findMany({
            where: {
                courseId: event.context.params?.courseId,
                isPublished: true,
            },
            select: {
                id: true
            }
        })

        const publishedChaptersIds = publishedChapters.map(chapter => chapter.id);

        const validCompletedChapters = await db.userProgress.count({
            where: {
                userId: session.user.id,
                isCompleted: true,
                chapterId: {
                    in: publishedChaptersIds
                }
            }
        })

        const progressPercentage = (validCompletedChapters / publishedChapters.length) * 100;

        return progressPercentage;

    }
})