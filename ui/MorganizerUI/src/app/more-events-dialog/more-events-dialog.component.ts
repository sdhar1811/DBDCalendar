import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { EventDetailsDialogComponent } from '../core/home-screen/event-details-dialog/event-details-dialog.component';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-more-events-dialog',
  templateUrl: './more-events-dialog.component.html',
  styleUrls: ['./more-events-dialog.component.scss'],
})
export class MoreEventsDialogComponent implements OnInit {
  constructor(
    private matDialogRef: MatDialogRef<MoreEventsDialogComponent>,
    private storeService: StoreService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      events;
      date;
      refElement: ElementRef;
    }
  ) {}

  ngOnInit(): void {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    const rect = this.data.refElement.nativeElement.getBoundingClientRect();
    matDialogConfig.position = {
      left: `${rect.left}px`,
      top: `${rect.top}px`,
    };
    matDialogConfig.width = `${rect.width}px`;
    // matDialogConfig.height = `${rect.height}px`;
    this.matDialogRef.updateSize(matDialogConfig.width, matDialogConfig.height);
    this.matDialogRef.updatePosition(matDialogConfig.position);
  }
  close() {
    this.matDialogRef.close();
  }
  emitEventClicked(event) {
    this.storeService.showEventDetailsEmitter.next(event);
  }
  dragEnd(event) {
    this.close();
  }
}
