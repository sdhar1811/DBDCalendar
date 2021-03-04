export class EventModel {
  eventId: number;
  userId: number;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  location: string;
  participant: string[];
  lastUpdatedOn: string;
  color: any;
}
