<template>
    <UButton icon="i-lucide-menu" size="sm" color="primary" variant="solid"
        class="transition md:hidden hover:opacity-75" @click="isOpen = true" />

    <USlideover v-model="isOpen">
        <div class="p-4 flex-1">
            <CourseSidebar />
        </div>
    </USlideover>
</template>

<script setup lang="ts">
const isOpen = ref(false);
</script>

<style scoped></style>