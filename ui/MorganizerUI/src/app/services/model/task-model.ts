import { endOfToday, startOfToday } from 'date-fns';
import { EventModel } from './event-model';

export class TaskModel extends EventModel {
  id: any = undefined;
  title: string;
  description: string;
  calendar: {};
  color: string;
  complete = false;
  draggable = true;
  start: Date = startOfToday();
  dueDate: Date = undefined;
  userId: number;
  todoListId: number;
  assigneeList: number[] = [];
}
