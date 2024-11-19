<template>
    <div class="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">

        <div>
            <h1 class="text-2xl">Name your course</h1>
            <p class="text-sm text-slate-600">
                What would you like to name your course? Don&apos;t worry, you can change this
                later.
            </p>
            <UForm :schema="formSchema" :state="courseForm" @submit="onSubmit">
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
import z from 'zod'
definePageMeta({
    middleware: 'protected',
    layout: 'teacher'
})

import type { FormSubmitEvent } from '#ui/types'

const { isLoading, toggleLoading, showError, showMessage } = useStore();

const formSchema = z.object({
    title: z.string().min(1, {
        message: 'Title is required'
    }),
})

type FormSchema = z.output<typeof courseSchema>;

const courseForm = ref<{ title: string }>({
    title: ''
})


const onSubmit = async (event: FormSubmitEvent<FormSchema>) => {
    try {

        toggleLoading(true);
        await $fetch('/api/teacher/courses', {
            method: 'POST',
            body: event.data
        })

        await navigateTo('/teacher/courses');



    } catch (error) {

        const err = handleError(error);
        showError(err);

    } finally {
        toggleLoading(false);

    }
}

</script>

<style scoped></style>