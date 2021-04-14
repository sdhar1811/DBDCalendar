import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  differenceInCalendarDays,
  getDate,
  isSameDay,
  isSameMonth,
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarEventTitleFormatter,
  CalendarView,
} from 'angular-calendar';
import { Observable, Subject } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateEventComponent } from 'src/app/create-event/create-event.component';
import { EventModel } from 'src/app/services/model/event-model';
import { StoreService } from 'src/app/services/store.service';
import { CustomEventTitleFormatter } from './custom-event-title-formatter.provider';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { EventDetailsDialogComponent } from './event-details-dialog/event-details-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { MoreEventsDialogComponent } from 'src/app/more-events-dialog/more-events-dialog.component';

// const colors: any = {
//   red: {
//     primary: '#ad2121',
//     secondary: '#FAE3E3',
//   },
//   blue: {
//     primary: '#1e90ff',
//     secondary: '#D1E8FF',
//   },
//   yellow: {
//     primary: '#e3bc08',
//     secondary: '#FDF1BA',
//   },
// };

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss'],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
})
export class HomeScreenComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  showRightPanel = false;
  calendarClass = 'col-md-9';
  rightPanelClass = 'col-md-1';
  view: any = CalendarView.Month;
  loading = true;
  showAgenda = false;
  selectedProfiles = [];
  selectedCalendars = [];

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  isLongEvent = false;
  modalData: {
    action: string;
    event: CalendarEvent<{ eventModel: EventModel }>;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="material-icons md-18">edit</i>',
      a11yLabel: 'Edit',
      onClick: ({
        event,
      }: {
        event: CalendarEvent<{ eventModel: EventModel }>;
      }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="material-icons md-18">delete</i>',
      a11yLabel: 'Delete',
      onClick: ({
        event,
      }: {
        event: CalendarEvent<{ eventModel: EventModel }>;
      }): void => {
        // this.asyncEvents$ = this.asyncEvents$.map((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  // asyncEvents$: Observable<CalendarEvent<{ eventModel: EventModel }>[]>;
  eventsToDisplay: CalendarEvent[] = [];
  events: CalendarEvent[] = [];

  refresh: Subject<any> = new Subject();

  activeDayIsOpen: boolean = false;
  showMore: boolean = false;
  showMoreDate: Date;
  defaultProfileId: number;
  defaultCalendarId: number;

  constructor(
    private modal: NgbModal,
    private storeService: StoreService,
    private eventService: EventService,
    private dialog: MatDialog
  ) {
    this.storeService.calendarViewChange.subscribe((calendarView) => {
      this.viewDate = calendarView.viewDate;
      if (calendarView.showAgenda) {
        this.view = CalendarView.Month;
        this.showAgenda = true;
      } else {
        this.showAgenda = false;
        this.view = calendarView.view;
      }
    });
    this.storeService.createEventEmitter.subscribe((isClicked) => {
      if (isClicked) {
        this.addEvent();
      }
    });
    this.storeService.showEventDetailsEmitter.subscribe((event) => {
      if (event) {
        this.showEventDetails(event);
      }
    });
  }

  ngOnInit(): void {
    this.fetchAllEvents();
    this.defaultProfileId = this.storeService.loggedInUser?.defaultProfileId;
    this.defaultCalendarId = this.storeService.loggedInUser?.defaultCalendarId;
  }

  fetchAllEvents() {
    this.loading = true;
    this.eventService
      .getAllEvents(this.storeService.loggedInUser?.id)
      .subscribe(
        (response) => {
          this.loading = false;
          if (response) {
            this.events = [];
            response.forEach((eventModel) => {
              let temp = {
                title: eventModel.title,
                allDay: eventModel.allDayEvent,
                start: new Date(eventModel.startTime + ' UTC'),
                end: new Date(eventModel.endTime + ' UTC'),
                color: {
                  primary: eventModel.calendar.color,
                  secondary: eventModel.calendar.color,
                },
                actions: this.actions,
                resizable: {
                  beforeStart: true,
                  afterEnd: true,
                },
                draggable: true,
                meta: {
                  eventModel,
                },
              };
              temp['assigneeList'] = eventModel.assigneeList;
              this.events.push(temp);
            });
          }
          this.updateEventsToDisplay();
        },
        (error) => {
          this.loading = false;
          //TODO:Handle API error
        }
      );
  }

  // fetchAllEvents() {
  //   this.asyncEvents$ = this.eventService.getAllEvents('3').pipe(
  //     map((results) => {
  //       console.log(results);
  //       return results.map((eventModel: EventModel) => {
  //         return {
  //           title: eventModel.title,
  //           start: new Date(eventModel.startTime + ' UTC'),
  //           end: new Date(eventModel.endTime + ' UTC'),
  //           color: { primary: eventModel.color, secondary: eventModel.color },
  //           actions: this.actions,
  //           resizable: {
  //             beforeStart: true,
  //             afterEnd: true,
  //           },
  //           draggable: true,
  //           meta: {
  //             eventModel,
  //           },
  //         };
  //       });
  //     })
  //   );
  // }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        // this.activeDayIsOpen = true;
      }
      this.viewDate = date;
      this.storeService.calendarDayClicked.next(this.viewDate);
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    // let rescheduleEvent : any;
    // rescheduleEvent = event.meta.eventModel;
    // rescheduleEvent.startTime = newStart;
    // rescheduleEvent.endTime = newEnd;
    this.loading = true;
    if (event['displayed']) {
      event['displayed'] = false;
    }
    let eventModel: any = {};
    // check if an existing or external event
    if (event.meta?.eventModel) {
      eventModel = event.meta.eventModel;
      eventModel.endTime = newEnd ? newEnd : event.end;
    } else {
      eventModel = event;
      eventModel.endTime = event['dueDate'] ? event['dueDate'] : newStart;
      this.eventService.triggerEventDropped(event);
    }
    eventModel.startTime = newStart ? newStart : event.start;

    this.eventService.updateEvent(eventModel).subscribe(
      (response) => {
        if (response) {
          this.fetchAllEvents();
        }
      },
      (error) => {
        console.log('Something went wrong');
        // window.alert('#TODO: Something went wrong.');
        this.fetchAllEvents();
      }
    );
  }

  handleEvent(
    action: string,
    event: CalendarEvent<{ eventModel: EventModel }>
  ): void {
    this.modalData = { event, action };

    if (action === 'Edited' || action === 'Clicked') {
      let editEvent = new EventModel();
      editEvent = event.meta.eventModel;
      editEvent.startTime = event.start;
      editEvent.endTime = event.end;
      let dialogRef = this.dialog.open(CreateEventComponent, {
        data: editEvent,
        width: '600px',
        height: '80%',
      });

      dialogRef.afterClosed().subscribe((response) => {
        this.fetchAllEvents();
      });
    } else if (action === 'Deleted') {
      this.deleteEvent(event.meta.eventModel.eventId);
    }
  }

  addEvent(): void {
    let eventModel = new EventModel();
    // eventModel.color = { primary: '', secondary: '' };
    eventModel.userId = this.storeService.loggedInUser?.id;
    let dialogRef = this.dialog.open(CreateEventComponent, {
      data: eventModel,
      width: '600px',
      height: '80%',
    });

    dialogRef.afterClosed().subscribe((response) => {
      this.fetchAllEvents();
    });
  }

  deleteEvent(eventToDelete: number) {
    // this.asyncEvents$ = this.asyncEvents$.filter((event) => event !== eventToDelete);
    this.eventService.deleteEvent(eventToDelete).subscribe(
      () => {
        this.fetchAllEvents();
      },
      (error) => {
        console.log('Something went wrong');
        // window.alert('#TODO: Something went wrong.');
      }
    );
  }

  setView(view: any) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  updateRightPanelStatus(value) {
    this.showRightPanel = value;
  }

  receiveSelectedProfiles(data) {
    this.selectedProfiles = data;
    this.updateEventsToDisplay();
  }

  receiveSelectedCalendars(data) {
    this.selectedCalendars = data;
    this.updateEventsToDisplay();
  }

  updateEventsToDisplay() {
    function eventFilter(
      selectedCalendars,
      selectedProfiles,
      defaultProfileId
    ) {
      return function (event, index, array) {
        let flag = false;
        if (
          selectedCalendars.includes(event.meta.eventModel.calendar.calendarId)
        ) {
          if (
            selectedProfiles.includes(defaultProfileId) &&
            event.meta.eventModel.assigneeList.length == 0
          ) {
            flag = true;
          } else {
            event.meta.eventModel.assigneeList.forEach((element) => {
              if (selectedProfiles.includes(element.profileId)) {
                flag = true;
              }
            });
          }
        }
        return flag;
      };
    }
    this.eventsToDisplay = this.events.filter(
      eventFilter(
        this.selectedCalendars,
        this.selectedProfiles,
        this.defaultProfileId
      )
    );
  }
  checkLongEvent(event) {
    if (differenceInCalendarDays(event.end, event.start) > 0) {
      this.isLongEvent = true;
      return true;
    }
    this.isLongEvent = false;
    return false;
  }
  checkIfStartDateCell(day, event) {
    if (differenceInCalendarDays(day.date, event.start) == 0) {
      return true;
    } else {
      return false;
    }
  }
  showMoreEvents(day) {
    const pipe = new DatePipe('en-us');
    const target = new ElementRef(
      document.getElementById('cell_' + pipe.transform(day.date, 'shortDate'))
    );

    this.dialog.open(MoreEventsDialogComponent, {
      data: { events: day.events, refElement: target, date: day.date },
      panelClass: 'events-show-more-dialog-style',
    });
  }
  /**
   * Below method is used to display the long spanning events first
   */
  getSortedEvents(events: CalendarEvent[]) {
    events.sort((a, b) =>
      new Date(a.start).getTime() - new Date(a.end).getTime() >
      new Date(b.start).getTime() - new Date(b.end).getTime()
        ? 1
        : -1
    );

    return events;
  }
  showEventDetails(event) {
    const dialog = this.dialog.open(EventDetailsDialogComponent, {
      data: event,
      width: '500px',
      panelClass: [
        'animate__animated',
        'animate__fadeIn',
        'event-overview-dialog-style',
      ],
    });
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.handleEvent(data, event);
      }
    });
  }
}
