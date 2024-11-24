<template>
    <UButton type="button" @click="emits('onComplete')" class="w-full md:w-auto"
        :variant="isCompleted ? 'outline' : 'solid'" :color="isCompleted ? 'primary' : 'green'">
        {{ isCompleted ? 'Not completed' : 'Mark as complete' }}
        <Icon :name="icon" class="w-4 h-4 ml-2" />
    </UButton>
</template>

<script setup lang="ts">
interface CourseProgressButtonProps {
    isCompleted?: boolean;
}
const props = defineProps<CourseProgressButtonProps>();
const emits = defineEmits(['onComplete']);

const icon = computed(() =>
    props.isCompleted ? 'i-lucide-x-circle' : 'i-lucide-check-circle'
);
</script>

<style scoped></style>