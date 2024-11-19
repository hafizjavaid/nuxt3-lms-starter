import db from "~/utils/db";
import { chapterSchema } from "~/utils/schemas";

export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    if (session.user) {

        const chapter = await db.chapter.update({
            where: {
                id: event.context.params?.chapterId,
                courseId: event.context.params?.courseId,
            },
            data: {

                isPublished: false

            }
        })

        const publishedChaptersInACourse = await db.chapter.findMany({
            where: {
                courseId: event.context.params?.courseId,
                isPublished: true
            }
        })

        if (!publishedChaptersInACourse.length) {

            await db.course.update({
                where: {
                    id: event.context.params?.courseId
                },
                data: {
                    isPublished: false
                }
            })

        }

        return chapter
    }
})