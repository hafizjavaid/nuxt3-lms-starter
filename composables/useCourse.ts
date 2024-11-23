import type { Chapter, Course, UserProgress, Purchase } from '@prisma/client'

interface CourseState {
    progressCount: number
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null
        })[]
    } | null
    purchase: Purchase | null

}

const state = reactive<CourseState>({
    course: null,
    progressCount: 0,
    purchase: null
})

export default () => {

    const { course, progressCount, purchase } = toRefs(state);

    const toggleCourse = (course: any) => {
        state.course = course
    }
    const toggleProgressCount = (progressCount: any) => {
        state.progressCount = progressCount
    }
    const togglePurchase = (purchase: any) => {
        state.purchase = purchase
    }


    return {
        course,
        progressCount,
        purchase,
        toggleCourse,
        toggleProgressCount,
        togglePurchase
    }

}