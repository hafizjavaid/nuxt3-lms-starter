<template>
    <UButton type="button" @click="onClick" class="w-full md:w-auto" :variant="isCompleted ? 'outline' : 'solid'"
        :color="isCompleted ? 'primary' : 'green'">
        {{ isCompleted ? 'Not completed' : 'Mark as complete' }}
        <Icon :name="icon" class="w-4 h-4 ml-2" />
    </UButton>
</template>

<script setup lang="ts">
interface CourseProgressButtonProps {
    courseId: string;
    chapterId: string;
    isCompleted?: boolean;
    nextChapterId?: string;
}
const props = defineProps<CourseProgressButtonProps>();

const { toggleLoading, showError, showMessage, isLoading } = useStore();

const route = useRoute();


const onClick = async () => {
    try {
        isLoading.value = true;
        toggleLoading(true);
        await $fetch(`/api/courses/${props.courseId}/chapters/${props.chapterId}/progress`, {
            method: 'PUT',
            body: {
                isCompleted: !props.isCompleted,
            },
        });
        if (!props.isCompleted && !props.nextChapterId) {

            showMessage({
                title: 'Course completed'
            })
        }
        if (!props.isCompleted && props.nextChapterId) {
            useRouter().push(`/courses/${props.courseId}/chapters/${props.nextChapterId}`);
        }
        await refreshNuxtData(`progress-${useRoute().params.courseId}`)
        await refreshNuxtData(`${useRoute().params.courseId}/chapters/${useRoute().params.chapterId}`)
        showMessage({
            title: 'Progress updated'
        })
    } catch (error) {
        const err = handleError(error);
        showError(err);
    } finally {
        toggleLoading(false);

    }
};
const icon = computed(() =>
    props.isCompleted ? 'i-lucide-x-circle' : 'i-lucide-check-circle'
);
</script>

<style scoped></style>