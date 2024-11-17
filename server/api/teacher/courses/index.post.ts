import db from "~/utils/db";
import { courseSchema } from "~/utils/schemas";


export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    if (session.user) {

        const { title } = await readValidatedBody(event, (body) => courseSchema.parse(body))

        return await db.course.create({
            data: {
                title,
                userId: session.user.id
            }
        })

    }
})