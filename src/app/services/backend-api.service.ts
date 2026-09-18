import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TodoItem } from '../models/todo-item.model';
import { TODO_API_BASE_URL } from './todo-api.config';

@Injectable({ providedIn: 'root' })
export class BackendApiService {
  constructor(
    private readonly http: HttpClient,
    @Inject(TODO_API_BASE_URL) private readonly baseUrl: string
  ) {}

  /**
   * Fetches all todo items from the backend.
   * Returns an empty list when the request fails.
   */
  getTodoList(): Observable<TodoItem[]> {
    try {
      return this.http
        .get<TodoItem[]>(`${this.baseUrl}/api/todo/list`, {
          headers: new HttpHeaders({
            Accept: 'application/json'
          })
        })
        .pipe(catchError(() => of([])));
    } catch {
      return of([]);
    }
  }

  /**
   * Creates a todo item on the backend.
   * Returns null when the request fails.
   */
  addTodo(title: string): Observable<TodoItem | null> {
    try {
      return this.http
        .post<TodoItem>(`${this.baseUrl}/api/todo/add`, { title })
        .pipe(catchError(() => of(null)));
    } catch {
      return of(null);
    }
  }

  /**
   * Soft-deletes a todo item by id.
   * Returns false when the request fails.
   */
  deleteTodo(id: number): Observable<boolean> {
    try {
      return this.http
        .post(`${this.baseUrl}/api/todo/delete`, { id })
        .pipe(
          map(() => true),
          catchError(() => of(false))
        );
    } catch {
      return of(false);
    }
  }
}
