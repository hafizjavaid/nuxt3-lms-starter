<template>
</template>

<script setup lang="ts">
const { params } = useRoute();

const { data: course, status } = await useLazyFetch(`/api/courses/${params.courseId}`, {
    key: `course-${params.courseId}`,
})
watchEffect(() => {
    if (status.value !== 'pending' && course.value && !params.chapterId) {
        navigateTo(`/courses/${params.courseId}/chapters/${course.value.chapters[0].id}`)
    }
})
</script>

<style scoped></style>