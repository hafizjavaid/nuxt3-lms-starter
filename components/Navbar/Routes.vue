<template>
    <div class="hidden md:block" v-if="isSearchPage" >

        <NavbarInput></NavbarInput>

    </div>
    <div class="flex gap-x-2 ml-auto">
        <UButton v-if="isTeacherPage || isCoursePage" to="/" label="Exit" icon="i-lucide-log-out" size="sm"
            variant="ghost">
        </UButton>
        <UButton v-else to="/teacher" label="Teacher Mode" size="sm" variant="ghost">
        </UButton>
        <NavbarUserProfile></NavbarUserProfile>
    </div>
</template>

<script setup lang="ts">

const route = useRoute()

const isTeacherPage = computed(() => route.fullPath.startsWith('/teacher'));
const isCoursePage = computed(() => route.fullPath.includes('/courses'));
const isSearchPage = computed(() => route.fullPath.includes('/search'));
</script>

<style scoped></style>