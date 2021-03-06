import { Component, Inject, OnInit, Input, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
  @Input() eventIndex;
  @Output() closeEmitter = new EventEmitter();
  color: any;
  editFlag: boolean = false;


  constructor(
    private dialogRef: MatDialogRef<CreateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    console.log('color');
    console.log(this.data.color.primary);
    console.log(this.data.startTime);
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
    this.data.color = { primary: this.color, secondary: this.color };
    console.log(JSON.stringify(this.data));
    this.close();
  }

  updateEvent(): void {
    this.data.color = { primary: this.color, secondary: this.color };
    console.log(JSON.stringify(this.data));
    this.close();
  }

  deleteEvent():void {
    const eventIndex = this.data.indexOf();
    this.data.splice(eventIndex, 1);
    this.closeEmitter.emit(null);
  }
}
