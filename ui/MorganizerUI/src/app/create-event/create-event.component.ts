import { Component, Inject, OnInit, Input, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
  color: any = '#1e90ff';
  editFlag: boolean = false;
  calendars = [];

  constructor(
    private dialogRef: MatDialogRef<CreateEventComponent>,
    private eventService: EventService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    //console.log('color');
    //console.log(this.data.color.primary);
    //console.log(this.data.startTime);
    this.fetchCalendars();
    this.editFlag = this.data.color.primary == '' ? false : true;
    this.color =
      this.data.color.primary == '' ? '#973000' : this.data.color.primary;
  }

  close(): void {
    this.dialogRef.close(this.data);
  }

  // colorChange(event): void {
  //   console.log(event);
  //   this.data.color = this.color;
  // }

  createEvent(): void {
    this.data.color = this.color;
    console.log(JSON.stringify(this.data));

    this.eventService.addEvent(this.data).subscribe(
      (response) => {
        if (response) {
          console.log('Event Created');
        }
      },
      (error) => {
        console.log("Something went wrong");
        // window.alert('#TODO: Something went wrong.');
      }
    );
    this.close();
  }

  updateEvent(): void {
    this.data.color = { primary: this.color, secondary: this.color };
    console.log(JSON.stringify(this.data));
    this.close();
  }

  cancelUpdateToEvent(): void {
    this.close();
    /* Still displays edited event - All changes should be nullified*/
  }

  fetchCalendars() {
    this.calendars.push({ name: 'Work', color: 'red', value: '' });
    this.calendars.push({ name: 'Personal', color: 'red', value: '' });
    this.calendars.push({ name: 'Gym', color: 'red', value: '' });
    this.calendars.push({ name: 'College', color: 'red', value: '' });
    this.calendars.push({ name: 'Home', color: 'red', value: '' });
    this.calendars.push({ name: 'Market', color: 'red', value: '' });
  }
}
