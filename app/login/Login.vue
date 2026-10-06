<script setup>
import { ArrowRight } from 'lucide-vue-next'

const email = defineModel('email', { required: true })
const password = defineModel('password', { required: true })
defineProps(['signingIn', 'loginError'])
const emit = defineEmits(['submit'])
</script>

<template>
    <main class="entry mx-auto max-w-md px-5 py-16 sm:py-24">
        <p class="mb-3 text-xs font-semibold uppercase text-emerald-700">Your workspace</p>
        <h1 class="text-3xl font-semibold">Sign in</h1>

        <form class="mt-8 space-y-5" novalidate @submit.prevent="emit('submit')">
            <label class="block text-sm font-medium">
                Email
                <input
                    v-model="email"
                    type="email"
                    autocomplete="username"
                    class="field mt-2"
                    required
                    :disabled="signingIn"
                >
            </label>

            <label class="block text-sm font-medium">
                Password
                <input
                    v-model="password"
                    type="password"
                    autocomplete="current-password"
                    class="field mt-2"
                    required
                    maxlength="256"
                    :disabled="signingIn"
                >
            </label>

            <p v-if="loginError" role="alert" class="rounded-md bg-red-50 p-3 text-sm text-red-700">
                {{ loginError }}
            </p>

            <button class="primary w-full" :disabled="signingIn">
                {{ signingIn ? 'Signing in...' : 'Sign in' }}
                <ArrowRight :size="17" />
            </button>
        </form>
    </main>
</template>