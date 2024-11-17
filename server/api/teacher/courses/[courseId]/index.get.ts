import db from "~/utils/db";

export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    if (session.user) {

        return await db.course.findUnique({
            where: {
                userId: session.user.id,
                id: event.context.params?.courseId
            },
            include: {
                chapters: {
                    orderBy: {
                        position: 'asc'
                    }
                },
                attachments: {
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        })

    }
})