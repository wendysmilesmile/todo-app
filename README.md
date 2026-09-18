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

Configured base URL is provided by `TODO_API_BASE_URL`.

Expected endpoints:

- `GET /api/todo/list`
- `POST /api/todo/add` with body `{ "title": "..." }`
- `POST /api/todo/delete` with body `{ "id": 1 }`

## Mock Backend

The project includes a mock interceptor that supports:

- `GET /api/todo/list`
- `POST /api/todo/add`
- `POST /api/todo/delete` (soft delete)

Switching between real backend and mock backend is controlled in `src/app/app.config.ts` by HTTP client provider setup.

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
