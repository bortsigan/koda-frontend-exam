# Koda Exam Project

Nuxt 4 + Vue + Tailwind CSS frontend for the [koda-backend-exam](https://github.com/bortsigan/koda-backend-exam) Laravel API.

## 1. Run the backend

Clone [koda-backend-exam](https://github.com/bortsigan/koda-backend-exam) and follow its README. The API will run at `http://localhost:8000/api`.

Test account:
assuming you already did register this user using postman 

- Email: `koda@example.com`
- Password: `password`

## 2. Run the frontend

Requires Node 22.19+, 24.11+, or 26+ (Node 24 recommended).

```bash
cp .env.example .env
npm install
npm run dev
```

Open http://localhost:3000 and sign in with the test account.

## Environment

```env
BACKEND_API_URL=http://localhost:8000/api
```

`BACKEND_API_URL` in `.env` takes priority over the default `http://localhost:8000/api`.
Restart the dev server after changing it.

## Features

- Sign in and sign out with Laravel sanctum
- Create, edit, and delete projects
- backend side search, status/priority filters, and pagination 10 datas per requests
- Sorting within the current page.
- Responsive layout with loading, empty, and error states
