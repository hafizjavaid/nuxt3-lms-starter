import db from "~/utils/db";

export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    if (session.user) {

        return await db.chapter.findUnique({
            where: {
                id: event.context.params?.chapterId,
                courseId: event.context.params?.courseId
            },
        })

    }
})