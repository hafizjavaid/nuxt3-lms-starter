<template>
    <div>
        <pre>
            {{ course }}
        </pre>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'chapter',
    middleware: 'protected'
})

const { params } = useRoute();

const { data: course, status } = await useFetch(`/api/courses/${params.courseId}`)


watchEffect(() => {


    if (status.value !== 'pending' && course.value) {

        navigateTo(`/courses/${params.courseId}/chapters/${course.value.chapters[0].id}`)

    }

})

</script>

<style scoped></style>