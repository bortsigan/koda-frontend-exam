import { errorMessage } from '~/utils/api'

export function useAuth({ onAuthenticated, onCleared, onSignedOut, onSignOutError }) {
    const user = ref(null)
    const token = ref('')
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase || 'http://localhost:8000/api'
    const checkingSession = ref(true)
    const email = ref('')
    const password = ref('')
    const loginError = ref('')
    const signingIn = ref(false)
    const signingOut = ref(false)

    function clearSession() {
        token.value = ''
        user.value = null
        localStorage.removeItem('auth')
        onCleared()
    }

    async function api(url, options = {}) {
        try {
            console.log(url);
            return await $fetch(url, {
                ...options,
                baseURL: apiBase,
                headers: { Accept: 'application/json', ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}) }
            })
        } catch (error) {
            if (error.statusCode === 401) {
                clearSession()
                loginError.value = errorMessage(error)
            }
            throw error
        }
    }

    async function checkSession() {
        checkingSession.value = true
        try {
            const session = JSON.parse(localStorage.getItem('auth') || 'null')
            token.value = session?.token || ''
            user.value = session?.user || null
            if (token.value && user.value) {
                await onAuthenticated()
            }
        } catch {
            clearSession()
        } finally {
            checkingSession.value = false
        }
    }

    async function signIn() {
        signingIn.value = true
        loginError.value = ''
        try {
            const response = await api('/login', {
                method: 'POST',
                body: { email: email.value, password: password.value }
            })
            const session = response?.data ?? response
            if (!session?.user || typeof session.token !== 'string' || !session.token) {
                throw new Error(response?.message || 'Login response is missing the user or token.')
            }
            token.value = session.token
            user.value = session.user
            localStorage.setItem('auth', JSON.stringify(session))
            password.value = ''
            await onAuthenticated()
        } catch (error) {
            loginError.value = errorMessage(error)
        } finally {
            signingIn.value = false
        }
    }

    async function signOut() {
        signingOut.value = true
        try {
            await api('/logout', { method: 'POST' })
            clearSession()
            onSignedOut()
        } catch (error) {
            onSignOutError(errorMessage(error))
        } finally {
            signingOut.value = false
        }
    }

    return { user, checkingSession, email, password, loginError, signingIn, signingOut, api, checkSession, signIn, signOut }
}