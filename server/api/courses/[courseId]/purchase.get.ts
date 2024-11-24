import db from "~/utils/db";

export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    if (session.user && event.context.params?.courseId) {

        return await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId: session.user.id,
                    courseId: event.context.params?.courseId
                }
            }
        })
    }
})