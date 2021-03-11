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
  updateEvent: string;
}
export const APPCONFIG: IAppConfig = {
  morganizerAPIEndpoint: environment.morgainzedAPIURL,
  login: '/user/login',
  logout: '/user/logout',
  register: '/user/register',
  resetpassword: 'user/resetpassword',
  task: '/tasks',
  createTask: '/create',
  fetchAllTasks: (userId: string) => `/all/${userId}`,
  event: '/event',
  fetchAllEvents: (userId: string) => `/fetchAll/${userId}`,
  updateEvent: '/update',
};
export const APP_CONFIG = new InjectionToken<IAppConfig>('app.config');
