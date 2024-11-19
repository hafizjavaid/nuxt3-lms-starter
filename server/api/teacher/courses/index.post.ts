import db from "~/utils/db";
import { courseSchema } from "~/utils/schemas";


export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    if (session.user) {

        // const { title } = await readValidatedBody(event, (body) => courseSchema.parse(body))
        const data = await readBody(event);

        if (!data.title) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Title is required'
            })
        }

        return await db.course.create({
            data: {
                title: data.title,
                userId: session.user.id
            }
        })

    }
})