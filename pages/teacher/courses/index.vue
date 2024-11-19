<script setup lang="ts">
const columns = [
    {
        key: 'title',
        label: 'Title',
        sortable: true,
    },
    {
        key: 'price',
        label: 'Price',
        sortable: true,
    },
    {
        key: 'published',
        label: 'Published',
        sortable: true,
    },
    {
        key: 'actions',
    },
];

const { data: courses, status } = await useFetch('/api/teacher/courses', {
    key: 'Teacher-Courses',
    transform: (fetchedCourses) => {
        return fetchedCourses?.map(course => {
            return {
                id: course.id,
                title: course.title,
                price: course.price,
                published: course.isPublished
            }
        })
    }
})


const q = ref('')

const page = ref(1)
const pageCount = 5

const filteredRows = computed(() => {
    if (!q.value) {
        return courses.value
    }

    return courses.value?.filter((course) => {
        return Object.values(course).some((value) => {
            return String(value).toLowerCase().includes(q.value.toLowerCase())
        })
    })
})

const rows = computed(() => {
    return filteredRows.value?.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

definePageMeta({
    middleware: 'protected',
    layout: 'teacher'
})


</script>

<template>
    <div class="m-4 border border-gray-200 dark:border-gray-700">
        <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700 justify-between items-center">
            <UInput v-model="q" placeholder="Filter people..." />
            <UButton icon="i-heroicons-plus-circle" size="sm" color="primary" variant="solid" label="New Course"
                :trailing="false" to="/teacher/courses/create" />
        </div>

        <UTable :rows="rows" :columns="columns" />

        <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
            <UPagination v-model="page" :page-count="pageCount" :total="courses ? courses.length : 0" />
        </div>
    </div>
</template>
