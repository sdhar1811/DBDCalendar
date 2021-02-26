import {
  Component,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
  animations: [
    trigger('todoInOutAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(150%)' }),
        animate('0.5s'),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(200%)' }),
        animate('1s ease-in'),
      ]),
    ]),
  ],
})
export class EditTaskComponent implements OnInit {
  selectedCalendar = new FormControl();
  @Input() data;
  @Input() taskIndex;
  @Output() closeEmitter = new EventEmitter();

  calendarList = [];
  constructor() {}

  ngOnInit(): void {
    this.getCalendarList();
  }
  closeEditMode() {
    this.closeEmitter.emit(null);
  }

  getCalendarList() {
    this.calendarList.push({ name: 'Personal', id: '1' });
    this.calendarList.push({ name: 'Work', id: '2' });
    this.calendarList.push({ name: 'College', id: '3' });
    if (this.data[this.taskIndex].calendar?.length > 0) {
      this.selectedCalendar.setValue(this.data[this.taskIndex].calendar);
    }
  }
  removeTask() {
    this.data.splice(this.taskIndex, 1);
    this.closeEmitter.emit(null);
  }
  updateSelectedCalendar() {
    this.data[this.taskIndex].calendar = this.selectedCalendar.value;
  }
  selectSavedValues(c1: any, c2: any) {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
