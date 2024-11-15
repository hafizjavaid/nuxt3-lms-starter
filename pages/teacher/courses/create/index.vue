<template>
    <div class="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">

        <div>
            <h1 class="text-2xl">Name your course</h1>
            <p class="text-sm text-slate-600">
                What would you like to name your course? Don&apos;t worry, you can change this
                later.
            </p>
            <UForm :schema="courseSchema" :state="courseForm" @submit="onSubmit">
                <div class="space-y-8 mt-8">
                    <UFormGroup label="Course title" name="title" help="What will you teach in this course?">
                        <UInput v-model="courseForm.title" placeholder="e.g. 'Advanced web development'" />
                    </UFormGroup>
                    <div class="flex items-center gap-x-2">
                        <UButton to="/" variant="soft"> Cancel </UButton>

                        <UButton type="submit" :disabled="isLoading"> Continue </UButton>
                    </div>
                </div>
            </UForm>
        </div>

    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'protected',
    layout: 'teacher'
})

import type { CourseSchema } from '~/utils/schemas';
import type { FormSubmitEvent } from '#ui/types'

const { isLoading } = useStore();

const courseForm = ref<CourseSchema>({
    title: ''
})


const onSubmit = async (event: FormSubmitEvent<CourseSchema>) => {
    console.log(event.data);
}

</script>

<style scoped></style>