<script setup>  
const statusFilter = defineModel('statusFilter')
const priorityFilter = defineModel('priorityFilter')
const sort = defineModel('sort')
const search = defineModel('search')
defineProps({
    statuses: Array, // array set of values
    priorities: Array, // array set of values
})
</script>
<template>
    <div class="mb-5 flex flex-wrap gap-3">
        <label class="relative min-w-0 flex-1 basis-64">
            <span class="sr-only">Search projects</span>
            <input
                v-model="search"
                type="search"
                class="field pl-10"
                placeholder="Search clients or projects"
            >
        </label>

        <label class="min-w-0 flex-1 basis-32 sm:flex-none">
            <span class="sr-only">Filter by status</span>
            <select v-model="statusFilter" class="field">
                <option value="">All statuses</option>
                <option v-for="status in statuses" :key="status">{{ status }}</option>
            </select>
        </label>

        <label class="min-w-0 flex-1 basis-32 sm:flex-none">
            <span class="sr-only">Filter by priority</span>
            <select v-model="priorityFilter" class="field">
                <option value="">All priorities</option>
                <option v-for="priority in priorities" :key="priority">{{ priority }}</option>
            </select>
        </label>

        <label class="relative min-w-0 flex-1 basis-40 sm:flex-none">
            <span class="sr-only">Sort this page</span>
            <select v-model="sort" class="field pl-9" title="Sort this page">
                <option value="dueDate">Due date</option>
                <option value="projectName">Project name</option>
                <option value="clientName">Client name</option>
                <option value="priority">Priority</option>
            </select>
        </label>
    </div>
</template>
