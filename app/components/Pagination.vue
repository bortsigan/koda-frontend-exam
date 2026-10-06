<script setup>

const currentPage = defineModel('currentPage')

const props = defineProps({
    pageSize: Number,
    pageCount: Number,
    total: Number,
})

const pages = computed(() => {
    const count = Math.min(5, props.pageCount)
    const start = Math.max(1, Math.min(currentPage.value - 2, props.pageCount - count + 1))
    return Array.from({ length: count }, (_, index) => start + index)
})
</script>
<template>
    <div class="mt-4 flex flex-wrap items-center justify-between gap-3 mb-4">
        <nav v-if="pageCount > 1" aria-label="Project pages" class="flex flex-wrap gap-1">
            <button
                class="secondary disabled:opacity-50"
                :disabled="currentPage === 1"
                @click="currentPage -= 1"
            >Prev</button>
            <button
                v-for="page in pages"
                :key="page"
                class="size-10 rounded-md border text-sm font-medium"
                :class="currentPage === page ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-gray-300 bg-white hover:bg-gray-100'"
                @click="currentPage = page"
            >{{ page }}</button>
            <button
                class="secondary disabled:opacity-50"
                :disabled="currentPage === pageCount"
                @click="currentPage += 1"
            >Next</button>
        </nav>
        
        <p class="text-xs text-gray-500">
            {{ total ? (currentPage - 1) * pageSize + 1 : 0 }}-{{ Math.min(currentPage * pageSize, total) }}
            of {{ total }} projects
        </p>
        
    </div>
</template>