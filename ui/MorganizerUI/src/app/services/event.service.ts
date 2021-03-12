import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { EventModel } from './model/event-model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  eventURL: string;
  eventDropped: Subject<any> = new Subject();
  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private http: HttpClient
  ) {
    this.eventURL = appConfig.morganizerAPIEndpoint + appConfig.event;
  }

  updateEvent(calendarEvent: CalendarEvent) {
    return this.http.post(
      this.eventURL + this.appConfig.updateEvent,
      calendarEvent
    );
  }
  triggerEventDropped(event) {
    this.eventDropped.next(event);
  }
}
