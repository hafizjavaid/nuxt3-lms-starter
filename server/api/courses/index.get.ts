import db from "~/utils/db";

export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    if (session.user) {

        const { title, categoryId }: { title?: string, categoryId?: string } = getQuery(event);

        console.log(title, categoryId);


        const courses = await db.course.findMany({
            where: {
                isPublished: true,
                title: {
                    contains: title,
                    mode: 'insensitive'
                },
                category: {
                    id: categoryId
                }
            },
            include: {
                category: true,
                chapters: {
                    where: {
                        isPublished: true
                    },
                    select: {
                        id: true
                    }
                },
                purchases: {
                    where: {
                        userId: session.user.id
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        const coursesWithProgress = await Promise.all(
            courses.map(async (course) => {
                if (course.purchases.length === 0) {
                    return {
                        ...course,
                        progress: null
                    }
                }
                const progressPercentage = await event.$fetch<null | number>(`http://localhost:3000/api/courses/${course.id}/progress`);
                return {
                    ...course,
                    progress: progressPercentage
                }
            })
        )

        return coursesWithProgress

    }
})