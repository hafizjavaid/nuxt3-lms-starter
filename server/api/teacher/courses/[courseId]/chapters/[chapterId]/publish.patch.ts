import db from "~/utils/db";
import { chapterSchema } from "~/utils/schemas";

export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    const chapterData = await readBody(event);

    if (!chapterData ||
        !chapterData.title ||
        !chapterData.videoUrl ||
        !chapterData.description) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Missing required fields',
        });

    }


    if (session.user) {

        const chapter = await db.chapter.update({
            where: {
                id: event.context.params?.chapterId,
                courseId: event.context.params?.courseId,
            },
            data: {

                isPublished: true

            }
        })

        return chapter
    }
})