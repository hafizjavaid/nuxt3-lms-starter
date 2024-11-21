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

        return courses

    }
})