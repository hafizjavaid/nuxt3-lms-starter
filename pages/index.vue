<template>
    <div>
        <pre>
            {{ user }}
        </pre>

        <UButton @click="logout">Logout</UButton>

    </div>
</template>

<script setup lang="ts">
const { user, clear } = useUserSession()

watchEffect(() => {
    console.log(user.value);
    
})

const logout = async () => {
    await clear();
    await navigateTo('/auth')
}
</script>

<style scoped></style>