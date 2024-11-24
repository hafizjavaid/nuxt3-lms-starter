<template>

</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'protected'
})

const { params } = useRoute();

const { data: course, status } = await useFetch(`/api/courses/${params.courseId}`, {
    key: `course-${params.courseId}`
})


watchEffect(() => {


    if (status.value !== 'pending' && course.value) {

        navigateTo(`/courses/${params.courseId}/chapters/${course.value.chapters[0].id}`)

    }

})

</script>

<style scoped></style>