import { Purchase, Course } from "@prisma/client";
import db from "~/utils/db";

type PurchaseWithCourse = Purchase & {
    course: Course
}

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
    const grouped: {
        [courseTitle: string]: number
    } = {}

    purchases.forEach(purchase => {
        const title = purchase.course.title;
        if (!grouped[title]) {
            grouped[title] = 0
        }
        grouped[title] += purchase.course.price!
    })

    return grouped;
}


export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    if (session.user) {

        const purchasedCourses = await db.purchase.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                course: true
            }

        })

        const groupedEarning = groupByCourse(purchasedCourses);

        const data = Object.entries(groupedEarning).map(([courseTitle, total]) => ({
            total,
            name: courseTitle,
        }))

        const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
        const totalSales = purchasedCourses.length;

        return {
            data,
            totalSales,
            totalRevenue
        }

    }
})