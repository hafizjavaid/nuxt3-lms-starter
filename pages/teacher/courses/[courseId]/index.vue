<template>
    <UAlert v-if="status !== 'pending' && course && !course.isPublished" icon="i-lucide-alert-triangle"
        title="This course is unpublished. It will not be visible to students" color="yellow" variant="soft"></UAlert>

    <div class="p-6">
        <div class="flex items-center justify-between">

            <div class="flex flex-col gap-y-2">
                <h1 class="text-2xl font-medium">Course setup</h1>
                <span class="text-sm text-slate-700">
                    Complete all fields {{ completionText }}
                </span>
            </div>
            <!-- @vue-expect-error -->
            <CourseActions :course="course"></CourseActions>

        </div>

        <div v-if="status !== 'pending' && course" class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div>
                <div class="flex items-center gap-x-2">
                    <UButton icon="i-lucide-layout-dashboard" size="lg" :ui="{ rounded: 'rounded-full' }"
                        variant="soft" />
                    <h2 class="text-xl">Customize your course</h2>
                </div>
                <!-- Course Title Form -->
                <CourseTitleForm :initial-data="course"></CourseTitleForm>
                <!-- Course Description Form -->
                <CourseDescriptionForm :initial-data="course"></CourseDescriptionForm>
                <!-- Course Image Form -->
                <CourseImageForm :initial-data="course"></CourseImageForm>

                <!-- Course Category Form -->
                <CourseCategoryForm v-if="categories" :initial-data="course" :options="categories" ></CourseCategoryForm>




            </div>
            <div class="space-y-6">
                <div class="flex items-center gap-x-2">
                    <UButton icon="i-lucide-list-check" size="lg" :ui="{ rounded: 'rounded-full' }" variant="soft" />
                    <h2 class="text-xl">Course Chapters</h2>
                </div>
                <!-- Course Chapters Form -->
                <div>
                    <div class="flex items-center gap-x-2">
                        <UButton icon="i-lucide-circle-dollar-sign" size="lg" :ui="{ rounded: 'rounded-full' }"
                            variant="soft" />
                        <h2 class="text-xl">Sell your course</h2>
                    </div>
                    <!-- Course Price Form -->
                    <CoursePriceForm :initial-data="course"></CoursePriceForm>
                </div>

                <div>
                    <div class="flex items-center gap-x-2">
                        <UButton icon="i-lucide-file" size="lg" :ui="{ rounded: 'rounded-full' }" variant="soft" />
                        <h2 class="text-xl">Resources & Attachments</h2>
                    </div>
                    <!-- Course Price Form -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'protected',
    layout: 'teacher'
})

const { params } = useRoute();

const { data: course, status } = await useFetch(`/api/teacher/courses/${params.courseId}`, {
    key: `Teacher-Course-${params.courseId}`
})

const { data: categories } = await useFetch('/api/categories')

const requiredFields = computed(() => {
    return [
        course.value?.title,
        course.value?.description,
        course.value?.imageUrl,
        course.value?.price,
        course.value?.categoryId,
        course.value?.chapters.some(chapter => chapter.isPublished),
    ]
})

const totalFields = computed(() => requiredFields.value.length);
const completedFields = computed(() => requiredFields.value.filter(Boolean).length);
const completionText = computed(() => `${completedFields.value}/${totalFields.value}`);
const isComplete = computed(() => requiredFields.value.every(Boolean))

</script>

<style scoped></style>