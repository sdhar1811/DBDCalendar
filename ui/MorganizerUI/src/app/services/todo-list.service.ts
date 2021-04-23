import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  todoListUrl: String;
  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private http: HttpClient
  ) {
    this.todoListUrl =
      this.appConfig.morganizerAPIEndpoint + this.appConfig.task;
  }
  createTask(title: string, userId: number) {
    const params = {
      title: title,
      userId: userId,
    };
    return this.http.post(this.todoListUrl + this.appConfig.createTask, params);
  }
  getTask(userId: string) {
    return this.http.get<any[]>(
      this.todoListUrl + this.appConfig.fetchAllTasks(userId)
    );
  }
  addTasksInTodoList(tasks) {
    return this.http.post<any>(
      this.todoListUrl + this.appConfig.addTasks,
      tasks
    );
  }
  deleteTask(taskId) {
    return this.http.delete<any>(
      this.todoListUrl + this.appConfig.deleteTask(taskId)
    );
  }
}
