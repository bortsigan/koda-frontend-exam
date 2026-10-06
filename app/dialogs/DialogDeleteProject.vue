<script setup>
import { Trash2 } from 'lucide-vue-next'

const deleteDialog = ref(null)

defineProps([
    'deleting',
    'deleteError',
    'saving'
])
defineExpose({
    showModal: () => deleteDialog.value.showModal(),
    close: () => deleteDialog.value.close()
})
const emit = defineEmits(['cancel','delete'])

</script>
<template>
    <dialog ref="deleteDialog" aria-labelledby="delete-dialog-title" @cancel="emit('cancel')">
        <div v-if="deleting" class="p-6">
            <h2 id="delete-dialog-title" class="text-xl font-semibold">Delete project?</h2>
            <p class="mt-3 break-words text-sm text-gray-600">
                {{ deleting.projectName }} will be permanently removed.
            </p>
            <p v-if="deleteError" role="alert" class="mt-4 text-sm text-red-700">{{ deleteError }}</p>

            <div class="mt-6 flex justify-end gap-3">
                <button class="secondary" :disabled="saving" autofocus @click="emit('cancel')">
                    Cancel
                </button>
                <button
                    class="primary bg-red-700 hover:bg-red-800"
                    :disabled="saving"
                    @click="emit('delete')"
                >
                    <Trash2 :size="16" />
                    {{ saving ? 'Deleting...' : 'Delete project' }}
                </button>
            </div>
        </div>
    </dialog>
</template>