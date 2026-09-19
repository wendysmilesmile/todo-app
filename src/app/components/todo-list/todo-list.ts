import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TodoItem } from '../../models/todo-item.model';
import { TodoApiService } from '../../services/todo-api.service';

@Component({
  selector: 'app-todo-list',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss'
})
export class TodoListComponent implements OnInit {
  protected readonly todos = signal<TodoItem[]>([]);
  protected readonly visibleTodos = computed(() =>
    this.todos()
      .filter((item) => !item.isDeleted)
      .sort((a, b) => b.id - a.id)
  );
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal('');
  protected newTitle = '';
  protected readonly editingId = signal<number | null>(null);
  protected editTitle = '';

  constructor(private readonly todoApiService: TodoApiService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  protected loadTodos(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.todoApiService.getTodoList().subscribe({
      next: (items) => {
        this.todos.set(items ?? []);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Failed to load todo items. Please check the backend URL or service status.');
        this.loading.set(false);
      }
    });
  }

  protected addTodo(): void {
    const title = this.newTitle.trim();
    if (!title) {
      return;
    }

    this.todoApiService.addTodo(title).subscribe({
      next: (createdItem) => {
        if (!createdItem) {
          this.errorMessage.set('Failed to add todo item.');
          return;
        }

        this.newTitle = '';
        this.errorMessage.set('');
        this.loadTodos();
      },
      error: () => {
        this.errorMessage.set('Failed to add todo item.');
      }
    });
  }

  protected softDelete(id: number): void {
    this.todoApiService.deleteTodo(id).subscribe({
      next: (success) => {
        if (!success) {
          this.errorMessage.set('Failed to delete todo item.');
          return;
        }

        this.errorMessage.set('');
        this.loadTodos();
      },
      error: () => {
        this.errorMessage.set('Failed to delete todo item.');
      }
    });
  }

  protected startEdit(item: TodoItem): void {
    this.editingId.set(item.id);
    this.editTitle = item.title;
  }

  protected cancelEdit(): void {
    this.editingId.set(null);
    this.editTitle = '';
  }

  protected saveEdit(id: number): void {
    const title = this.editTitle.trim();
    if (!title) {
      this.errorMessage.set('Title cannot be empty.');
      return;
    }

    this.todoApiService.updateTodoTitle(id, title).subscribe({
      next: (updatedItem) => {
        if (!updatedItem) {
          this.errorMessage.set('Failed to update todo item.');
          return;
        }

        this.errorMessage.set('');
        this.cancelEdit();
        this.loadTodos();
      },
      error: () => {
        this.errorMessage.set('Failed to update todo item.');
      }
    });
  }
}
