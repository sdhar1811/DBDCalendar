import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { MyCalendarModel } from './model/mycalendar-model';

@Injectable({
  providedIn: 'root',
})
export class MyCalendarService {
  calendarURL: string;

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private http: HttpClient
  ) {
    this.calendarURL = appConfig.morganizerAPIEndpoint + appConfig.mycalendar;
  }

  getAllCalendars(userId: String) {
    return this.http.get<MyCalendarModel[]>(
      this.calendarURL + this.appConfig.fetchAllCalendars(userId)
    );
  }

  deleteCalendarFromList(calendarId: number) {
    console.log(calendarId);
    return this.http.delete(
      this.calendarURL + this.appConfig.deleteCalendar(calendarId)
    );
  }

  addCalendar(newCalendar: MyCalendarModel) {
    return this.http.post(
      this.calendarURL + this.appConfig.addCalendar,
      newCalendar
    );
  }
}
