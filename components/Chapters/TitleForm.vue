<template>
    <div class="mt-6 border bg-slate-100 rounded p-4">

        <div class="font-medium flex items-center justify-between">

            Chapter Title

            <UButton variant="ghost" v-if="isEditing" @click="isEditing = !isEditing">Cancel</UButton>
            <UButton icon="i-lucide-pencil" variant="ghost" v-else @click="isEditing = !isEditing">
                Edit title
            </UButton>

        </div>
        <p v-if="!isEditing" class="text-sm mt-2">
            {{ chapterForm.title }}
        </p>
        <UForm v-if="isEditing"  :state="chapterForm" @submit="onSubmit">
            <div class="space-y-4 mt-8">
                <UFormGroup label="Chapter title" name="title">
                    <UInput v-model="chapterForm.title" placeholder="introduction to course..." :disabled="isLoading" />
                </UFormGroup>
                <div class="flex items-center gap-x-2">

                    <UButton type="submit" :disabled="isLoading"> Save </UButton>
                </div>
            </div>
        </UForm>
    </div>
</template>

<script setup lang="ts">
import type { Chapter } from '@prisma/client';
import type { FormSubmitEvent } from '#ui/types'

interface TitleFormProps {
    initialData: {
        title: string
    },
}
const props = defineProps<TitleFormProps>();

const chapterForm = ref<Partial<Chapter>>(props.initialData);

watch(() => props.initialData.title, (title) => {

    chapterForm.value.title = title;

})

const isEditing = ref(false)

const { isLoading, toggleLoading, showMessage, showError } = useStore();

const { params } = useRoute();


const onSubmit = async (event: FormSubmitEvent<ChapterSchema>) => {

    try {
        toggleLoading(true);

        await $fetch(`/api/teacher/courses/${params.courseId}/chapters/${params.chapterId}`, {
            method: 'PATCH',
            body: event.data
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