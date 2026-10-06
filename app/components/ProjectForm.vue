```vue
<script setup>
import { Save, X } from 'lucide-vue-next'

const props = defineProps([
    'project',
    'saving',
    'error',
    'statuses',
    'priorities'
])

const emit = defineEmits(['save', 'cancel'])

const form = reactive({
    clientName: '',
    projectName: '',
    description: '',
    status: props.statuses?.[0] || 'Planning',
    priority: props.priorities?.[1] || 'Medium',
    startDate: '',
    dueDate: '',
    ...props.project
})

function submit() {
    emit('save', { ...form })
}
</script>

<template>
    <form novalidate @submit.prevent="submit">
        <div class="flex items-center justify-between border-b border-gray-200 px-6 py-5">
            <h2 id="project-dialog-title" class="text-xl font-semibold">
                {{ project?.id ? 'Edit project' : 'New project' }}
            </h2>

            <button
                type="button"
                class="rounded p-2 hover:bg-gray-100"
                aria-label="Close project form"
                title="Close"
                :disabled="saving"
                @click="emit('cancel')"
            >
                <X :size="20" />
            </button>
        </div>

        <div class="space-y-4 p-6">
            <label class="block text-sm font-medium">
                Client name <span class="text-red-600">*</span>

                <input
                    v-model="form.clientName"
                    class="field mt-1.5"
                    required
                    maxlength="150"
                    autofocus
                    autocomplete="organization"
                    :disabled="saving"
                >
            </label>

            <label class="block text-sm font-medium">
                Project name <span class="text-red-600">*</span>

                <input
                    v-model="form.projectName"
                    class="field mt-1.5"
                    required
                    maxlength="150"
                    :disabled="saving"
                >
            </label>

            <label class="block text-sm font-medium">
                Description

                <textarea
                    v-model="form.description"
                    class="field mt-1.5 resize-y"
                    rows="3"
                    maxlength="2000"
                    :disabled="saving"
                ></textarea>
            </label>

            <div class="grid grid-cols-2 gap-4">
                <label class="block text-sm font-medium">
                    Status <span class="text-red-600">*</span>

                    <select
                        v-model="form.status"
                        class="field mt-1.5"
                        required
                        :disabled="saving"
                    >
                        <option
                            v-for="status in statuses"
                            :key="status"
                        >
                            {{ status }}
                        </option>
                    </select>
                </label>

                <label class="block text-sm font-medium">
                    Priority <span class="text-red-600">*</span>

                    <select
                        v-model="form.priority"
                        class="field mt-1.5"
                        required
                        :disabled="saving"
                    >
                        <option
                            v-for="priority in priorities"
                            :key="priority"
                        >
                            {{ priority }}
                        </option>
                    </select>
                </label>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label class="block text-sm font-medium">
                    Start date <span class="text-red-600">*</span>

                    <input
                        v-model="form.startDate"
                        type="date"
                        class="field mt-1.5"
                        required
                        :disabled="saving"
                    >
                </label>

                <label class="block text-sm font-medium">
                    Due date <span class="text-red-600">*</span>

                    <input
                        v-model="form.dueDate"
                        type="date"
                        class="field mt-1.5"
                        required
                        :min="form.startDate"
                        :disabled="saving"
                    >
                </label>
            </div>

            <p
                v-if="error"
                role="alert"
                class="rounded-md bg-red-50 p-3 text-sm text-red-700"
            >
                {{ error }}
            </p>
        </div>

        <div class="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
            <button
                type="button"
                class="secondary"
                :disabled="saving"
                @click="emit('cancel')"
            >
                Cancel
            </button>

            <button
                class="primary"
                :disabled="saving"
            >
                <Save :size="16" />
                {{ saving ? 'Saving...' : 'Save project' }}
            </button>
        </div>
    </form>
</template>
