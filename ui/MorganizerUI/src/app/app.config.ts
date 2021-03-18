import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface IAppConfig {
  morganizerAPIEndpoint: string;
  login: string;
  logout: string;
  register: string;
  resetpassword: string;
  task;
  createTask: string;
  fetchAllTasks: any;
  event: string;
  fetchAllEvents: any;
  addEvent: string;
  updateEvent: string;
  deleteEvent: any;
  deleteTask: any;
  addTasks: string;
}
export const APPCONFIG: IAppConfig = {
  morganizerAPIEndpoint: environment.morgainzedAPIURL,
  login: '/user/login',
  logout: '/user/logout',
  register: '/user/register',
  resetpassword: 'user/resetpassword',
  task: '/todoList',
  createTask: '/create',
  addTasks: '/add/tasks',
  fetchAllTasks: (userId: string) => `/all/${userId}`,
  event: '/event',
  fetchAllEvents: (userId: string) => `/fetchAll/${userId}`,
  deleteTask: (taskId: number) => `/task/${taskId}`,
  addEvent: '/add',
  updateEvent: '/update',
  deleteEvent: (eventId: number) => `/remove/${eventId}`,
};
export const APP_CONFIG = new InjectionToken<IAppConfig>('app.config');
