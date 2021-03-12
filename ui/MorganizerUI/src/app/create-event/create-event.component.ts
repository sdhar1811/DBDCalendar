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
    this.fetchCalendars();
    this.editFlag = this.data.title == null ? false : true;
    this.color = this.data.color == null ? '#1e90ff' : this.data.color;
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
        console.log('Something went wrong');
        // window.alert('#TODO: Something went wrong.');
      }
    );
    this.close();
  }

  editEvent(): void {
    //this.data.color = { primary: this.color, secondary: this.color };
    this.data.color = this.color;
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
    this.calendars.push({ name: 'Work', color: 'red', value: '' });
    this.calendars.push({ name: 'Personal', color: 'red', value: '' });
    this.calendars.push({ name: 'Gym', color: 'red', value: '' });
    this.calendars.push({ name: 'College', color: 'red', value: '' });
    this.calendars.push({ name: 'Home', color: 'red', value: '' });
    this.calendars.push({ name: 'Market', color: 'red', value: '' });
  }
}
