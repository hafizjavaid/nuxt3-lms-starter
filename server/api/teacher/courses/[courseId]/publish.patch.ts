import db from "~/utils/db";
import { chapterSchema } from "~/utils/schemas";

export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    if (session.user) {

        const course = await db.course.findUnique({
            where: {
                userId: session.user?.id,
                id: event.context.params?.courseId
            },
            include: {
                chapters: true
            }
        })

        if (!course) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Course Not found'
            })
        }

        const hasPublishedChapters = course.chapters.some(chapter => chapter.isPublished);


        if (!course.title ||
            !course.imageUrl ||
            !course.categoryId ||
            !course.description ||
            !course.price ||
            !hasPublishedChapters) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Missing required fields',
            });

        }


        const publishedCourse = await db.course.update({
            where: {
                userId: session.user?.id,
                id: event.context.params?.courseId
            },
            data: {

                isPublished: true

            }
        })

        return publishedCourse
    }
})