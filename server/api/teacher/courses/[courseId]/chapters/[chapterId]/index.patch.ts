import db from "~/utils/db";

export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    const data = await readBody(event)

    if (session.user) {

        const chapter = await db.chapter.update({
            where: {
                id: event.context.params?.chapterId,
                courseId: event.context.params?.courseId,
            },
            data: {
                title: data.title,
                description: data.description,
                videoUrl: data.videoUrl,
                isFree: data.isFree,

            }
        })

        return chapter
    }
})