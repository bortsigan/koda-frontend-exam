<script setup>
const projectDialog = ref(null)

defineProps([
    'editing',
    'project',
    'saving',
    'error',
    'statuses',
    'priorities'
])
const emit = defineEmits(['closeProject','saveProject'])

defineExpose({
    showModal: () => projectDialog.value.showModal(),
    close: () => projectDialog.value.close()
})
</script>

<template>
    <dialog ref="projectDialog" aria-labelledby="project-dialog-title" @cancel="emit('closeProject')">
        <ProjectForm
            v-if="editing"
            :project="editing"
            :saving="saving"
            :error="error"
            :statuses="statuses"
            :priorities="priorities"
            @save="emit('saveProject', $event)"
            @cancel="emit('closeProject')"
        />
    </dialog>
</template>
