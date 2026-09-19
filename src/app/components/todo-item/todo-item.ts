import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TodoItem } from '../../models/todo-item.model';

@Component({
  selector: 'app-todo-item',
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './todo-item.html'
})
export class TodoItemComponent {
  @Input({ required: true }) item!: TodoItem;
  @Input() isEditing = false;
  @Input() editTitle = '';

  @Output() readonly startEdit = new EventEmitter<TodoItem>();
  @Output() readonly editTitleChange = new EventEmitter<string>();
  @Output() readonly saveEdit = new EventEmitter<number>();
  @Output() readonly cancelEdit = new EventEmitter<void>();
  @Output() readonly deleteItem = new EventEmitter<number>();
}
