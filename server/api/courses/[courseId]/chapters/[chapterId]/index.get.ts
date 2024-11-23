import { Attachment, Chapter } from "@prisma/client";
import db from "~/utils/db";

export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    if (session.user && event.context.params?.courseId) {


        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId: session.user?.id,
                    courseId: event.context.params?.courseId
                }
            }
        })

        const course = await db.course.findUnique({
            where: {
                id: event.context.params.courseId,
                isPublished: true,
            },
            select: {
                price: true,
            },
        })


        const chapter = await db.chapter.findUnique({
            where: {
                courseId: event.context.params?.courseId,
                id: event.context.params?.chapterId,
                isPublished: true
            }
        })

        if (!chapter || !course) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Chapter or course no found',
            });
        }

        let attachments: Attachment[] = [];
        let nextChapter: Chapter | null = null


        if (purchase) {
            attachments = await db.attachment.findMany({
                where: {
                    courseId: event.context.params.courseId
                }
            })
        }

        if (chapter.isFree || purchase) {

            nextChapter = await db.chapter.findFirst({
                where: {
                    courseId: event.context.params.courseId,
                    isPublished: true,
                    position: {
                        gt: chapter.position
                    }
                },
                orderBy: {
                    position: 'asc'
                }
            })
        }

        const userProgress = await db.userProgress.findUnique({
            where: {
                userId_chapterId: {
                    userId: session.user?.id,
                    chapterId: event.context.params?.chapterId
                }
            }
        })

        return {
            course,
            chapter,
            purchase,
            attachments,
            nextChapter,
            userProgress
        };

    }
})