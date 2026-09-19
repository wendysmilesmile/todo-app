import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { BackendApiService } from './backend-api.service';
import { mockBackendInterceptor } from './mock-backend.interceptor';
import { TODO_API_BASE_URL } from './todo-api.config';

describe('BackendApiService', () => {
  let service: BackendApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([mockBackendInterceptor])),
        {
          provide: TODO_API_BASE_URL,
          useValue: 'http://localhost:5151'
        }
      ]
    });

    service = TestBed.inject(BackendApiService);
  });

  it('should fetch todo list from mock backend', async () => {
    const items = await firstValueFrom(service.getTodoList());

    expect(items.length).toBeGreaterThan(0);
  });

  it('should add a todo item through mock backend', async () => {
    const created = await firstValueFrom(service.addTodo('New Task'));

    expect(created?.title).toBe('New Task');
  });

  it('should return null for invalid add payload through mock backend', async () => {
    const result = await firstValueFrom(service.addTodo('   '));

    expect(result).toBeNull();
  });

  it('should update todo title through mock backend', async () => {
    const updated = await firstValueFrom(service.updateTodoTitle(1, 'Do swimming - updated'));

    expect(updated?.title).toBe('Do swimming - updated');
  });

  it('should soft-delete a todo item through mock backend', async () => {
    const deleteResult = await firstValueFrom(service.deleteTodo(1));
    expect(deleteResult).toBe(true);

    const items = await firstValueFrom(service.getTodoList());
    const deletedItemFlag = items.find((item) => item.id === 1)?.isDeleted;

    expect(deletedItemFlag).toBe(true);
  });
});
