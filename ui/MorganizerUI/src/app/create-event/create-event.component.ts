import {
  Component,
  Inject,
  OnInit,
  Input,
  Output,
  Injector,
  Directive,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';
import { EventService } from '../services/event.service';
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMatDateFormats,
  NGX_MAT_DATE_FORMATS,
} from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { ProfileService } from '../services/profile.service';
import { StoreService } from '../services/store.service';
import { MyCalendarService } from '../services/mycalendar.service';
import * as moment from 'moment-timezone';
import { EventModel } from '../services/model/event-model';
import { ConfirmationDialogService } from 'src/app/core/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
  providers: [ConfirmationDialogService],
  // providers: [
  //   { provide: NGX_MAT_DATE_FORMATS, multi:true, useValue: CUSTOM_DATE_ONLY_FORMAT },
  //   { provide: NGX_MAT_DATE_FORMATS, multi:true, useValue: CUSTOM_DATE_TIME_FORMAT },
  // ],
})
export class CreateEventComponent implements OnInit {
  color: any;
  editFlag: boolean = false;
  calendarList = [];
  assigneeList = [];
  public enableMeridian = true;
  public defaultTime = [new Date().getHours, 0];
  allDayFlag: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CreateEventComponent>,
    private eventService: EventService,
    private profileService: ProfileService,
    private storeService: StoreService,
    private calendarService: MyCalendarService,
    private confirmationDialogService: ConfirmationDialogService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.fetchMyCalendarList();
    this.fetchAssigneeList();
    this.editFlag = this.data.title == null ? false : true;
    // this.color = this.data.color == null ? '#1e90ff' : this.data.color;
    // this.data.participant = [1];
  }

  close(response): void {
    this.dialogRef.close(response);
  }

  // colorChange(event): void {
  //   console.log(event);
  //   this.data.color = this.color;
  // }
  recurringEventsArr = [
    'NA',
    'None',
    'Daily',
    'Weekly',
    'BiWeekly',
    'Monthly',
    'Yearly',
  ];

  reminderLst = [
    { title: '5 minutes', value: '5', id: 1 },
    { title: '10 minutes', value: '10', id: 2 },
    { title: '15 minutes', value: '15', id: 3 },
    { title: '30 minutes', value: '30', id: 4 },
    { title: '1 hour', value: '60', id: 5 },
    { title: '2 hours', value: '120', id: 6 },
  ];

  createEvent(): void {
    if (this.data.allDayEvent == true) {
      this.data.startTime = moment(this.data.startTime).startOf('day').toDate();
      this.data.endTime = moment(this.data.startTime).endOf('day').toDate();
    }
    // this.data.color = this.calendarList
    //   .filter((calendar) => calendar.calendarId == this.data.calendarId)
    //   .map((calendar) => calendar.color)[0];

    this.eventService.addEvent(this.data).subscribe(
      (response) => {
        if (response) {
          this.close(true);
        }
      },
      (error) => {
        console.log('Something went wrong');
        this.close(true);
        // window.alert('#TODO: Something went wrong.');
      }
    );
  }

  updateEvent() {
    let recurMode = this.data.recurringModeId;
    if (recurMode != 1) {
      this.confirmationDialogService
        .confirm(
          'This is a ' +
            this.recurringEventsArr[recurMode].bold() +
            ' recurring event. Are you sure you want to update it?',
          'Changes to this event would update all its corresponding instances.',
          'Update Recurring Event',
          'Cancel'
        )
        .then((confirmed) => {
          if (confirmed) {
            this.createEvent();
          }
        })
        .catch(() => {});
    } else {
      this.createEvent();
    }
  }

  cancelUpdateToEvent(): void {
    this.close(false);
  }

  fetchMyCalendarList() {
    this.calendarService
      .getAllCalendars(this.storeService.loggedInUser?.id)
      .subscribe(
        (response) => {
          if (response) {
            this.calendarList = response;
          }
        },
        (error) => {
          // this.loading = false;
          //TODO:Handle API error
        }
      );
  }

  fetchAssigneeList() {
    this.profileService
      .getAllProfile(this.storeService.loggedInUser?.id)
      .subscribe(
        (response) => {
          if (response) {
            this.assigneeList = response;
          }
        },
        (error) => {
          // this.loading = false;
          //TODO:Handle API error
        }
      );
  }
  compareAssigneeObjects(obj1, obj2) {
    return obj1 && obj2 ? obj1.profileId === obj2.profileId : obj1 === obj2;
  }

  compareCalendarObjects(obj1, obj2) {
    return obj1 && obj2 ? obj1.calendarId === obj2.calendarId : obj1 === obj2;
  }
}

export const DATETIME_WITHOUT_SECONDS_FORMAT = 'MM-DD-YYYY, hh:mm A';
export const CUSTOM_DATE_TIME_FORMAT: NgxMatDateFormats = {
  parse: {
    dateInput: DATETIME_WITHOUT_SECONDS_FORMAT,
  },
  display: {
    dateInput: DATETIME_WITHOUT_SECONDS_FORMAT,
    monthYearLabel: 'MM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const DATE_WITHOUT_TIME_FORMAT = 'MM-DD-YYYY';
export const CUSTOM_DATE_ONLY_FORMAT: NgxMatDateFormats = {
  parse: {
    dateInput: DATE_WITHOUT_TIME_FORMAT,
  },
  display: {
    dateInput: DATE_WITHOUT_TIME_FORMAT,
    monthYearLabel: 'MM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Directive({
  selector: '[dateFormat1]',
  providers: [
    { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_ONLY_FORMAT },
  ],
})
export class CustomDateFormat1 {}

@Directive({
  selector: '[dateFormat2]',
  providers: [
    { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_TIME_FORMAT },
  ],
})
export class CustomDateFormat2 {}
