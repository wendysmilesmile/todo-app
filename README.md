# Todo App (Angular)

A simple Todo application built with Angular standalone components.

## Features

- List todo items
- Add todo items
- Soft delete todo items
- Hide items with `isDeleted: true` in UI
- Backend API abstraction through `TodoApiService` and `BackendApiService`
- Mock backend interceptor available for local development/testing
- ESLint configuration for TypeScript + Angular templates
- Unit tests for core todo logic
- GitHub Actions CI workflow for lint, test, and build

## Tech Stack

- Angular 21
- RxJS
- Vitest (via Angular test runner)
- ESLint + angular-eslint

## Project Structure

- `src/app/components/todo-list/` — Todo list UI and behavior
- `src/app/services/todo-api.service.ts` — Todo domain service (delegates calls)
- `src/app/services/backend-api.service.ts` — Backend call implementation + fallback behavior
- `src/app/services/mock-backend.interceptor.ts` — In-memory mock API for todo endpoints
- `src/app/models/todo-item.model.ts` — Todo item model
- `src/app/app.config.ts` — App providers and API base URL configuration

## Getting Started

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm start
```

Open:

- `http://localhost:4200/`

## Scripts

- `npm start` — Start dev server
- `npm run build` — Build the project
- `npm run test` — Run unit tests
- `npm run lint` — Run ESLint
- `npm run lint:fix` — Auto-fix lint issues

## Backend API

Configured base URL is read from `.env`:

- `BACKEND_API_BASE_URL=http://localhost:8080`

This project supports **two backend modes**:

1. **Real backend mode** (default): call backend service using URL from `.env`
2. **Mock backend mode**: use in-memory mock API for local debugging

Expected endpoints:

- `GET /api/todo-items`
- `POST /api/todo-item` with body `{ "title": "..." }`
- `PATCH /api/todo-item/{id}` with body `{ "title": "..." }`
- `DELETE /api/todo-item/{id}`

## Mock Backend

The project contains a mock interceptor implementation in [src/app/services/mock-backend.interceptor.ts](src/app/services/mock-backend.interceptor.ts).

To enable mock backend debugging, update [src/app/app.config.ts](src/app/app.config.ts):

- import `withInterceptors` and `mockBackendInterceptor`
- change `provideHttpClient()` to `provideHttpClient(withInterceptors([mockBackendInterceptor]))`

To switch back to real backend mode, use `provideHttpClient()` and keep backend URL in `.env`.

## Testing

Run tests:

```bash
npm run ng -- test --watch=false
```

Current test coverage includes:

- Backend API service behavior with mock backend
- Todo list core component behavior (filter/add/delete error handling)

## Linting

Run lint checks:

```bash
npm run lint
```

Configuration file:

- `eslint.config.js`

## CI/CD

This project includes a GitHub Actions workflow:

- `.github/workflows/ci.yml`

It runs on push and pull request to `main` and `master`, and executes:

1. `npm ci`
2. `npm run lint`
3. `npm run ng -- test --watch=false`
4. `npm run build`

Build output is uploaded as an artifact named `todo-app-dist`.
