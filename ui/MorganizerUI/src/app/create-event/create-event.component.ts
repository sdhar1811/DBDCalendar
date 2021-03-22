import { Component, Inject, OnInit, Input, Output } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';
import { EventService } from '../services/event.service';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatDateFormats, NGX_MAT_DATE_FORMATS} from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';


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

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
  providers:[
    {provide: NGX_MAT_DATE_FORMATS, useValue:CUSTOM_DATE_TIME_FORMAT}
  ]
})


export class CreateEventComponent implements OnInit {
  color: any;
  editFlag: boolean = false;
  calendarList = [];
  public enableMeridian = true;

  constructor(
    private dialogRef: MatDialogRef<CreateEventComponent>,
    private eventService: EventService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.fetchCalendars();
    this.editFlag = this.data.title == null ? false : true;
    // this.color = this.data.color == null ? '#1e90ff' : this.data.color;
    // this.data.participant = [1];
  }

  close(): void {
    this.dialogRef.close(this.data);
  }

  // colorChange(event): void {
  //   console.log(event);
  //   this.data.color = this.color;
  // }

  assigneeLst = [
    { name: 'Sharad', id: 1 },
    { name: 'Satyen', id: 2 },
    { name: 'Dhananjay', id: 3 },
    { name: 'Asmi', id: 4 },
    { name: 'Khushboo', id: 5 }
  ];

  createEvent(): void {
    // this.data.color = this.color;
    console.log(JSON.stringify(this.data));
    console.log(this.data.reminderList);
    console.log(this.data.color);

    this.eventService.addEvent(this.data).subscribe(
      (response) => {
        if (response) {
          console.log('Event Created');
        }
      },
      (error) => {
        console.log('Something went wrong');
        // window.alert('#TODO: Something went wrong.');
      }
    );
    this.close();
  }

  editEvent(): void {
    //this.data.color = { primary: this.color, secondary: this.color };
    // this.data.color = this.color;
    console.log(JSON.stringify(this.data));
    this.eventService.updateEvent(this.data).subscribe(
      (response) => {
        if (response) {
          console.log('Event Updated');
          this.close();
        }
      },
      (error) => {
        console.log('Something went wrong');
        // window.alert('#TODO: Something went wrong.');
        this.close();
      }
    );
  }

  cancelUpdateToEvent(): void {
    this.close();
  }

  fetchCalendars() {
    this.calendarList.push({ name: 'Work', color: '#00ACC1', value: '' });
    this.calendarList.push({ name: 'Personal', color: '#AB47BC', value: '' });
    this.calendarList.push({ name: 'School', color: '#455A64', value: '' });
    this.calendarList.push({ name: 'Medical', color: '#C0CA33', value: '' });
  }
}
