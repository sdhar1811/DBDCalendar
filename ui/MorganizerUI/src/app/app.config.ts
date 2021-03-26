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
  profile: string;
  fetchAllProfiles: any;
  mycalendar: string;
  fetchAllCalendars: any;
  deleteCalendar: any;
  addCalendar: string;
  addProfile: string;
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
  profile: '/profile',
  fetchAllProfiles: (userId: string) => `/fetchAll/${userId}`,
  mycalendar: '/calendar',
  fetchAllCalendars: (userId: string) => `/fetchAll/${userId}`,
  deleteCalendar: (calendarId: number) => `/remove/${calendarId}`,
  addCalendar: '/add',
  addProfile: '/add',
};
export const APP_CONFIG = new InjectionToken<IAppConfig>('app.config');
