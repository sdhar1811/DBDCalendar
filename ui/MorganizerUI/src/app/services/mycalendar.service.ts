import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { MyCalendarModel } from './model/mycalendar-model';

@Injectable({
  providedIn: 'root',
})
export class MyCalendarService {
  eventURL: string;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private http: HttpClient
  ) {
    this.eventURL = appConfig.morganizerAPIEndpoint + appConfig.mycalendar;
  }

  getAllCalendars(userId: String) {
    return this.http.get<MyCalendarModel[]>(
      this.eventURL + this.appConfig.fetchAllCalendars(userId)
    );
  }
}
