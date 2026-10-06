import { errorMessage } from '~/utils/api'

export function useProjects(api, filters = ref({})) {
    const projects = ref([])
    const currentPage = ref(1)
    const pageSize = ref(10)
    const pageCount = ref(1)
    const total = ref(0)
    const loading = ref(false)
    const loadError = ref('')
    const notice = ref('')
    const editing = ref(null)
    const projectDialog = ref(null)
    const deleteDialog = ref(null)
    const deleting = ref(null)
    const saving = ref(false)
    const formError = ref('')
    const deleteError = ref('')
    let active = false
    let requestId = 0

    watch([filters, pageSize], () => {
        currentPage.value = 1
    }, { flush: 'sync' })

    watch([currentPage, pageSize, filters], () => {
        if (active) loadProjects()
    })

    function resetProjects() {
        active = false
        requestId += 1
        loading.value = false
        projects.value = []
        currentPage.value = 1
        pageCount.value = 1
        total.value = 0
        projectDialog.value?.close()
        deleteDialog.value?.close()
        editing.value = null
        deleting.value = null
    }

    async function loadProjects() {
        active = true
        const id = ++requestId
        loading.value = true
        loadError.value = ''
        try {
            const response = await api('/projects', {
                query: { ...filters.value, page: currentPage.value, per_page: pageSize.value }
            })
            if (id !== requestId) return
            const items = Array.isArray(response) ? response : response?.data
            if (!Array.isArray(items)) {
                throw new Error(response?.message || 'The backend returned an invalid project list.')
            }
            pageCount.value = Math.max(1, response.meta?.last_page || 1)
            total.value = response.meta?.total ?? items.length
            if (currentPage.value > pageCount.value) {
                currentPage.value = pageCount.value
                return
            }
            projects.value = items
        } catch (error) {
            if (id === requestId) loadError.value = errorMessage(error)
        } finally {
            if (id === requestId) loading.value = false
        }
    }

    async function openProject(project) {
        formError.value = ''
        if (project) {
            try {
                const response = await api(`/projects/${project.id}`)
                editing.value = response.data ?? response
            } catch (error) {
                loadError.value = errorMessage(error)
                return
            }
        } else {
            editing.value = {
                clientName: '',
                projectName: '',
                description: '',
                status: 'Planning',
                priority: 'Medium',
                startDate: '',
                dueDate: ''
            }
        }
        await nextTick()
        projectDialog.value.showModal()
    }

    function closeProject(event) {
        event?.preventDefault()
        if (saving.value) return
        projectDialog.value.close()
        editing.value = null
    }

    async function saveProject(details) {
        saving.value = true
        formError.value = ''
        try {
            const method = details.id ? 'PUT' : 'POST'
            const url = details.id ? `/projects/${details.id}` : '/projects'
            await api(url, { method, body: details })
            notice.value = details.id ? 'Project updated.' : 'Project created.'
            projectDialog.value.close()
            editing.value = null
            await loadProjects()
        } catch (error) {
            formError.value = errorMessage(error)
        } finally {
            saving.value = false
        }
    }

    async function confirmDelete(project) {
        deleting.value = project
        deleteError.value = ''
        await nextTick()
        deleteDialog.value.showModal()
    }

    function closeDelete(event) {
        event?.preventDefault()
        if (saving.value) return
        deleteDialog.value.close()
        deleting.value = null
    }

    async function deleteProject() {
        saving.value = true
        deleteError.value = ''
        const id = deleting.value.id
        try {
            await api(`/projects/${id}`, { method: 'DELETE' })
            notice.value = 'Project deleted.'
            deleteDialog.value.close()
            deleting.value = null
            await loadProjects()
        } catch (error) {
            deleteError.value = errorMessage(error)
        } finally {
            saving.value = false
        }
    }

    return {
        projects, loading, loadError, notice, editing, projectDialog, deleteDialog,
        currentPage, pageSize, pageCount, total,
        deleting, saving, formError, deleteError, resetProjects, loadProjects,
        openProject, closeProject, saveProject, confirmDelete, closeDelete, deleteProject
    }
}