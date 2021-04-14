import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-event-details-dialog',
  templateUrl: './event-details-dialog.component.html',
  styleUrls: ['./event-details-dialog.component.scss'],
})
export class EventDetailsDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<EventDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public event
  ) {}

  ngOnInit(): void {}
  closeDialog() {
    this.dialogRef.close(null);
  }
  editEvent(mode) {
    this.dialogRef.close(mode);
  }

  recurringEventsArr = [
    'NA',
    'None',
    'Daily',
    'Weekly',
    'BiWeekly',
    'Monthly',
    'Yearly',
  ];
}
