export function useProjectFilters() {
    const statuses = ['Planning', 'In Progress', 'On Hold', 'Completed']
    const priorities = ['Low', 'Medium', 'High']
    const search = ref('')
    const statusFilter = ref('')
    const priorityFilter = ref('')
    const sort = ref('dueDate')
    const query = computed(() => ({
        ...(search.value.trim() ? { q: search.value.trim() } : {}),
        ...(statusFilter.value ? { status: statusFilter.value } : {}),
        ...(priorityFilter.value ? { priority: priorityFilter.value } : {})
    }))

    function sortProjects(projects) {
        return [...projects].sort((first, second) => sort.value === 'priority'
            ? priorities.indexOf(second.priority) - priorities.indexOf(first.priority)
            : first[sort.value].localeCompare(second[sort.value]))
    }

    const priorityClasses = { High: 'bg-red-500', Medium: 'bg-amber-400', Low: 'bg-sky-400' }

    function resetFilters() {
        search.value = statusFilter.value = priorityFilter.value = ''
    }

    function formatDate(value) {
        return new Date(`${value}T00:00:00`).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    function isOverdue(project) {
        const today = new Date().setHours(0, 0, 0, 0)
        return project.status !== 'Completed' && new Date(`${project.dueDate}T00:00:00`) < today
    }

    return {
        statuses, priorities, search, statusFilter, priorityFilter, sort,
        query, sortProjects, priorityClasses, resetFilters, formatDate, isOverdue
    }
}