<template>
    <div class="h-full">
        <div class="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
            <CourseNavbar />
        </div>
        <div class="fixed inset-y-0 z-50 flex-col hidden h-full md:flex w-80">
            <CourseSidebar />
        </div>
        <main class="h-full md:pl-80 pt-[80px] p-4">
            <slot />
        </main>
    </div>
</template>

<script setup lang="ts">

const { params } = useRoute();

const { data: course, status } = await useFetch(`/api/courses/${params.courseId}`, {
    key: `course-${params.courseId}`,
    server: false
})
const { data: coursePurchase, status: coursePurchaseStatus } = await useFetch(`/api/courses/${params.courseId}/purchase`, {
    key: `purchase-${params.courseId}`,
    server: false
})
const { data: courseProgress, status: courseProgressStatus } = await useFetch(`/api/courses/${params.courseId}/progress`, {
    key: `progress-${params.courseId}`,
    server: false
})


watchEffect(() => {
    if (status.value !== 'pending' && course.value && !params.chapterId) {
        navigateTo(`/courses/${params.courseId}/chapters/${course.value.chapters[0].id}`)
    }
})

</script>

<style scoped></style>