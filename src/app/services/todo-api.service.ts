import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem } from '../models/todo-item.model';
import { BackendApiService } from './backend-api.service';

@Injectable({ providedIn: 'root' })
export class TodoApiService {
  constructor(private readonly backendApiService: BackendApiService) {}

  /**
   * Gets the todo list by delegating to BackendApiService.
   */
  getTodoList(): Observable<TodoItem[]> {
    return this.backendApiService.getTodoList();
  }

  /**
   * Adds a todo item by delegating to BackendApiService.
   */
  addTodo(title: string): Observable<TodoItem | null> {
    return this.backendApiService.addTodo(title);
  }

  /**
   * Updates a todo title by delegating to BackendApiService.
   */
  updateTodoTitle(id: number, title: string): Observable<TodoItem | null> {
    return this.backendApiService.updateTodoTitle(id, title);
  }

  /**
   * Deletes (soft-deletes) a todo item by delegating to BackendApiService.
   */
  deleteTodo(id: number): Observable<boolean> {
    return this.backendApiService.deleteTodo(id);
  }
}
