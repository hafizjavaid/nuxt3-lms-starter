<template>
    <div v-if="status !== 'pending' && data">

        <UAlert v-if="data?.userProgress?.isCompleted" icon="i-lucide-alert-triangle"
            title="You already completed this chapter." variant="soft" color="primary" />

        <UAlert v-if="isLocked" icon="i-lucide-alert-triangle"
            title="You need to purchase this course to watch this chapter." variant="soft" color="yellow" />


        <div class="flex flex-col w-full  pb-20 mx-auto" style="max-width: 600px;" >
            <div class="p-4 md:px-0">
                <div class="relative ">
                    <div v-if="!isLocked" class="absolute inset-0 flex items-center justify-center bg-slate-800">
                        <Icon name="i-lucide-loader-2" class="w-8 h-8 animate-spin" />
                    </div>
                    <div v-else
                        class="absolute inset-0 flex flex-col items-center justify-center bg-slate-800 gap-y-2 text-secondary">
                        <Icon name="i-lucide-lock" class="w-8 h-8" />
                        <p class="text-sm">This chapter is locked.</p>
                    </div>
                    <CldVideoPlayer style="width: 400px; height: 400px;" v-if="data?.chapter.videoUrl && !isLocked" :source-types="['mp4']"
                        :transformation="{ quality: 'auto' }" :src="data?.chapter.videoUrl" />
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        Loadd....
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'chapter',
    middleware: 'protected'
})

const { params } = useRoute();

const { data, status } = await useFetch(`/api/courses/${params.courseId}/chapters/${params.chapterId}`)

const isLocked = computed(() => !data.value?.chapter.isFree && !data.value?.purchase)
</script>

<style scoped></style>