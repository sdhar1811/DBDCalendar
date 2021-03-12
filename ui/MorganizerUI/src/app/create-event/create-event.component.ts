import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
  color: any;
  editFlag: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CreateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
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

    this.close();
  }

  updateEvent(): void {
    this.data.color = { primary: this.color, secondary: this.color };

    this.close();
  }
}
