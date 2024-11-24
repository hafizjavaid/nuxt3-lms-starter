<template>
    <div class="p-6">
        <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <AnalyticsCard shouldFormat :value="data?.totalRevenue ?? 0" label="Revenue" />
            <AnalyticsCard :value="data?.totalSales ?? 0" label="Total Sales" />
        </div>

    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'protected',
    layout: 'teacher',
});

const { data } = await useFetch('/api/teacher/analytics')
</script>

<style scoped></style>