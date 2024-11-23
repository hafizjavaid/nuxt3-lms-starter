<template>
    <NuxtLink :to="`/courses/${props.courseId}/chapters/${props.id}`"
        class="flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20"
        :class="{
            'text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700': isActive
        }">
        <div class="flex items-center gap-x-2 py-4">
            <Icon :name="icon" :class="{ 'text-sky-700 ': isActive }" class="text-slate-500" size=""></Icon>

            {{ label }}
        </div>
        <div class="ml-auto opacity-0 border-2 border-sky-700 h-full transition-all"
            :class="{ 'opacity-100': isActive }" />
    </NuxtLink>
</template>

<script setup lang="ts">
interface CourseSidebarItemProps {
    id: string;
    label: string;
    courseId: string;
    isLocked: boolean;
    isCompleted: boolean;
}

const props = defineProps<CourseSidebarItemProps>();
const icon = computed(() => (props.isLocked ? 'i-lucide-lock' : 'i-lucide-play'));
const isActive = computed(() => useRoute().path.includes(props.id));

</script>

<style scoped></style>