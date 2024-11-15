<template>
    <div class="h-full">
        <!-- Navbar -->
        <div class="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
                <Navbar></Navbar>
        </div>
        <!-- Sidebar -->
        <div class="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">

        </div>
        <main class="md:pl-56 pt-[80px] h-screen overflow-y-auto">
            <slot></slot>
        </main>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>