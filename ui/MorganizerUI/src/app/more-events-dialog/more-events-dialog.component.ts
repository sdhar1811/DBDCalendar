import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { differenceInCalendarDays } from 'date-fns';
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
    const dialogOffset = 15;
    matDialogConfig.position = {
      left: Number(`${rect.left}`) - dialogOffset + 'px',
      top: Number(`${rect.top}`) - dialogOffset + 'px',
    };
    const width = Number(`${rect.width}`) + dialogOffset * 3;

    matDialogConfig.width = width + 'px';
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
  isLongEvent(event) {
    if (differenceInCalendarDays(event.end, event.start) > 0) {
      return true;
    }
    return false;
  }
  checkIfFirstCell(event, currentDate) {
    if (differenceInCalendarDays(currentDate, event.start) == 0) {
      return true;
    } else {
      return false;
    }
  }
  checkIfLastCell(event, currentDate) {
    if (differenceInCalendarDays(currentDate, event.end) == 0) {
      return true;
    } else {
      return false;
    }
  }
  checkIfMiddleCell(event, currentDate) {
    if (
      !this.checkIfLastCell(event, currentDate) &&
      !this.checkIfFirstCell(event, currentDate)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
