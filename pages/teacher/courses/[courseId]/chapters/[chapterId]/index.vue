<template>
    <UAlert v-if="status !== 'pending' && chapter && !chapter.isPublished" icon="i-lucide-alert-triangle"
        title="This chapter is unpublished. It will not be visible in the course" color="yellow" variant="soft">
    </UAlert>

    <div class="p-6">

        <div class="flex items-center justify-between">

            <div class="w-full">

                <UButton icon="i-lucide-arrow-left" variant="ghost" label=" Back to course setup" :trailing="false"
                    :to="`/teacher/courses/${params.courseId}`" />

                <div class="flex items-center justify-between w-full">

                    <div class="flex flex-col gap-y-2">
                        <h1 class="text-2xl font-medium">Chapter setup</h1>
                        <span class="text-sm text-slate-700">
                            Complete all fields {{ completionText }}
                        </span>
                    </div>
                    <ChaptersActions :chapter="chapter"></ChaptersActions>
                </div>

            </div>

        </div>
        <div v-if="status !== 'pending' && chapter" class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div>
                <div class="flex items-center gap-x-2">
                    <UButton icon="i-lucide-layout-dashboard" size="lg" :ui="{ rounded: 'rounded-full' }"
                        variant="soft" />
                    <h2 class="text-xl">Customize your chapter</h2>
                </div>
                <!-- Course Title Form -->
                <ChaptersTitleForm :initial-data="chapter"></ChaptersTitleForm>
                <!-- Course Description Form -->
                <ChaptersDescriptionForm :initial-data="chapter"></ChaptersDescriptionForm>
            </div>
            <div>
                <div class="flex items-center gap-x-2">
                    <UButton icon="i-lucide-layout-dashboard" size="lg" :ui="{ rounded: 'rounded-full' }"
                        variant="soft" />
                    <h2 class="text-xl">Customize your chapter</h2>
                </div>
                <ChaptersAccessForm :initial-data="chapter" ></ChaptersAccessForm>
                <!-- Chapter Video Form -->
                <ChaptersVideoForm :initial-data="chapter"></ChaptersVideoForm>


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

const { data: chapter, status } = await useFetch<any>(`/api/teacher/courses/${params.courseId}/chapters/${params.chapterId}`, {
    key: `Teacher-Chapter-${params.chapterId}`
})


const requiredFields = computed(() => {
    return [
        chapter.value?.title,
        chapter.value?.description,
        chapter.value?.videoUrl,
    ]
})

const totalFields = computed(() => requiredFields.value.length);
const completedFields = computed(() => requiredFields.value.filter(Boolean).length);
const completionText = computed(() => `${completedFields.value}/${totalFields.value}`);
const isComplete = computed(() => requiredFields.value.every(Boolean))
</script>

<style scoped></style>