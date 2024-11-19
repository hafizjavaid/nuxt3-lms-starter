import db from "~/utils/db";

export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    if (session.user && event.context.params?.courseId) {

        const attachment = await db.attachment.delete({
            where: {
                courseId: event.context.params?.courseId,
                id: event.context.params.attachmentId
            }
        })

        return attachment;


    }
})