<template>
    <div class="flex flex-col w-full">
        <SidebarItem v-for="(route, i) in currentRoutes" :key="route.href" :icon="route.icon" :label="route.label"
            :href="route.href" />
    </div>
</template>

<script setup lang="ts">
const guestRoutes = [
    {
        icon: 'i-lucide-layout',
        label: 'Dashboard',
        href: '/',
    },
    {
        icon: 'i-lucide-compass',
        label: 'Browse',
        href: '/search',
    },
];
const teacherRoutes = [
    {
        icon: 'i-lucide-list',
        label: 'Courses',
        href: '/teacher/courses',
    },
    {
        icon: 'i-lucide-bar-chart',
        label: 'Analytics',
        href: '/teacher/analytics',
    },
];
const route = useRoute();
const currentRoutes = computed(() => {
    if (route.path.includes('/teacher')) {
        return teacherRoutes;
    }
    return guestRoutes;
});
</script>

<style scoped></style>