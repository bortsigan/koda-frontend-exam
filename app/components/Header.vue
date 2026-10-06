<script setup>
import {
    LogOut
} from 'lucide-vue-next'

const signingOut = defineModel('signingOut')
defineProps([
    'user',
    'LogOut'
])

const emit = defineEmits(['signOut'])
</script>
<template>
    <header class="border-b border-gray-200 bg-white">
        <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
            <div class="flex items-center gap-3">
                <span class="text-lg font-semibold">
                    Koda<span class="ml-1 font-normal text-gray-500">Exam Project</span>
                </span>
            </div>

            <div v-if="user" class="flex min-w-0 items-center gap-4">
                <span class="hidden truncate text-sm text-gray-500 sm:block">{{ user.email }}</span>
                <button class="secondary shrink-0" :disabled="signingOut" @click="emit('signOut')">
                    <LogOut :size="16" />
                    <span>{{ signingOut ? 'Signing out...' : 'Sign out' }}</span>
                </button>
            </div>
        </div>
    </header>
</template>