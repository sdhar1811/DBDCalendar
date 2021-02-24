import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-list-dialog',
  templateUrl: './new-list-dialog.component.html',
  styleUrls: ['./new-list-dialog.component.scss'],
})
export class NewListDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<NewListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {}
  saveName() {
    this.dialogRef.close(this.data);
  }
}
