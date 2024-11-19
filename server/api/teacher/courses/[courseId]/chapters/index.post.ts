import db from "~/utils/db";

export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    const { title } = await readBody(event)

    if (!title) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Title is required'
        })
    }

    if (session.user && event.context.params?.courseId) {


        const lastChapter = await db.chapter.findFirst({
            where: {
                courseId: event.context.params.courseId
            },
            orderBy: {
                position: 'desc'
            }
        })

        const newPosition = lastChapter ? lastChapter.position + 1 : 1;

        const chapter = await db.chapter.create({
            data: {
                title,
                courseId: event.context.params.courseId,
                position: newPosition
            }
        })

        return chapter;



    }
})