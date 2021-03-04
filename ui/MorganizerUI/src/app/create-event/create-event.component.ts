import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  color: any = '#673ab7';

  constructor(private dialogRef: MatDialogRef<CreateEventComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close(this.data);
  }

  // colorChange(event): void {
  //   console.log(event);
  //   this.data.color = this.color;
  // }

  createEvent(): void {
    this.data.color = {primary: this.color, secondary: this.color};
    console.log(JSON.stringify(this.data));
    this.close();
  }

}
