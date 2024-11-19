import db from "~/utils/db";
import cloudinary from 'cloudinary'

export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);


    if (session.user) {

        const chapter = await db.chapter.findUnique({
            where: {
                id: event.context.params?.chapterId,
                courseId: event.context.params?.courseId
            },
        })

        if (!chapter) {
            throw createError({
                statusCode: 404,
                statusMessage: 'chapter Not found'
            })
        }
        if (chapter.videoUrl) {

            cloudinary.v2.config({
                api_key: useRuntimeConfig().cloudinaryApiKey,
                api_secret: useRuntimeConfig().cloudinaryApiSecret,
                cloud_name: useRuntimeConfig().public.cloudinaryCloudName,
            })
            const name = chapter.videoUrl.split('.')[chapter.videoUrl.split('.').length - 2].split('/').pop()

            if (name) {
                await cloudinary.v2.uploader.destroy(name, {
                    resource_type: 'video'
                })
            }

        }

        const deletedChapter = await db.chapter.delete({
            where: {
                id: event.context.params?.chapterId,
                courseId: event.context.params?.courseId
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

        return deletedChapter

    }
})