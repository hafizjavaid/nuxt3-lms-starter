<template>
    <UInput icon="i-heroicons-magnifying-glass-20-solid" size="md" :trailing="false" color="gray" variant="outline"
        placeholder="Search..." :ui="{ rounded: 'rounded-full' }" v-model="query" />
</template>

<script setup lang="ts">
import { watchDebounced } from '@vueuse/core';


const query = ref('');
const title = ref('');

const route = useRoute();
const router = useRouter();
const searchQuery = new URLSearchParams(route.query as any);

watchDebounced(query, (newQuery) => {

    title.value = newQuery;
    searchQuery.set('title', title.value);

    router.push({
        path: route.path,
        query: Object.fromEntries(searchQuery.entries())
    })

}, { debounce: 1000, maxWait: 5000 })

</script>

<style scoped></style>