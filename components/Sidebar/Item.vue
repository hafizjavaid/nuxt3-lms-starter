<template>
    <NuxtLink
        class="flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20"
        :clas="{ 'text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700': isActive }" :to="href">
        <div class="flex items-center gap-x-2 py-4">
            <Icon :name="icon" :clas="[isActive ? 'text-sky-700' : 'text-slate-500']"></Icon>

            {{ label }}
        </div>
        <div class="ml-auto opacity-0 border-2 border-sky-700 h-full transition-all"
            :clas="{ 'opacity-100': isActive }" />
    </NuxtLink>
</template>

<script setup lang="ts">
interface SidebarItemProps {
    icon: string;
    label: string;
    href: string;
}
const props = defineProps<SidebarItemProps>();
const route = useRoute();

const isActive = computed(() => {
    return (
        (route.path === '/' && props.href === '/') ||
        route.path === props.href ||
        route.path?.startsWith(`${props.href}/`)
    );
});
</script>

<style scoped></style>