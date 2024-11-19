import db from "~/utils/db";

export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    const { list } = await readBody(event)


    if (session.user && event.context.params?.courseId) {

        for (let item of list) {

            await db.chapter.update({
                where: {
                    id: item.id,
                },
                data: {
                    position: item.position
                }
            })

        }

        return true


    }
})