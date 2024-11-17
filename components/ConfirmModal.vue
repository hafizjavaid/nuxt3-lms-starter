<script setup lang="ts">

const { isConfirmModalVisible, toggleAlertModal } = useStore();

const isOpen = computed({
    get() {
        return isConfirmModalVisible.value
    },
    set() {
        toggleAlertModal(false);
    }
})

const emit = defineEmits(['onConfirm']);

</script>

<template>
    <div>


        <UModal v-model="isOpen" prevent-close>
            <UCard
                :ui="{ base: 'h-full flex flex-col', rounded: '', body: { base: 'grow' }, divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">


                <div class="space-y-1">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Are you sure?
                    </h3>
                    <p>This action cannot be undone.</p>
                </div>

                <template #footer>
                    <div class="flex w-full justify-end gap-x-2 items-center">
                        <UButton color="gray" variant="ghost" @click="toggleAlertModal(false)" label="Cancel" />
                        <UButton color="red" variant="soft" @click="emit('onConfirm')" label="Continue" />
                    </div>
                </template>
            </UCard>
        </UModal>
    </div>
</template>
