<template>
    <div class="flex items-center gap-x-2">
        <UButton color="gray" :label="course.isPublished ? 'UnPublish' : 'Publish'" @click="toggleCourse"
            :disabled="isLoading"></UButton>
        <UButton icon="i-heroicons-trash" size="sm" color="red" variant="soft" square @click="toggleAlertModal(true)"
            :disabled="isLoading" />
    </div>
    <ConfirmModal v-if="isConfirmModalVisible" @on-confirm="deleteCourse"></ConfirmModal>
</template>

<script setup lang="ts">
import type { Course } from '@prisma/client';

const props = defineProps<{
    course: Course
}>();

const { isLoading, toggleAlertModal, isConfirmModalVisible, toggleLoading, showMessage } = useStore();

const { params } = useRoute();

const toggleCourse = async () => {

    try {

        toggleLoading(true)
        if (props.course.isPublished) {
            await $fetch(`/api/teacher/courses/${params.courseId}/unpublish`, {
                method: 'PATCH',
            })

        } else {
            await $fetch(`/api/teacher/courses/${params.courseId}/publish`, {
                method: 'PATCH',
            })
        }
        showMessage({
            title: 'Course Updated successfully'
        })

        refreshNuxtData(`Teacher-Course-${params.courseId}`);

    } catch (error) {
        const err = handleError(error);
        showError(err);
    } finally {
        toggleLoading(false);
    }

}

const deleteCourse = async () => {
    try {

        toggleLoading(true)
        await $fetch(`/api/teacher/courses/${params.courseId}`, {
            method: 'DELETE',
        })
        showMessage({
            title: 'Course deleted successfully'
        })

        await refreshNuxtData(`Teacher-Courses`);
        await navigateTo('/teacher/courses');

    } catch (error) {
        const err = handleError(error);
        showError(err);
    } finally {
        toggleLoading(false);
        toggleAlertModal(false);
    }
}

</script>

<style scoped></style>