<template>
    <div>
        <pre>
            {{ course }}
        </pre>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'chapter',
    middleware: 'protected'
})



</script>

<style scoped></style>