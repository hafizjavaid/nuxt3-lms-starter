<template>
    <div class="p-6 space-y-4">
        <Categories></Categories>
        <div>
            <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
                <template v-if="status !== 'pending' && courses">
                    <NuxtLink v-for="course in courses" :key="course.id" :to="`/courses/${course.id}`">
                        <UCard :ui="{ body: { padding: 'p-3 sm:p-3' } }" class="cursor-pointer">
                            <img v-if="course.imageUrl" :src="course.imageUrl"
                                class="object-cover rounded-md w-full max-h-[200px]" :alt="course.title" />
                            <div class="flex flex-col pt-2">
                                <div class="text-lg font-medium transition md:text-base line-clamp-2">
                                    {{ course.title }}
                                </div>
                                <p class="text-xs text-muted-foreground">{{ course.category?.name }}</p>
                                <div class="flex items-center my-3 text-sm gap-x-2 md:text-xs">
                                    <div class="flex items-center gap-x-1 text-slate-500">
                                        <UButton icon="i-lucide-book-open" size="md" color="primary" variant="soft"
                                            :ui="{ rounded: 'rounded-full' }" />
                                        <span>
                                            {{ course.chapters.length }} {{ course.chapters.length === 1 ? 'chapter' :
                                                'chapters' }}
                                        </span>
                                    </div>
                                </div>
                                <!-- <template v-if="course.p !== null">
                                    <CourseProgress :variant="progress === 100 ? 'success' : 'default'"
                                        :value="progress" />
                                </template> -->
                                <p class="font-medium text-md md:text-sm text-slate-700">
                                    {{ course.price ? formatPrice(course.price) : 'No price' }}
                                </p>
                            </div>
                        </UCard>

                    </NuxtLink>
                </template>
            </div>
            <div class="mt-10 text-sm text-center text-muted-foreground" v-if="courses && !courses.length">
                No courses found
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    middleware: 'protected',
    layout: 'teacher'
})

// @ts-ignore
const query = computed(() => useRoute().query)

const { data: courses, status } = await useFetch('/api/courses', {
    query: query
})

</script>

<style scoped></style>