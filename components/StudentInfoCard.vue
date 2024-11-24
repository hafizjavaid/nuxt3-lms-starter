<template>
    <div class="flex items-center p-3 border rounded-md gap-x-2">
        <!-- @vue-expect-error -->
        <UButton :icon="icon" size="md" :color="variant === 'default' ? '' : 'green'" variant="soft"
            :ui="{ rounded: 'rounded-full' }" />

        <div>
            <p class="font-medium">{{ label }}</p>

            <p class="text-sm text-gray-500">
                {{ numberOfItems }} {{ numberOfItems === 1 ? 'Course' : 'Courses' }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
interface InfoCardProps {
    label: string;
    icon: string;
    numberOfItems: number;
    variant?: 'default' | 'success';
}

defineProps<InfoCardProps>();
</script>

<style scoped></style>