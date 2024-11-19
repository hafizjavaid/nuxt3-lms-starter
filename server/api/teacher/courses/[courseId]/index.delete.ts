import db from "~/utils/db";
import cloudinary from 'cloudinary'
import { deleteResourceFromCloudinary } from "~/server/utils";

export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);


    if (session.user) {

        const course = await db.course.findUnique({
            where: {
                id: event.context.params?.courseId,
                userId: session.user.id
            },
            include: {
                chapters: true,
                attachments: true
            }
        })

        if (!course) {
            throw createError({
                statusCode: 404,
                statusMessage: 'course Not found'
            })
        }

        for (const chapter of course.chapters) {
            if (chapter.videoUrl) {
                // Delete Resource 
                await deleteResourceFromCloudinary(chapter.videoUrl, true);
            }
        }

        for (const attachment of course.attachments) {
            if (attachment.url) {
                await deleteResourceFromCloudinary(attachment.url, false);

            }
        }
        if (course.imageUrl) {
            await deleteResourceFromCloudinary(course.imageUrl, false);
        }

        const deletedCourse = await db.course.delete({
            where: {
                id: event.context.params?.courseId,
                userId: session.user.id
            }
        })

        return deletedCourse;

    }
})