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
                description: data.description ? data.description : null,
                imageUrl: data.imageUrl ? data.imageUrl : null,
                categoryId: data.categoryId ? data.categoryId : null,
                price: data.price ? data.price : null

            }
        })

        return course
    }
})