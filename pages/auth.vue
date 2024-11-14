<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import type { LoginSchema, RegisterSchema } from '~/utils/schemas';
const items = [{
    slot: 'login',
    label: 'Login',
    description: 'Enter your account details to login'
}, {
    slot: 'register',
    label: 'Register',
    description: 'Enter your credentials to create your account'

}]

const loginForm = reactive({ email: '', password: '' })
const registerForm = reactive({ email: '', password: '', name: '' })

const { isLoading, toggleLoading, showMessage, showError } = useStore();

async function login(event: FormSubmitEvent<LoginSchema>) {

    try {

        toggleLoading(true);
        await $fetch('/api/auth/login', {
            method: 'POST',
            body: event.data
        })
        await navigateTo('/');


    } catch (error) {
        console.log(error);
        
        const err = handleError(error);
        showError(err);

    } finally {

        toggleLoading(false)

    }
}
async function register(event: FormSubmitEvent<RegisterSchema>) {
    console.log(event.data);
    try {

        toggleLoading(true);
        await $fetch('/api/auth/register', {
            method: 'POST',
            body: event.data
        })

    } catch (error: any) {

        const err = handleError(error);
        showError(err);

    } finally {

        toggleLoading(false)

    }

}

definePageMeta({
    layout: 'auth'
})
</script>

<template>
    <UTabs :items="items" class="w-full max-w-md">
        <template #login="{ item }">
            <UCard>
                <template #header>
                    <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        {{ item.label }}
                    </p>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {{ item.description }}
                    </p>
                </template>
                <UForm :schema="loginSchema" class="space-y-4" @submit="login" :state="loginForm">
                    <UFormGroup label="Email" name="email">
                        <UInput v-model="loginForm.email" type="email" />
                    </UFormGroup>

                    <UFormGroup label="Password" name="password">
                        <UInput v-model="loginForm.password" type="password" />
                    </UFormGroup>
                    <div class="space-y-5 mt-5">
                        <UButton block type="submit" :disabled="isLoading" >Login</UButton>
                        <AuthButton></AuthButton>
                    </div>

                </UForm>

            </UCard>
        </template>
        <template #register="{ item }">
            <UCard>
                <template #header>
                    <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        {{ item.label }}
                    </p>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {{ item.description }}
                    </p>
                </template>
                <UForm :schema="registerSchema" class="space-y-4" @submit="register" :state="registerForm">
                    <UFormGroup label="Name" name="name">
                        <UInput v-model="registerForm.name" />
                    </UFormGroup>
                    <UFormGroup label="Email" name="email">
                        <UInput v-model="registerForm.email" type="email" />
                    </UFormGroup>

                    <UFormGroup label="Password" name="password">
                        <UInput v-model="registerForm.password" type="password" />
                    </UFormGroup>
                    <div class="space-y-5 mt-5">
                        <UButton block type="submit" :disabled="isLoading" >Register</UButton>
                        <AuthButton></AuthButton>
                    </div>

                </UForm>

            </UCard>
        </template>
    </UTabs>
</template>
