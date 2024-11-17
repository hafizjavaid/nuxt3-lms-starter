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

const { isLoading, toggleAlertModal, isConfirmModalVisible } = useStore();


const toggleCourse = () => {
    console.log(props.course);

}

const deleteCourse = () => {
    console.log(props.course.id);
    toggleAlertModal(false);
}

</script>

<style scoped></style>