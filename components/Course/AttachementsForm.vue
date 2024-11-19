<template>
    <div class="mt-6 border bg-slate-100 rounded p-4">

        <div class="font-medium flex items-center justify-between">

            Course Attachments

            <UButton variant="ghost" v-if="isEditing" @click="isEditing = !isEditing">Cancel</UButton>
            <UButton icon="i-lucide-pencil" variant="ghost" v-else @click="isEditing = !isEditing">
                Add a file
            </UButton>

        </div>
        <template v-if="!isEditing">
            <p class="text-xs text-muted-foreground mt-4 text-center"
                v-if="initialData.attachments && !initialData.attachments.length">
                No attachments found
            </p>
            <div v-else class="space-y-2">
                <div class="flex items-center justify-between p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                    v-for="attachment in initialData.attachments">
                    <div class="flex items-center">
                        <Icon name="i-lucide-file" class="h-4 w-4 mr-2 flex-shrink-0"></Icon>
                        <p class="text-xs text-muted-foreground text-center">
                            {{ attachment.name }}
                        </p>
                    </div>
                    <div v-if="deletingId === attachment.id">
                        <Icon name="i-lucide-loader-2" class="h-4 w-4 animate-spin" />
                    </div>
                    <div v-if="deletingId !== attachment.id">
                        <UButton icon="i-lucide-x" class="ml-auto hover:opacity-75 transition"
                            @click="deleteAttachment(attachment.id)">
                        </UButton>
                    </div>
                </div>
            </div>
        </template>
        <div v-else>
            <div class="space-y-4 mt-8">
                <UploadButton @on-change="async (url) => {
                    await onSubmit({
                        attachmentUrl: url
                    })
                }"></UploadButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Attachment } from '@prisma/client';

interface AttachmentFormProps {
    initialData: {
        attachments: Attachment[]
    },
}
defineProps<AttachmentFormProps>();
const isEditing = ref(false)
const { isLoading, toggleLoading, showMessage, showError } = useStore();

const { params } = useRoute();


const onSubmit = async (event: Partial<CourseSchema>) => {

    try {
        toggleLoading(true);

        console.log(event);


        await $fetch(`/api/teacher/courses/${params.courseId}/attachments`, {
            method: 'POST',
            body: event
        })

        showMessage({
            title: 'Course Updated successfully'
        })

        refreshNuxtData(`Teacher-Course-${params.courseId}`);
        isEditing.value = false



    } catch (error) {
        const err = handleError(error);
        showError(err);
    } finally {
        toggleLoading(false);
        isEditing.value = false
    }

}

const deletingId = ref<string | null>(null)

const deleteAttachment = async (id: string) => {

    try {
        toggleLoading(true);

        deletingId.value = id


        await $fetch(`/api/teacher/courses/${params.courseId}/attachments/${deletingId.value}`, {
            method: 'DELETE',
        })

        showMessage({
            title: 'Attachment deleted successfully'
        })

        refreshNuxtData(`Teacher-Course-${params.courseId}`);
        deletingId.value = null



    } catch (error) {
        const err = handleError(error);
        showError(err);
    } finally {
        toggleLoading(false);
        deletingId.value = null
    }
}

</script>

<style scoped></style>