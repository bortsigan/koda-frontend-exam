import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  runtimeConfig: { public: { apiBase: process.env.BACKEND_API_URL || 'http://localhost:8000/api' } },
  app: { head: { title: 'Koda Exam Project', meta: [{ name: 'description', content: 'Client project tracker for your agency.' }] } }
})