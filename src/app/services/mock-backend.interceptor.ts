import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { TodoItem } from '../models/todo-item.model';

const MOCK_NETWORK_DELAY_MS = 250;

let mockTodos: TodoItem[] = [
  { id: 1, title: 'Read Angular docs', isDeleted: false },
  { id: 2, title: 'Write unit tests', isDeleted: false },
  { id: 3, title: 'Legacy deleted item', isDeleted: true }
];

/**
 * Normalizes a request URL into a pathname so endpoint matching works
 * for both absolute and relative URLs.
 */
function getPathname(url: string): string {
  try {
    return new URL(url, window.location.origin).pathname;
  } catch {
    return url;
  }
}

/**
 * Creates a standardized HTTP 400 response for invalid mock request payloads.
 */
function badRequest(message: string): Observable<never> {
  return throwError(
    () =>
      new HttpErrorResponse({
        status: 400,
        statusText: 'Bad Request',
        error: { message }
      })
  );
}

/**
 * Handles mock implementations for todo endpoints:
 * - GET /api/todo-items
 * - POST /api/todo-item
 * - DELETE /api/todo-item/{id} (soft delete)
 * Returns null when the request is not a mocked endpoint.
 */
function handleMockRequest(req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> | null {
  const pathname = getPathname(req.url);

  if (req.method === 'GET' && pathname.endsWith('/api/todo-items')) {
    return of(new HttpResponse<TodoItem[]>({ status: 200, body: [...mockTodos] })).pipe(
      delay(MOCK_NETWORK_DELAY_MS)
    );
  }

  if (req.method === 'POST' && pathname.endsWith('/api/todo-item')) {
    const body = req.body as { title?: string } | null;
    const title = body?.title?.trim();

    if (!title) {
      return badRequest('title is required');
    }

    const nextId = mockTodos.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;
    const created: TodoItem = {
      id: nextId,
      title,
      isDeleted: false
    };

    mockTodos = [...mockTodos, created];

    return of(new HttpResponse<TodoItem>({ status: 200, body: created })).pipe(
      delay(MOCK_NETWORK_DELAY_MS)
    );
  }

  if (req.method === 'DELETE' && pathname.includes('/api/todo-item/')) {
    const idText = pathname.substring(pathname.lastIndexOf('/') + 1);
    const parsedId = Number(idText);
    const id = Number.isNaN(parsedId) ? undefined : parsedId;

    if (typeof id !== 'number') {
      return badRequest('id is required');
    }

    mockTodos = mockTodos.map((item) =>
      item.id === id
        ? {
            ...item,
            isDeleted: true
          }
        : item
    );

    return of(new HttpResponse({ status: 200, body: { success: true } })).pipe(
      delay(MOCK_NETWORK_DELAY_MS)
    );
  }

  return null;
}

/**
 * Intercepts HTTP requests and returns mock responses for known todo APIs.
 * Requests that do not match the mock endpoints are forwarded to the next handler.
 */
export const mockBackendInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const mockResult = handleMockRequest(req);
  if (mockResult) {
    return mockResult;
  }

  return next(req);
};
