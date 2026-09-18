import { Component } from '@angular/core';
import { TodoListComponent } from './components/todo-list/todo-list';

@Component({
  selector: 'app-root',
  imports: [TodoListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
