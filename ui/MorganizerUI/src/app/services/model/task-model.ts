import { endOfToday, startOfToday } from 'date-fns';
import { EventModel } from './event-model';

export class TaskModel extends EventModel {
  id: any = undefined;
  complete = false;
  draggable = true;
  start: Date = startOfToday();
  dueDate: Date = undefined;
  todoListId: number;
}
