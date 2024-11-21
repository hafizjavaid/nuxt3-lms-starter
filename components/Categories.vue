<template>
    <div v-if="status !== 'pending' && categories" class="flex items-center pb-2 overflow-x-auto gap-x-2">
        <UButton v-for="category in categories" :key="category.id" size="md" :icon="iconMap[category.name]"
            :label="category.name" variant="soft" :color="currentCategory === category.id ? 'primary' : 'gray'"
            @click="onClick(category.id)">
        </UButton>
    </div>
</template>

<script setup lang="ts">
import type { Category } from '@prisma/client';


const { data: categories, status } = useFetch(`/api/categories`);

const iconMap: Record<Category['name'], string> = {
    Music: 'i-flat-color-icons-music',
    Filming: 'i-flat-color-icons-film-reel',
    Fitness: 'i-flat-color-icons-sports-mode',
    Engineering: 'i-flat-color-icons-engineering',
    Photography: 'i-flat-color-icons-old-time-camera',
    Accounting: 'i-flat-color-icons-sales-performance',
    'Computer Science': 'i-flat-color-icons-multiple-devices',
};

const route = useRoute();
const router = useRouter();

const currentCategory = computed(() => route.query.categoryId);

const onClick = (id: string) => {
    const query = new URLSearchParams(route.query as any);
    if (query.get('categoryId') === id) {
        query.delete('categoryId')
    } else {
        query.set('categoryId', id)

    }

    router.push({
        path: route.path,
        query: Object.fromEntries(query.entries())
    })
}


</script>

<style scoped></style>