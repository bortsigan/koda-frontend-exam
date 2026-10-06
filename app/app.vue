<script setup>
import {
    Check,
    FolderKanban,
    Plus,
    RotateCcw,
    X,
} from 'lucide-vue-next'

import Login from './login/Login.vue'
import DialogAddProject from './dialogs/DialogAddProject.vue'
import DialogDeleteProject from './dialogs/DialogDeleteProject.vue'
import Search from './components/Search.vue'
import Pagination from './components/Pagination.vue'
import Header from './components/Header.vue'
import CheckSession from './components/CheckSession.vue'
import ProjectList from './components/ProjectList.vue'

const {
    user,
    checkingSession,
    email,
    password,
    loginError,
    signingIn,
    signingOut,
    api,
    checkSession,
    signIn,
    signOut,
} = useAuth({
    onAuthenticated: () => loadProjects(),
    onCleared: () => resetProjects(),
    onSignedOut: () => {
        notice.value = ''
        resetFilters()
    },
    onSignOutError: (message) => {
        loadError.value = message
    },
})

const {
    statuses, priorities, search, statusFilter, priorityFilter, sort,
    query, sortProjects, priorityClasses, resetFilters, formatDate, isOverdue,
} = useProjectFilters()

const {
    projects,
    currentPage,
    pageSize,
    pageCount,
    total,
    loading,
    loadError,
    notice,
    editing,
    projectDialog,
    deleteDialog,
    deleting,
    saving,
    formError,
    deleteError,
    resetProjects,
    loadProjects,
    openProject,
    closeProject,
    saveProject,
    confirmDelete,
    closeDelete,
    deleteProject,
} = useProjects(api, query)

const visibleProjects = computed(() => sortProjects(projects.value))

onMounted(checkSession)
</script>

<template>
    <div class="min-h-dvh">
        <NuxtRouteAnnouncer />

        <Header 
            :user="user" 
            :LogOut="LogOut"
            v-model:signingOut="signingOut"
            @signOut="signOut"
        />

        <CheckSession 
            v-if="checkingSession"
            :checkingSession="checkingSession"
        />

        <Login
            v-else-if="!user"
            v-model:email="email"
            v-model:password="password"
            :signing-in="signingIn"
            :login-error="loginError"
            @submit="signIn"
        />

        <main v-else class="entry mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
            <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div class="flex gap-2 items-center">
                    <h1 class="text-3xl font-semibold">
                        Projects
                    </h1>
                    <p class="mb-0 text-xs font-semibold uppercase text-gray-500">
                        Client workspace
                    </p>
                    
                </div>
                <button class="primary" @click="openProject()">
                    <Plus :size="18" />
                    New project
                </button>
            </div>
            

            <div
                v-if="notice"
                role="status"
                class="mb-5 flex items-center gap-2 rounded-md bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
            >
                <Check :size="16" />
                {{ notice }}
                <button
                    class="ml-auto p-1"
                    aria-label="Dismiss notification"
                    title="Dismiss"
                    @click="notice = ''"
                >
                    <X :size="16" />
                </button>
            </div>

            <!-- search -->
            <Search
                v-model:statusFilter="statusFilter"
                v-model:priorityFilter="priorityFilter"
                v-model:sort="sort"
                v-model:search="search"
                :statuses="statuses"
                :priorities="priorities"
            />

            <!-- load error -->
            <div
                v-if="loadError"
                role="alert"
                class="flex flex-wrap items-center justify-between gap-4 border-y border-red-200 bg-red-50 px-4 py-5 text-sm text-red-700"
            >
                <p>{{ loadError }}</p>
                <button class="secondary" @click="loadProjects">
                    <RotateCcw :size="16" />
                    Retry
                </button>
            </div>

            <!-- lodaer -->
            <div
                v-else-if="loading"
                role="status"
                class="flex justify-center gap-3 py-20 text-gray-500"
            >
                <LoaderCircle class="animate-spin" :size="20" />
                Loading projects...
            </div>

            <!-- empty workspace / no project -->
            <div v-else-if="!visibleProjects.length" class="border-y border-gray-200 py-20 text-center">
                <FolderKanban class="mx-auto mb-4 text-gray-400" :size="32" />
                <h2 class="text-lg font-semibold">
                    {{ search || statusFilter || priorityFilter ? 'No matching projects' : 'No projects yet' }}
                </h2>
                <button v-if="search || statusFilter || priorityFilter" class="secondary mt-5" @click="resetFilters">
                    <RotateCcw :size="16" />
                    Clear filters
                </button>
                <button v-else class="primary mt-5" @click="openProject()">
                    <Plus :size="16" />
                    New project
                </button>
            </div>

            <div v-else>
                <Pagination
                    v-model:currentPage="currentPage"
                    :pageSize="pageSize"
                    :total="total"
                    :pageCount="pageCount"
                />

                <ProjectList
                    :visibleProjects="visibleProjects"
                    :priorityClasses="priorityClasses"
                    :isOverdue="isOverdue"
                    :formatDate="formatDate"
                    @openProject="openProject"
                    @confirmDelete="confirmDelete"
                />
            </div>
        </main>

        <!-- dialogs add / edit -->
        <DialogAddProject 
            ref="projectDialog"
            :editing="editing"
            :project="editing"
            :saving="saving"
            :error="formError"
            :statuses="statuses"
            :priorities="priorities"
            @closeProject="closeProject" 
            @saveProject="saveProject"
        />

        <!-- dialog delete -->
        <DialogDeleteProject 
            ref="deleteDialog"
            :deleting="deleting"
            :deleteError="deleteError"
            :saving="saving"
            @cancel="closeDelete" 
            @delete="deleteProject"
        />
    </div>
</template>
