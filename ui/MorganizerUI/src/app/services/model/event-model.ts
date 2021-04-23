import { MyCalendarModel } from './mycalendar-model';

export class EventModel {
  eventId: number;
  userId: number;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  location: string;
  assigneeList = [];
  lastUpdatedOn: string;
  color: any;
  // calendarId: number;
  recurringModeId: number;
  reminderList: number[] = [];
  allDayEvent: boolean;
  calendar: MyCalendarModel;
}
