import { Component, OnInit } from '@angular/core';
import { CalendarView } from 'angular-calendar';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-calendar-control',
  templateUrl: './calendar-control.component.html',
  styleUrls: ['./calendar-control.component.scss'],
})
export class CalendarControlComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  CalendarView = CalendarView;
  activeDayIsOpen: boolean = false;
  today: Date = new Date();

  constructor(private storeService: StoreService) {
    this.storeService.calendarDayClicked.subscribe((date) => {
      this.viewDate = date;
    });
    this.storeService.calendarViewChange.next({
      viewDate: this.viewDate,
      view: this.view,
    });
  }

  ngOnInit(): void {}
  addEvent() {}
  setView(view: CalendarView) {
    this.view = view;
    this.updateCalendarView();
  }
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  updateCalendarView() {
    this.storeService.calendarViewChange.next({
      viewDate: this.viewDate,
      view: this.view,
    });
  }
}
