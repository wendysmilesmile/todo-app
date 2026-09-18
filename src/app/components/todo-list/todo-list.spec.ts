import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TodoApiService } from '../../services/todo-api.service';
import { TodoListComponent } from './todo-list';

describe('TodoListComponent core logic', () => {
  let getTodoListSpy: ReturnType<typeof vi.fn>;
  let addTodoSpy: ReturnType<typeof vi.fn>;
  let deleteTodoSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    getTodoListSpy = vi.fn().mockReturnValue(
      of([
        { id: 1, title: 'Visible Item', isDeleted: false },
        { id: 2, title: 'Deleted Item', isDeleted: true }
      ])
    );
    addTodoSpy = vi.fn().mockReturnValue(of({ id: 3, title: 'New Item', isDeleted: false }));
    deleteTodoSpy = vi.fn().mockReturnValue(of(true));

    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
      providers: [
        {
          provide: TodoApiService,
          useValue: {
            getTodoList: getTodoListSpy,
            addTodo: addTodoSpy,
            deleteTodo: deleteTodoSpy
          }
        }
      ]
    }).compileComponents();
  });

  it('should filter out soft-deleted items from visibleTodos', () => {
    const fixture = TestBed.createComponent(TodoListComponent);
    fixture.detectChanges();

    const component = fixture.componentInstance as any;
    expect(component.todos().length).toBe(2);
    expect(component.visibleTodos().length).toBe(1);
    expect(component.visibleTodos()[0].title).toBe('Visible Item');
  });

  it('should not call addTodo API for empty title', () => {
    const fixture = TestBed.createComponent(TodoListComponent);
    const component = fixture.componentInstance as any;

    component.newTitle = '   ';
    component.addTodo();

    expect(addTodoSpy).not.toHaveBeenCalled();
  });

  it('should set error when addTodo returns null', () => {
    addTodoSpy.mockReturnValue(of(null));

    const fixture = TestBed.createComponent(TodoListComponent);
    const component = fixture.componentInstance as any;

    component.newTitle = 'Task';
    component.addTodo();

    expect(component.errorMessage()).toBe('Failed to add todo item.');
  });

  it('should set error when deleteTodo returns false', () => {
    deleteTodoSpy.mockReturnValue(of(false));

    const fixture = TestBed.createComponent(TodoListComponent);
    const component = fixture.componentInstance as any;

    component.softDelete(1);

    expect(component.errorMessage()).toBe('Failed to delete todo item.');
  });
});
