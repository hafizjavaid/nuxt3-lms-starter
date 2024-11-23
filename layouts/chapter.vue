<template>
    <div class="h-full">
        <div class="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
            <CourseNavbar />
        </div>
        <div class="fixed inset-y-0 z-50 flex-col hidden h-full md:flex w-80">
            <CourseSidebar />
        </div>
        <main class="h-full md:pl-80 pt-[80px] p-4">
            <slot />
        </main>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>