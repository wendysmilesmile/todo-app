import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-todo-add-item',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './todo-add-item.html'
})
export class TodoAddItemComponent {
  @Input() title = '';
  @Output() readonly titleChange = new EventEmitter<string>();
  @Output() readonly add = new EventEmitter<string>();

  protected onAdd(): void {
    this.add.emit(this.title);
  }
}
