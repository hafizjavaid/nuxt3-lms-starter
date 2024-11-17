<template>
    <div class="mt-6 border bg-slate-100 rounded p-4">

        <div class="font-medium flex items-center justify-between">

            Course Categories

            <UButton variant="ghost" v-if="isEditing" @click="isEditing = !isEditing">Cancel</UButton>
            <UButton icon="i-lucide-pencil" variant="ghost" v-else @click="isEditing = !isEditing">
                Edit category
            </UButton>

        </div>
        <p v-if="!isEditing" class="text-sm mt-2">
            {{ selectedOption ? selectedOption.name : 'No Category' }}
        </p>
        <UForm v-if="isEditing" :schema="courseSchema" :state="courseForm" @submit="onSubmit">
            <div class="space-y-4 mt-8">
                <!-- @vue-expect-error -->
                <USelectMenu v-model="courseForm.categoryId" :options="options" placeholder="Select a category ..."
                    value-attribute="id" option-attribute="name">

                    <template #label>
                        <span v-if="courseForm.categoryId" class="truncate">{{
                            props.options.find((option) => option.id === courseForm.categoryId)?.name
                        }}</span>
                        <span v-else>Select category</span>
                    </template>
                </USelectMenu>
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
        categoryId: string | null
    },
    options: { id: string; name: string }[]
}
const props = defineProps<TitleFormProps>();

const courseForm = ref<Partial<Course>>(props.initialData);
const categories = ref(props.options);
const selectedOption = ref(props.options.find(option => option.id === props.initialData.categoryId))

watch(() => props.initialData.categoryId, (newCategoryId) => {

    courseForm.value.categoryId = newCategoryId;

})
watch(() => props.options, (newOptions) => {

    categories.value = newOptions;

})

const isEditing = ref(false)

const { isLoading, toggleLoading, showMessage, showError } = useStore();

const { params } = useRoute();


const onSubmit = async (event: FormSubmitEvent<CourseSchema>) => {

    try {

        // console.log(event.data);
        
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