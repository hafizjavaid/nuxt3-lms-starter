<template>
    <div class="mt-6 border bg-slate-100 rounded p-4">

        <div class="font-medium flex items-center justify-between">

            Chapter Access

            <UButton variant="ghost" v-if="isEditing" @click="isEditing = !isEditing">Cancel</UButton>
            <UButton icon="i-lucide-pencil" variant="ghost" v-else @click="isEditing = !isEditing">
                Edit chapter access
            </UButton>

        </div>
        <p v-if="!isEditing" class="text-sm mt-2" :class="{ 'text-slate-500 italic': !initialData.isFree }">
            {{
                initialData.isFree
                    ? 'This chapter is free for preview.'
                    : 'This chapter is not free.'
            }}
        </p>
        <UForm v-if="isEditing"  :state="chapterForm" @submit="onSubmit" @error="onError" >
            <div class="space-y-4 mt-8">
                <UFormGroup name="isFree">
                    <UCheckbox v-model="chapterForm.isFree" name="isFree"
                        label=" Check this box if you want to make this chapter free for preview" />
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
import type { FormSubmitEvent, FormErrorEvent } from '#ui/types'

interface AccessFormProps {
    initialData: {
        isFree: boolean
    },
}
const props = defineProps<AccessFormProps>();

const chapterForm = ref<Partial<Chapter>>(props.initialData);

watch(() => props.initialData.isFree, (isFree) => {

    chapterForm.value.isFree = isFree;

})


async function onError(event: FormErrorEvent) {
  console.log(event);
  
}

const isEditing = ref(false)

const { isLoading, toggleLoading, showMessage, showError } = useStore();

const { params } = useRoute();


const onSubmit = async (event: FormSubmitEvent<ChapterSchema>) => {
    console.log(event.data);
    
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