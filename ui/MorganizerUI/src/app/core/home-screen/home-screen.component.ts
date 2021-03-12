import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { Observable, Subject } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateEventComponent } from 'src/app/create-event/create-event.component';
import { EventModel } from 'src/app/services/model/event-model';
import { map } from 'rxjs/operators';
import { CalendarOpenDayEventsComponent } from 'angular-calendar/modules/month/calendar-open-day-events.component';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss'],
})
export class HomeScreenComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  showRightPanel = false;
  calendarClass = 'col-md-9';
  rightPanelClass = 'col-md-1';
  view: CalendarView = CalendarView.Month;
  loading = true;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

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
  events: CalendarEvent[] = [];

  refresh: Subject<any> = new Subject();

  // events: CalendarEvent[] = [
  //   {
  //     start: addDays(startOfDay(new Date()), 48),
  //     end: addDays(new Date(), 50),
  //     title: 'Sprint-2',
  //     color: colors.red,
  //     actions: this.actions,
  //     allDay: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,

  //   },
  //   // {
  //   //   start: startOfDay(new Date()),
  //   //   title: 'An event with no end date',
  //   //   color: colors.yellow,
  //   //   actions: this.actions,
  //   // },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'A long event that spans 2 months',
  //     color: colors.blue,
  //     actions: this.actions,
  //     allDay: true,
  //   },
  //   {
  //     start: addHours(subDays(startOfDay(new Date()), -3), 1),
  //     end: addHours(subDays(startOfDay(new Date()), -3), 2),
  //     title: 'A draggable and resizable event',
  //     color: colors.yellow,
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //   },
  // ];

  activeDayIsOpen: boolean = false;

  constructor(
    private modal: NgbModal,
    private eventService: EventService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchAllEvents();
  }

  fetchAllEvents() {
    this.loading = true;
    this.eventService.getAllEvents('3').subscribe(
      (response) => {
        this.loading = false;
        if (response) {
          this.events = [];
          response.forEach((eventModel) => {
            this.events.push({
              title: eventModel.title,
              start: new Date(eventModel.startTime + ' UTC'),
              end: new Date(eventModel.endTime + ' UTC'),
              color: { primary: eventModel.color, secondary: eventModel.color },
              actions: this.actions,
              resizable: {
                beforeStart: true,
                afterEnd: true,
              },
              draggable: true,
              meta: {
                eventModel,
              },
            });
          });
        }
      },
      (error) => {
        this.loading = false;
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
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    let eventModel: any = {};
    console.log(event);
    if (event.meta?.eventModel) {
      eventModel = event.meta.eventModel;
    } else {
      this.eventService.triggerEventDropped(event);
    }

    eventModel.title = event.title;
    eventModel.color = event.color?.primary;
    eventModel['startTime'] = newStart ? newStart : event.start;
    eventModel['endTime'] = newEnd ? newEnd : event.end;

    eventModel['userId'] = 3;

    // if (this.events.indexOf(event) === -1) {
    //   event['color'] = event['calendar']?.color;
    //   event['actions'] = this.actions;
    //   this.eventService.triggerEventDropped(event);
    // } else {
    //   this.events = this.events.map((iEvent) => {
    //     if (iEvent === event) {
    //       return {
    //         ...event,
    //         start: newStart,
    //         end: newEnd,
    //       };
    //     }

    //     return iEvent;
    //   });
    //   event.start = newStart;
    //   event.end = newEnd;
    // }

    this.eventService.updateEvent(eventModel).subscribe(
      (response) => {
        if (response) {
          console.log('Event updated');
          this.fetchAllEvents();
        }
      },
      (error) => {
        // window.alert('#TODO: Something went wrong.');
      }
    );

    // this.handleEvent('Dropped or resized', event);
  }

  handleEvent(
    action: string,
    event: CalendarEvent<{ eventModel: EventModel }>
  ): void {
    this.modalData = { event, action };
    console.log(action);
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
        console.log(JSON.stringify(response));
        this.fetchAllEvents();
        // this.asyncEvents$ = this.asyncEvents$.map((iEvent) => {
        //   if (iEvent === event) {
        //     return {
        //       ...event,
        //       title: response.title,
        //       start: response.startTime,
        //       end: response.endTime,
        //       color: response.color,
        //       participents: [],
        //     };
        //   }

        //   return iEvent;
        // });
      });
    } else if (action === 'Deleted') {
      this.deleteEvent(event.meta.eventModel.eventId);
    }
  }

  addEvent(): void {
    let eventModel = new EventModel();
    // eventModel.color = { primary: '', secondary: '' };
    let dialogRef = this.dialog.open(CreateEventComponent, {
      data: eventModel,
      width: '600px',
      height: '80%',
    });

    dialogRef.afterClosed().subscribe((response) => {
      console.log(JSON.stringify(response));
      this.fetchAllEvents();
      // this.asyncEvents$ = [
      //   ...this.asyncEvents$,
      //   {
      //     title: response.title,
      //     start: response.startTime,
      //     end: response.endTime,
      //     color: response.color,
      //     actions: this.actions,
      //     draggable: true,
      //     resizable: {
      //       beforeStart: true,
      //       afterEnd: true,
      //     },
      //   },
      // ];
    });
  }

  deleteEvent(eventToDelete: number) {
    // this.asyncEvents$ = this.asyncEvents$.filter((event) => event !== eventToDelete);
    this.eventService.deleteEvent(eventToDelete).subscribe(
      () => {
        console.log('Event Deleted');
        this.fetchAllEvents();
      },
      (error) => {
        console.log('Something went wrong');
        // window.alert('#TODO: Something went wrong.');
      }
    );
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  updateRightPanelStatus(value) {
    this.showRightPanel = value;
  }
}
