<script setup lang="ts">
const items = [
    [{
        label: '',
        slot: 'account',
        disabled: true
    }], [{
        label: 'Sign out',
        icon: 'i-heroicons-arrow-left-on-rectangle'
    }],
]

const { user, clear } = useUserSession();

const logout = async () => {
    await clear();
    await navigateTo('/auth')
}
</script>

<template>
    <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }"
        :popper="{ placement: 'bottom-start' }">
        <UAvatar icon="i-lucide-circle-user" size="sm" color="black" />

        <template #account="{ item }">
            <div class="text-left">
                <p>
                    Signed in as
                </p>
                <p class="truncate font-medium text-gray-900 dark:text-white">
                    {{ user?.name }}
                </p>
            </div>
        </template>

        <template #item="{ item }">
            <div @click="logout" class="flex justify-between items-center w-full">
                <span class="truncate">{{ item.label }}</span>
                <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
            </div>

        </template>
    </UDropdown>
</template>
