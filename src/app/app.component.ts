import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

class Todo {
  id: string;
  description: string;
  isDone: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'TODO list with Angular';

  public todos: Todo[] = [];
  public description: string;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const data = JSON.parse(localStorage.getItem('todos'));

    if (data) {
      this.todos = data;
    }
  }
  saveData(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  addNewTodo(): void {
    if (this.description) {
      this.todos.push({
        id: uuidv4(),
        description: this.description,
        isDone: false,
      });
      console.log({ todos: this.todos });
      this.description = null;
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }

  doneTodo(id: string): void {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      }
      return todo;
    });
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  removeTodo(id: string): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
