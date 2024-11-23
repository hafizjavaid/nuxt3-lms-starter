import db from "~/utils/db";

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
                chapters: {
                    where: {
                        isPublished: true
                    },
                    include: {
                        userProgress: {
                            where: {
                                userId: session.user.id
                            }
                        }
                    },
                    orderBy: {
                        position: 'asc'
                    }
                }
            }
        })

        return course;

    }
})