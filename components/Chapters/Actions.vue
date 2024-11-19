<template>
    <!-- <pre>{{ chapter }}</pre> -->
    <div class="flex items-center gap-x-2">
        <UButton color="gray" :label="chapter.isPublished ? 'UnPublish' : 'Publish'" @click="toggleChapter"
            :disabled="isLoading"></UButton>
        <UButton icon="i-heroicons-trash" size="sm" color="red" variant="soft" square @click="toggleAlertModal(true)"
            :disabled="isLoading" />
    </div>
    <ConfirmModal v-if="isConfirmModalVisible" @on-confirm="deleteChapter"></ConfirmModal>
</template>

<script setup lang="ts">
import type { Chapter } from '@prisma/client';

const props = defineProps<{
    chapter: Chapter
}>();

const { isLoading, toggleAlertModal, isConfirmModalVisible, toggleLoading, showMessage } = useStore();

const { params } = useRoute();

const toggleChapter = async () => {

    try {

        toggleLoading(true)
        if (props.chapter.isPublished) {
            await $fetch(`/api/teacher/courses/${params.courseId}/chapters/${params.chapterId}/unpublish`, {
                method: 'PATCH',
            })

        } else {
            await $fetch(`/api/teacher/courses/${params.courseId}/chapters/${params.chapterId}/publish`, {
                method: 'PATCH',
                body: props.chapter
            })
        }
        showMessage({
            title: 'Chapter Updated successfully'
        })

        refreshNuxtData(`Teacher-Chapter-${params.chapterId}`);

    } catch (error) {
        const err = handleError(error);
        showError(err);
    } finally {
        toggleLoading(false);
    }

}

const deleteChapter = async () => {
    console.log(props.chapter.id);
    try {

        toggleLoading(true)
        await $fetch(`/api/teacher/courses/${params.courseId}/chapters/${params.chapterId}`, {
            method: 'DELETE',
        })
        showMessage({
            title: 'Chapter Updated successfully'
        })

        refreshNuxtData(`Teacher-Course-${params.courseId}`);
        await navigateTo(`/teacher/courses/${params.courseId}`)
        toggleAlertModal(false);

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