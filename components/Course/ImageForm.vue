<template>
    <div class="mt-6 border bg-slate-100 rounded p-4">

        <div class="font-medium flex items-center justify-between">

            Course Image

            <UButton variant="ghost" v-if="isEditing" @click="isEditing = !isEditing">Cancel</UButton>
            <UButton icon="i-lucide-pencil" variant="ghost" v-else-if="!isEditing && courseForm.imageUrl"
                @click="isEditing = !isEditing">
                Edit image
            </UButton>
            <UButton icon="i-lucide-pencil" variant="ghost" v-else @click="isEditing = !isEditing">
                Add image
            </UButton>

        </div>
        <UForm :schema="courseSchema" :state="courseForm" @submit="onSubmit">

            <div v-if="!isEditing" class="mt-8">
                <div v-if="!courseForm.imageUrl"
                    class="flex flex-col items-center justify-center h-60 bg-neutral-50 rounded-md mt-2">
                    <Icon name="i-lucide-image" class="h-10 w-10 text-slate-500" />
                    <div class="text-xs text-muted-foreground mt-4 text-center">
                        No image found
                    </div>
                </div>
                <div v-else class="relative aspect-video mt-2">
                    <img :src="courseForm.imageUrl" alt="Course Image"
                        class="object-cover rounded-md max-h-[200px] w-full">
                </div>
            </div>
            <div v-else>
                <div class="space-y-4 mt-8">
                    <UploadButton @on-change="async (url) => {
                        await onSubmit({
                            imageUrl: url
                        })
                    }"></UploadButton>
                </div>
            </div>
        </UForm>
    </div>
</template>

<script setup lang="ts">
import type { Course } from '@prisma/client';
import type { FormSubmitEvent } from '#ui/types'

interface TitleFormProps {
    initialData: {
        imageUrl: string | null
    },
}
const props = defineProps<TitleFormProps>();

const courseForm = ref<Partial<Course>>(props.initialData);

watch(() => props.initialData.imageUrl, (imageUrl) => {

    courseForm.value.imageUrl = imageUrl;

})

const isEditing = ref(false)

const { isLoading, toggleLoading, showMessage, showError } = useStore();

const { params } = useRoute();


const onSubmit = async (event: Partial<CourseSchema>) => {

    try {
        toggleLoading(true);

        console.log(event);
        

        const updatedCourse = await $fetch(`/api/teacher/courses/${params.courseId}`, {
            method: 'PATCH',
            body: event
        })

        showMessage({
            title: 'Course Updated successfully'
        })

        refreshNuxtData(`Teacher-Course-${params.courseId}`);
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