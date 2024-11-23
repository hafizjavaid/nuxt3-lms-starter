<template>
    <div class="flex flex-col h-full overflow-y-auto border-r shadow-sm select-none">
        <div v-if="course" class="flex flex-col p-8 border-b">
            <h1 class="font-semibold">{{ course?.title }} </h1>
            <div class="mt-2" v-if="progressCount">
                <!-- <pre>{{ progressCount }}</pre> -->
                <CourseProgress variant="success" :value="progressCount" />
            </div>
        </div>
        <div class="flex flex-col w-full" v-if="course">
            <CourseSidebarItem v-for="chapter in course?.chapters" :id="chapter.id" :key="chapter.id"
                :courseId="course.id" :label="chapter.title" :isCompleted="!!chapter.userProgress?.[0]?.isCompleted"
                :isLocked="!chapter.isFree && !purchase" />
        </div>
    </div>
</template>

<script setup lang="ts">
const { params } = useRoute();
const { data: course } = useNuxtData(`course-${params.courseId}`);
const { data: purchase  } = useNuxtData(`purchase-${params.courseId}`);
const { data: progressCount } = useNuxtData(`progress-${params.courseId}`);


</script>

<style scoped></style>