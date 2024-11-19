<template>
    <div class="mt-6 border bg-slate-100 rounded p-4">

        <div class="font-medium flex items-center justify-between">

            Course Title

            <UButton variant="ghost" v-if="isEditing" @click="isEditing = !isEditing">Cancel</UButton>
            <UButton icon="i-lucide-pencil" variant="ghost" v-else @click="isEditing = !isEditing">
                Edit title
            </UButton>

        </div>
        <p v-if="!isEditing" class="text-sm mt-2">
            {{ courseForm.title }}
        </p>
        <UForm v-if="isEditing"  :state="courseForm" @submit="onSubmit">
            <div class="space-y-4 mt-8">
                <UFormGroup label="Course title" name="title" help="What will you teach in this course?">
                    <UInput v-model="courseForm.title" placeholder="e.g. 'Advanced web development'"
                        :disabled="isLoading" />
                </UFormGroup>
                <div class="flex items-center gap-x-2">

                    <UButton type="submit" :disabled="isLoading"> Save </UButton>
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
        title: string
    },
}
const props = defineProps<TitleFormProps>();

const courseForm = ref<Partial<Course>>(props.initialData);

watch(() => props.initialData.title, (title) => {

    courseForm.value.title = title;

})

const isEditing = ref(false)

const { isLoading, toggleLoading, showMessage, showError } = useStore();

const { params } = useRoute();


const onSubmit = async (event: FormSubmitEvent<CourseSchema>) => {

    try {
        toggleLoading(true);

        const updatedCourse = await $fetch(`/api/teacher/courses/${params.courseId}`, {
            method: 'PATCH',
            body: event.data
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