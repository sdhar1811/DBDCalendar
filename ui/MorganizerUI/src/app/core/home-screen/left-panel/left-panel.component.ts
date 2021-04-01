import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { StoreService } from 'src/app/services/store.service';
import { ProfileModel } from 'src/app/services/model/profile-model';
import { MyCalendarModel } from 'src/app/services/model/mycalendar-model';
import { MyCalendarService } from 'src/app/services/mycalendar.service';
import { Subject } from 'rxjs';

export interface MyCalendars {
  name: string;
  color: string;
  value: string;
}

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
})
export class LeftPanelComponent implements OnInit {
  @Output() emitSelectedProfiles = new EventEmitter();
  @Output() emitSelectedCalendars = new EventEmitter();

  profiles: ProfileModel[] = [];
  mycalendars: MyCalendarModel[] = [];
  calendarTitle: string;

  constructor(
    private profileService: ProfileService,
    private storeService: StoreService,
    private calendarService: MyCalendarService
  ) {
    this.profileService.addProfileEvent.subscribe((profile) => {
      this.profiles.push(profile);
    });
  }

  fetchProfiles() {
    this.profileService
      .getAllProfile(this.storeService.loggedInUser?.id)
      .subscribe(
        (response) => {
          // this.loading = false;
          if (response) {
            this.profiles = response;
            this.profiles.sort((a, b) => (a.name > b.name ? 1 : -1));
          }
        },
        (error) => {
          // this.loading = false;
          //TODO:Handle API error
        }
      );
  }

  fetchCalendars() {
    this.calendarService
      .getAllCalendars(this.storeService.loggedInUser?.id)
      .subscribe(
        (response) => {
          if (response) {
            this.mycalendars = response;
            this.mycalendars.sort((a, b) => (a.name > b.name ? 1 : -1));
          }
        },
        (error) => {
          // this.loading = false;
          //TODO:Handle API error
        }
      );

      //TODO:find and store default calendar in store service
  }

  ngOnInit(): void {
    this.fetchProfiles();
    this.fetchCalendars();
    this.sendSelectedCalendars();
    this.sendSelectedProfiles();
  }

  addNewCalendar() {
    let letters = '0123456789ABCDEF';
    let randomcolor = '#';
    for (var i = 0; i < 6; i++) {
      randomcolor += letters[Math.floor(Math.random() * 16)];
    }
    let newcalendar = new MyCalendarModel();
    newcalendar.userId = this.storeService.loggedInUser?.id;
    newcalendar.color = randomcolor;
    newcalendar.name = this.calendarTitle;
    this.calendarService.addCalendar(newcalendar).subscribe(
      (response) => {
        if (response) {
          this.fetchCalendars();
        }
      },
      (error) => {
        console.log('Something went wrong');
        // window.alert('#TODO: Something went wrong.');
      }
    );
    this.calendarTitle = '';
  }

  deleteCalendar(calendarToDelete: number) {
    this.calendarService.deleteCalendarFromList(calendarToDelete).subscribe(
      () => {
        this.fetchCalendars();
      },
      (error) => {
        console.log('Something went wrong');
        // window.alert('#TODO: Something went wrong.');
      }
    );
  }

  updateProfile(profile) {
    this.profileService.addProfile(profile).subscribe(
      (response) => {},
      (error) => {
        //TODO:Handle API error
      }
    );
    this.sendSelectedProfiles();
  }

  sendSelectedProfiles() {
    let selectedProfiles = [];
    selectedProfiles = this.profiles
      .filter((profile) => profile.selected)
      .map((profile) => profile.profileId);
    this.emitSelectedProfiles.emit(selectedProfiles);
  }

  updateCalendar(calendar) {
    this.calendarService.addCalendar(calendar).subscribe(
      (response) => {},
      (error) => {
        //TODO:Handle API error
      }
    );
    this.sendSelectedCalendars();
  }

  sendSelectedCalendars() {
    let selectedCalendars = [];
    selectedCalendars = this.mycalendars
      .filter((calendar) => calendar.selected)
      .map((calendar) => calendar.calendarId);
    this.emitSelectedCalendars.emit(selectedCalendars);
  }
  addEvent() {
    this.storeService.createEventEmitter.next(true);
  }
}
