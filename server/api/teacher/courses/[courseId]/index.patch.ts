import db from "~/utils/db";

export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    const data = await readBody(event)

    if (session.user) {

        const course = await db.course.update({
            where: {
                id: event.context.params?.courseId,
                userId: session.user.id
            },
            data: {
                title: data.title,
                description: data.description,
                imageUrl: data.imageUrl,
                categoryId: data.categoryId,
                price: data.price

            }
        })

        return course

        // return await db.course.findUnique({
        //     where: {
        //         userId: session.user.id,
        //         id: event.context.params?.courseId
        //     },
        //     include: {
        //         chapters: {
        //             orderBy: {
        //                 position: 'asc'
        //             }
        //         },
        //         attachments: {
        //             orderBy: {
        //                 createdAt: 'desc'
        //             }
        //         }
        //     }
        // })

    }
})