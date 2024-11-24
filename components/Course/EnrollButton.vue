<template>
    <div>
        <UButton :disabled="isLoading" class="w-full md:w-auto" size="sm" @click="enroll">Enroll for {{
            formatPrice(price) }} </UButton>
    </div>
</template>

<script setup lang="ts">

interface EnrollButtonProps {
    price: number;
    courseId: string;
}

const props = defineProps<EnrollButtonProps>();

const { isLoading, toggleLoading, showError } = useStore();

const { params } = useRoute();

const enroll = async () => {

    try {

        toggleLoading(true);

        const res = await $fetch(`/api/courses/${params.courseId}/checkout`, {
            method: 'POST'
        })

        if (res) {
            window.location.assign(res);
        }


    } catch (error) {
        const err = handleError(error);
        showError(err);
    } finally {
        toggleLoading(false)
    }


}


</script>

<style scoped></style>