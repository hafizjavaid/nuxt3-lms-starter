<template>
    <UCard>
        <template #header>
            <div class="flex flex-row items-center justify-between pb-2 space-y-0">
                <div class="text-sm font-medium">{{ label }}</div>
            </div>
        </template>

        <div className="text-2xl font-bold">
            {{ shouldFormat ? formatPrice(value) : value }}
        </div>
    </UCard>
</template>

<script setup lang="ts">
interface DataCardProps {
    value: number;
    label: string;
    shouldFormat?: boolean;
}
defineProps<DataCardProps>();
</script>

<style scoped></style>