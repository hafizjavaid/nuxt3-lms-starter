import db from "~/utils/db";

export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    const data = await readBody(event)

    if (!data.attachmentUrl) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Attachment is required'
        })
    }

    if (session.user && event.context.params?.courseId) {


        const attachment = await db.attachment.create({
            data: {
                url: data.attachmentUrl,
                name: data.attachmentUrl.split('/').pop(),
                courseId: event.context.params?.courseId
            }
        })

        return attachment;


    }
})