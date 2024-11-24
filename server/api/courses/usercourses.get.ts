import db from "~/utils/db";
import type { Category, Chapter, Course } from '@prisma/client'

type CourseWithProgressWithCategory = Course & {
    category: Category
    chapters: Chapter[]
    progress: number | null
}


export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    if (session.user) {


        const purchasedCourses = await db.purchase.findMany({
            where: {
                userId: session.user.id
            },
            select: {
                course: {
                    include: {
                        category: true,
                        chapters: {
                            where: {
                                isPublished: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'desc'
            }

        })

        const courses = purchasedCourses.map(purchase => purchase.course) as CourseWithProgressWithCategory[];

        for (let course of courses) {

            const progress = await event.$fetch<null | number>(`http://localhost:3000/api/courses/${course.id}/progress`);
            course['progress'] = progress

        }

        const completedCourses = courses.filter(course => course.progress === 100);
        const coursesInProgress = courses.filter(course => (course.progress ?? 0) < 100);


        return {
            completedCourses,
            coursesInProgress,
            allCourses: courses
        }


    }
})