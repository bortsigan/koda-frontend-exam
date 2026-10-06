<script setup>
import {
    LoaderCircle
} from 'lucide-vue-next'

defineProps({
    checkingSession: Boolean,
    LoaderCircle: Object,
})

</script>
<template>
    <main
        v-if="checkingSession"
        class="flex justify-center gap-3 px-5 py-24 text-gray-500"
        role="status"
    >
        <LoaderCircle class="animate-spin" :size="20" />
        Loading workspace...
    </main>
</template>