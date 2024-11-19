<template>
    <div class="relative mt-6 border bg-slate-100 rounded p-4">

        <div v-if="isDragging"
            class="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">

            <Icon name="i-lucide-loader-2" class="h-4 w-4 animate-spin" />
        </div>

        <div class="font-medium flex items-center justify-between">

            Course Chapters

            <UButton variant="ghost" v-if="isCreating" @click="isCreating = !isCreating">Cancel</UButton>
            <UButton icon="i-lucide-pencil" variant="ghost" v-else @click="isCreating = !isCreating">
                Add a chapter
            </UButton>

        </div>

        <UForm v-if="isCreating" :state="chapterForm" @submit="onSubmit">
            <div class="space-y-4 mt-8">
                <UFormGroup label="Chapter title" name="title">
                    <UInput v-model="chapterForm.title" placeholder="Introduction" :disabled="isLoading" />
                </UFormGroup>
                <div class="flex items-center gap-x-2">

                    <UButton type="submit" :disabled="isLoading"> Save </UButton>
                </div>
            </div>
        </UForm>
        <!-- Chapters List -->
        <template v-else>

            <p v-if="!initialData.chapters.length" class="text-xs text-muted-foreground mt-4">
                No Chapters found
            </p>
            <template v-else>
                <ChaptersList class="mt-4" :items="initialData.chapters" @onEdit="editChapter" @onReOrder="onReorder">
                </ChaptersList>
            </template>
        </template>
        <!-- <pre>{{ initialData.chapters }}</pre> -->

    </div>
</template>

<script setup lang="ts">
import type { Course, Chapter } from '@prisma/client';
import type { FormSubmitEvent } from '#ui/types'
import type { CompleteCourse } from '~/types';
import type { ChapterSchema } from '~/utils/schemas';

interface ChapterFormProps {
    initialData: {
        chapters: Chapter[]
    },
}
defineProps<ChapterFormProps>();

// @ts-ignore
const chapterForm = ref<ChapterSchema>({
    title: ''
});



const isCreating = ref(false)
const isDragging = ref(false);


const { isLoading, toggleLoading, showMessage, showError } = useStore();

const { params } = useRoute();



const onSubmit = async (event: FormSubmitEvent<ChapterSchema>) => {

    try {
        toggleLoading(true);

        await $fetch(`/api/teacher/courses/${params.courseId}/chapters`, {
            method: 'POST',
            body: event.data
        })

        showMessage({
            title: 'Course Updated successfully'
        })

        refreshNuxtData(`Teacher-Course-${params.courseId}`);
        isCreating.value = false



    } catch (error) {
        const err = handleError(error);
        showError(err);
    } finally {
        toggleLoading(false);
        isCreating.value = false
    }

}

const editChapter = (id: string) => {

    navigateTo(`/teacher/courses/${params.courseId}/chapters/${id}`)
}

const onReorder = async (updatedChapters: { id: string; position: number }[]) => {

    try {
        toggleLoading(true);
        isDragging.value = true 

        await $fetch(`/api/teacher/courses/${params.courseId}/chapters/reorder`, {
            method: 'PUT',
            body: {
                list: updatedChapters
            }
        })

        // showMessage({
        //     title: 'Course Updated successfully'
        // })

        refreshNuxtData(`Teacher-Course-${params.courseId}`);
        isCreating.value = false

    } catch (error) {
        const err = handleError(error);
        showError(err);
    } finally {
        toggleLoading(false);
        isCreating.value = false
        isDragging.value = false 

    }

}

</script>

<style scoped></style>