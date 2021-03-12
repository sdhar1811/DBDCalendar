import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { EventModel } from './model/event-model';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  eventURL: string;
  eventDropped: Subject<any> = new Subject();
  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private http: HttpClient,
    private storeService: StoreService
  ) {
    this.eventURL = appConfig.morganizerAPIEndpoint + appConfig.event;
  }

  updateEvent(calendarEvent: CalendarEvent) {
    return this.http.post(
      this.eventURL + this.appConfig.updateEvent,
      calendarEvent
    );
  }

  getAllEvents(userId: string) {
    return this.http.get<EventModel[]>(
      this.eventURL + this.appConfig.fetchAllEvents(userId)
    );
  }

  addEvent(event: EventModel) {
    event.userId = 3; // this.storeService.getProperty('loggedInUser').id;
    return this.http.post(this.eventURL + this.appConfig.addEvent, event);
  }

  deleteEvent(calendarEvent: number) {
    console.log(calendarEvent);
    return this.http.delete(
      this.eventURL + this.appConfig.deleteEvent(calendarEvent)
    );
  triggerEventDropped(event) {
    this.eventDropped.next(event);
  }
  triggerEventDropped(event) {
    this.eventDropped.next(event);
  }
}
