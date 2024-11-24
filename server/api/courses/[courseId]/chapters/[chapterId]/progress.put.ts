import { Attachment, Chapter } from "@prisma/client";
import db from "~/utils/db";

export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    if (session.user && event.context.params?.courseId && event.context.params?.chapterId) {


        const { isCompleted } = await readBody(event);

        const userProgress = await db.userProgress.upsert({
            where: {
                userId_chapterId: {
                    userId: session.user.id,
                    chapterId: event.context.params.chapterId
                }
            },
            update: {
                isCompleted,
            },
            create: {
                userId: session.user.id,
                isCompleted,
                chapterId: event.context.params.chapterId
            }
        })



        return userProgress;

    }
})