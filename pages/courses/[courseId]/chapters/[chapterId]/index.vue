<template>
    <div v-if="status !== 'pending' && data">
        <!-- <CourseEnrollButton :price="data.course.price" :course-id="params.courseId"></CourseEnrollButton> -->
        <UAlert v-if="data?.userProgress?.isCompleted" icon="i-lucide-alert-triangle"
            title="You already completed this chapter." variant="soft" color="primary" />
        <UAlert v-if="isLocked" icon="i-lucide-alert-triangle"
            title="You need to purchase this course to watch this chapter." variant="soft" color="yellow" />

        <div class="flex flex-col w-full max-w-4xl pb-20 mx-auto px-4">
            <UButton icon="i-lucide-arrow-left" variant="ghost" label="Back to courses" :trailing="false"
                :to="`/search`" class="mb-0 mt-3 max-w-[150px]" />
            <div class="md:px-0">
                <div class="relative mt-4 min-h-[400px]">
                    <div v-if="!isLocked" class="absolute inset-0 flex items-center justify-center bg-slate-800">
                        <Icon name="i-lucide-loader-2" class="w-8 h-8 animate-spin" />
                    </div>
                    <div v-else
                        class="absolute inset-0 flex flex-col items-center justify-center bg-slate-800 gap-y-2 text-secondary">
                        <Icon name="i-lucide-lock" class="w-8 h-8 text-white" />
                        <p class="text-sm text-white">This chapter is locked.</p>
                    </div>
                    <CldVideoPlayer v-if="data?.chapter.videoUrl && !isLocked" :source-types="['mp4']" width="880"
                        height="495" :transformation="{ quality: 'auto' }" :src="data?.chapter.videoUrl"
                        :onEnded="async () => await markAsComplete()" :loop="false" />
                </div>
            </div>

        </div>

        <div class="max-w-4xl w-full mx-auto px-4">
            <div class="flex flex-col items-center justify-between py-4 md:flex-row">
                <h2 class="mb-2 text-2xl font-semibold">{{ data?.chapter.title }}</h2>
                <!-- Course Completetion Button -->
                <CourseCompleteButton v-if="data.purchase" :is-completed="isCompleted"
                    @on-complete="markAsComplete(isCompleted ? true : false)"></CourseCompleteButton>
                <!-- @vue-expect-error -->
                <CourseEnrollButton v-else :price="data.course.price" :course-id="params.courseId"></CourseEnrollButton>
            </div>
            <div class="py-4 prose lg:prose-xl" v-html="data?.chapter.description"></div>
            <template v-if="!!data?.attachments.length">
                <div class="w-full">
                    <a v-for="attachment in data?.attachments" target="_blank" :key="attachment.id"
                        :href="attachment.url" rel="noopener noreferrer nofollow external"
                        class="flex items-center w-full border p-3 rounded-md bg-sky-200 text-sky-700 hover:underline mb-3">
                        <Icon name="i-lucide-file" class="w-8 h-8" />
                        <p class="line-clamp-1">{{ attachment.name }}</p>
                    </a>
                </div>
            </template>

        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'chapter',
    middleware: 'protected'
})

const { params } = useRoute();

await useLazyFetch(`/api/courses/${params.courseId}`, {
    key: `course-${params.courseId}`,
})
await useLazyFetch(`/api/courses/${params.courseId}/purchase`, {
    key: `purchase-${params.courseId}`,
})
await useLazyFetch(`/api/courses/${params.courseId}/progress`, {
    key: `progress-${params.courseId}`,
})

const { data, status } = await useFetch(`/api/courses/${params.courseId}/chapters/${params.chapterId}`, {
    key: `${params.courseId}/chapters/${params.chapterId}`
})


const isLocked = computed(() => !data.value?.chapter.isFree && !data.value?.purchase);
const isCompleted = computed(() => !!data.value?.userProgress?.isCompleted);
const isNextChapterExist = computed(() => !!data.value?.nextChapter?.id)

const { isLoading, toggleLoading, showError, showMessage } = useStore();

const markAsComplete = async (toggleCourse: boolean = false) => {


    try {

        toggleLoading(true);

        if (((!isCompleted.value && !toggleCourse) || (isCompleted.value && toggleCourse)) || isNextChapterExist.value) {

            await $fetch(`/api/courses/${params.courseId}/chapters/${params.chapterId}/progress`, {
                method: 'PUT',
                body: {
                    isCompleted: !isCompleted.value
                }
            })

            if (!isCompleted.value && !isNextChapterExist.value) {
                showMessage({
                    title: 'Course completed'
                })
            }

            if (!isCompleted.value && isNextChapterExist.value) {
                await navigateTo(`/courses/${params.courseId}/chapters/${data.value?.nextChapter?.id}`)
            }

            // TODO: Refresh Data 
            await refreshNuxtData(`progress-${params.courseId}`)
            await refreshNuxtData(`${params.courseId}/chapters/${params.chapterId}`)
        }






    } catch (error) {
        const err = handleError(error);
        showError(err);
    } finally {
        toggleLoading(false)
    }

}
</script>

<style scoped></style>