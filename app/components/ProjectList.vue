<script setup>
import {
    Pencil,
    Trash2
} from 'lucide-vue-next'

defineProps([
    'visibleProjects',
    'statusClasses',
    'priorityClasses',
    'isOverdue',
    'formatDate',
    'project'
])

const statusClasses = {
        Planning: 'bg-sky-50 text-sky-700',
        'In Progress': 'bg-amber-50 text-amber-800',
        'On Hold': 'bg-gray-100 text-gray-600',
        Completed: 'bg-emerald-50 text-emerald-700'
    }

const emit = defineEmits(['openProject', 'confirmDelete'])

</script>
<template>
    <div class="block">
        <table class="w-full table-fixed text-left text-sm">
            <caption class="sr-only">Client projects</caption>
            <thead class="border-y border-gray-200 bg-gray-100/70 text-xs text-gray-500">
                <tr>
                    <th scope="col" class="w-[37%] px-4 py-3 font-medium">Project / Client</th>
                    <th scope="col" class="w-[19%] px-3 py-3 font-medium">Status</th>
                    <th scope="col" class="w-[13%] px-3 py-3 font-medium">Priority</th>
                    <th scope="col" class="w-[18%] px-3 py-3 font-medium">Due date</th>
                    <th scope="col" class="px-3 py-3 text-right font-medium">Actions</th>
                </tr>
            </thead>
            <tbody class="bg-white">
                <tr
                    v-for="project in visibleProjects"
                    :key="project.id"
                    class="border-b border-gray-200 hover:bg-gray-50"
                >
                    <td class="px-4 py-4">
                        <p class="break-words font-semibold">{{ project.projectName }}</p>
                        <p class="mt-1 break-words text-xs text-gray-500">{{ project.clientName }}</p>
                    </td>

                    <td class="px-3 py-4">
                        <span
                            class="inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium"
                            :class="statusClasses[project.status]"
                        >
                            <span class="size-1.5 shrink-0 rounded-full bg-current" />
                            {{ project.status }}
                        </span>
                    </td>

                    <td class="px-3 py-4">
                        <span class="inline-flex items-center gap-2">
                            <span class="size-1.5 rounded-full" :class="priorityClasses[project.priority]" />
                            {{ project.priority }}
                        </span>
                    </td>

                    <td class="px-3 py-4" :class="isOverdue(project) ? 'text-red-700' : 'text-gray-600'">
                        {{ formatDate(project.dueDate) }}
                        <span 
                            v-if="isOverdue(project)" class="mt-1 block text-xs">Overdue</span>
                    </td>

                    <td class="px-2 py-4">
                        <div class="flex justify-end gap-1">
                            <button
                                class="rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-emerald-700"
                                title="Edit project"
                                @click="emit('openProject', project)"
                            >
                                <Pencil :size="16" />
                            </button>
                            <button
                                class="rounded p-2 text-gray-500 hover:bg-red-50 hover:text-red-700"
                                title="Delete project"
                                @click="emit('confirmDelete', project)"
                            >
                                <Trash2 :size="16" />
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>