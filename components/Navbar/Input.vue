<template>
    <UInput icon="i-heroicons-magnifying-glass-20-solid" size="md" :trailing="false" color="gray" variant="outline"
        placeholder="Search..." :ui="{ rounded: 'rounded-full' }" v-model="query" />
</template>

<script setup lang="ts">
const query = ref('');
</script>

<style scoped></style>