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
import { getTime } from 'date-fns';
import { TodoListService } from 'src/app/services/todo-list.service';
import { ProfileService } from 'src/app/services/profile.service';
import { StoreService } from 'src/app/services/store.service';
import { ProfileModel } from 'src/app/services/model/profile-model';
import { MyCalendarService } from 'src/app/services/mycalendar.service';

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
  public enableMeridian = true;
  public defaultTime = [new Date().getHours, 0];

  selectedCalendar = new FormControl();
  @Input() data;
  @Input() taskIndex;
  @Output() closeEmitter = new EventEmitter();

  calendarList = [];

  assigneeList: ProfileModel[] = [];

  constructor(
    private taskService: TodoListService,
    private profileService: ProfileService,
    private storeService: StoreService,
    private calendarService: MyCalendarService
  ) {}

  ngOnInit(): void {
    this.getCalendarList();
    this.fetchAssingeeList();
  }
  closeEditMode() {
    this.data[this.taskIndex].calendarId = this.data[
      this.taskIndex
    ].calendar?.calendarId;
    this.data[this.taskIndex].color = this.data[this.taskIndex].calendar?.color;
    this.closeEmitter.emit(null);
  }

  fetchAssingeeList() {
    this.profileService
      .getAllProfile(this.storeService.loggedInUser.id)
      .subscribe((response) => {
        this.assigneeList = response;
      });
  }
  getCalendarList() {
    this.calendarService
      .getAllCalendars(this.storeService.loggedInUser.id)
      .subscribe((response) => {
        this.calendarList = response;
      });
  }
  removeTask() {
    this.taskService.deleteTask(this.data[this.taskIndex].id).subscribe(
      () => {},
      (error) => {}
    );
    this.data.splice(this.taskIndex, 1);
    this.closeEmitter.emit('remove');
  }
  compareCalendars(c1: any, c2: any) {
    return c1 && c2 ? c1.calendarId === c2.calendarId : c1 === c2;
  }
  compareAssignees(a1: any, a2: any) {
    return a1 && a2 ? a1.profileId === a2.profileId : a1 === a2;
  }
}
