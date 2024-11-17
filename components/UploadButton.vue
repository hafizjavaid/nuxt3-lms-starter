<template>
    <!-- @vue-expect-error -->
    <CldUploadWidget v-slot="{ open }" :uploadPreset="uploadPreset" :onUpload="(result: any) => { onUpload(result) }"
        :options="{
            clientAllowedFormats: allowedFormats,
            resourceType: isVideo ? 'video' : undefined
        }">
        <UCard @click="open" class="cursor-pointer h-36 flex justify-center items-center" :ui="{
            shadow: 'shadow-none',
            background: 'bg-transparent',
            rounded: 'rounded-none',
        }">
            <div class="flex flex-col justify-center items-center w-full">
                <Icon name="i-lucide-upload" class="mb-2 size-6" />
                <div class="text-gray">Upload an {{ isVideo ? 'Video' : 'Image' }}</div>
            </div>
        </UCard>
    </CldUploadWidget>
</template>

<script setup lang="ts">

const { public: { uploadPreset } } = useRuntimeConfig();

interface UploadButtonProps {
    isVideo?: boolean
    allowedFormats?: string[]
}

defineProps<UploadButtonProps>();

const emit = defineEmits(['onChange']);

interface Result {
    info: {
        secure_url: string;
    };
}

function onUpload(result: Result) {
    console.log(result);
    console.log(result.info.secure_url);

    emit('onChange', result.info.secure_url)

}

</script>

<style scoped></style>