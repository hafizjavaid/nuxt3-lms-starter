<template>
    <div class="mt-6 border bg-slate-100 rounded p-4">

        <div class="font-medium flex items-center justify-between">

            Course Price 

            <UButton variant="ghost" v-if="isEditing" @click="isEditing = !isEditing">Cancel</UButton>
            <UButton icon="i-lucide-pencil" variant="ghost" v-else @click="isEditing = !isEditing">
                Edit Price 
            </UButton>

        </div>
        <p v-if="!isEditing" class="text-sm mt-2">
            {{ initialData.price ? formatPrice(initialData.price) : 'No Price' }}
        </p>
        <UForm v-if="isEditing" :schema="courseSchema" :state="courseForm" @submit="onSubmit">
            <div class="space-y-4 mt-8">
                <UFormGroup label="Course price" name="price" help="What will be the price of this course?">
                    <UInput v-model="courseForm.price" placeholder="Set a price"
                        :disabled="isLoading" type="number" />
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
        price: number | null
    },
}
const props = defineProps<TitleFormProps>();

const courseForm = ref<Partial<Course>>(props.initialData);

watch(() => props.initialData.price, (price) => {

    courseForm.value.price = price;

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