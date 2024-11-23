<template>
    <div>
        <UButton icon="i-lucide-menu" @click="isOpen = true" class="md:hidden hover:opacity-75 transition" />
        <USlideover side="left" v-model="isOpen" :ui="{ padding: 'p-0' }">
            <Sidebar />
        </USlideover>
    </div>
</template>

<script lang="ts" setup>
const isOpen = ref(false);
</script>

<style scoped></style>