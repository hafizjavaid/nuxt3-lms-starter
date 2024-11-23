import type { H3Event } from 'h3';
import db from '~/utils/db';
import type { Course, Purchase } from '@prisma/client'

type PurchaseWithCourse = Purchase & {
    course: Course
}

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
    const grouped: {
        [courseTitle: string]: number
    } = {}

    purchases.forEach(purchase => {
        const courseTitle = purchase.course.title

        if (!grouped[courseTitle]) {
            grouped[courseTitle] = 0
        }

        grouped[courseTitle] += purchase.course.price!
    })

    return grouped
}
export default defineEventHandler(async (event: H3Event) => {
    try {
        // For Route Protection
        await requireUserSession(event);
        const session = await getUserSession(event)
        if (session.user) {
            const purchases = await db.purchase.findMany({
                where: {
                    course: {
                        userId: session.user?.id
                    },
                },
                include: {
                    course: true,
                },
            })

            console.log(purchases);
            

            const groupedEarnings = groupByCourse(purchases)
            const data = Object.entries(groupedEarnings).map(
                ([courseTitle, total]) => ({
                    total,
                    name: courseTitle,
                }),
            )

            const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0)
            const totalSales = purchases.length

            return {
                data,
                totalSales,
                totalRevenue,
            }
        }
    } catch (error) {
        return {
            data: [],
            totalSales: 0,
            totalRevenue: 0,
        }
    }
})