<template>
    <div>
        <draggable v-model="chapters" tag="div" item-key="id" @end="onDragEnd">
            <template #item="{ element: chapter }">
                <div class="flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm"
                    :class="{ 'bg-sky-100 border-sky-200 text-sky-700': chapter.isPublished }">

                    <div class="px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition"
                        :class="{ 'border-r-sky-200 hover:bg-sky-200': chapter.isPublished }">
                        <Icon name="i-lucide-grip" class="h-5 w-5" />
                    </div>

                    {{ chapter.title }}

                    <div class="ml-auto pr-2 flex items-center gap-x-2">
                        <UBadge v-if="chapter.isFree" color="black">Free</UBadge>
                        <UBadge :class="[chapter.isPublished ? 'bg-sky-700' : 'bg-slate-500']">{{
                            chapter.isPublished ? 'Published' : 'Draft'
                        }}</UBadge>
                        <Icon name="i-lucide-pencil" class="h-5 w-5 cursor-pointer hover:opacity-75 transition"
                            @click="$emit('onEdit', chapter.id)" />
                    </div>

                </div>
            </template>


        </draggable>
    </div>
</template>

<script setup lang="ts">
import type { Chapter } from '@prisma/client';
import draggable from 'vuedraggable';

interface ChaptersListProps {
    items: Chapter[]
}

const props = defineProps<ChaptersListProps>();

const chapters = ref<Chapter[]>(props.items);

watch(() => props.items, (updatedChapters) => {
    chapters.value = updatedChapters
})

const emits = defineEmits(['onReOrder', 'onEdit'])

const onDragEnd = () => {

    const reOrderedData = chapters.value.map((chapter, index) => ({
        id: chapter.id,
        position: index,
    }));

    emits('onReOrder', reOrderedData)
}

</script>

<style scoped></style>