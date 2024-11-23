<template>
    <UButton size="sm" class="w-full md:w-auto" @click="enroll">
        Enroll for {{ formatPrice(price) }}
    </UButton>
</template>

<script setup lang="ts">
interface CourseEnrollButtonProps {
    price: number;
    courseId: string;
}
const props = defineProps<CourseEnrollButtonProps>();

const { isLoading, toggleLoading, showError } = useStore();

const enroll = async () => {
    try {
        isLoading.value = true;
        toggleLoading(true);
        const response = await $fetch<string | null>(`/api/courses/${props.courseId}/checkout`, {
            method: 'POST'
        });
        console.log('CHEECK_REESPONSE', response);
        if (response) {
            window.location.assign(response)
        }
    } catch (error) {
        const err = handleError(error);
        showError(err);
    } finally {
        toggleLoading(false);

    }
};
</script>

<style scoped></style>