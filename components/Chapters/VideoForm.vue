<template>
    <div class="mt-6 border bg-slate-100 rounded p-4">

        <div class="font-medium flex items-center justify-between">

            Chapter Video

            <UButton variant="ghost" v-if="isEditing" @click="isEditing = !isEditing">Cancel</UButton>
            <UButton icon="i-lucide-pencil" variant="ghost" v-else-if="!isEditing && chapterForm.videoUrl"
                @click="isEditing = !isEditing">
                Edit Video
            </UButton>
            <UButton icon="i-lucide-pencil" variant="ghost" v-else @click="isEditing = !isEditing">
                Add Video
            </UButton>

        </div>
        <UForm :schema="chapterSchema" :state="chapterForm" @submit="onSubmit">

            <div v-if="!isEditing" class="mt-8">
                <div v-if="!chapterForm.videoUrl"
                    class="flex flex-col items-center justify-center h-60 bg-neutral-50 rounded-md mt-2">
                    <Icon name="i-lucide-video" class="h-10 w-10 text-slate-500" />
                    <div class="text-xs text-muted-foreground mt-4 text-center">
                        No video found
                    </div>
                </div>
                <div v-else class="relative aspect-video mt-2">
                    <CldVideoPlayer :source-types="['mp4']" :transformation="{ quality: 'auto' }" aspect-ratio="16:9"
                        class="w-full" width="300" height="150" :src="chapterForm.videoUrl">
                    </CldVideoPlayer>
                </div>
            </div>
            <div v-else>
                <div class="space-y-4 mt-8">
                    <UploadButton @on-change="async (url) => {
                        await onSubmit({
                            videoUrl: url
                        })

                    }" :is-video="true" :allowed-formats="['mp4']"></UploadButton>
                </div>
            </div>
        </UForm>
    </div>
</template>

<script setup lang="ts">
import type { Chapter } from '@prisma/client';

interface VideoFormProps {
    initialData: {
        videoUrl: string | null
    },
}
const props = defineProps<VideoFormProps>();

const chapterForm = ref<Partial<Chapter>>(props.initialData);

watch(() => props.initialData.videoUrl, (videoUrl) => {

    chapterForm.value.videoUrl = videoUrl;

})

const isEditing = ref(false)

const { toggleLoading, showMessage, showError } = useStore();

const { params } = useRoute();


const onSubmit = async (event: Partial<ChapterSchema>) => {

    try {
        toggleLoading(true);

        console.log(event);


        await $fetch(`/api/teacher/courses/${params.courseId}/chapters/${params.chapterId}`, {
            method: 'PATCH',
            body: event
        })

        showMessage({
            title: 'Chapter Updated successfully'
        })

        refreshNuxtData(`Teacher-Chapter-${params.chapterId}`);
        isEditing.value = false



    } catch (error) {
        const err = handleError(error);
        showError(err);
    } finally {
        toggleLoading(false);
        isEditing.value = false
    }

}

</script>

<style scoped></style>