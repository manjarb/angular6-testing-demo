import { from, EMPTY, throwError } from 'rxjs';

import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  it('should set todos property with the items returned from the server', () => {
    const todos = [1, 2, 3];

    spyOn(service, 'getTodos').and.callFake(() => {
      return from([ todos ]);
    });

    component.ngOnInit();

    expect(component.todos).toBe(todos);
  });

  it('should call the server to save the changes when a new todo item is added', () => {
    const spy = spyOn(service, 'add').and.callFake(t => {
      return EMPTY;
    });

    component.add();

    expect(spy).toHaveBeenCalled();
  });

  it('should add the new todo returned from the server', () => {
    const todo = { id: 1 };

    const spy = spyOn(service, 'add').and.callFake(t => {
      return from([ todo ]);
    });

    component.add();

    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });

  it('should set the message property if server returns an error when adding a new todo', () => {
    const error = 'error from the server';

    const spy = spyOn(service, 'add').and.callFake(t => {
      return throwError(error);
    });

    component.add();

    expect(component.message).toBe(error);
  });
});
