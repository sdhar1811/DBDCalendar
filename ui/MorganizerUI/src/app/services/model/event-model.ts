export class EventModel {
  eventId: number;
  userId: number;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  location: string;
  assigneeList: number[] = [];
  lastUpdatedOn: string;
  color: any;
  calendarId: number;
  reminderList: number[] = [];
  allDayEvent: boolean;
}
