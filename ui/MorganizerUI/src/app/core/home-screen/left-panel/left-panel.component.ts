import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { StoreService } from 'src/app/services/store.service';
import { ProfileModel } from 'src/app/services/model/profile-model';
import { MyCalendarModel } from 'src/app/services/model/mycalendar-model';
import { MyCalendarService } from 'src/app/services/mycalendar.service';

export interface MyCalendars {
  name: string;
  color: string;
  value: string;
};

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
})
export class LeftPanelComponent implements OnInit {
  profiles: ProfileModel[] = [];
  mycalendars: MyCalendarModel[] = [];
  calendarList = [];
  calendarTitle: string;
  //calendarColor: string = '#EC407A';
  calendarColor: string;
  constructor(
    private profileService: ProfileService,
    private storeService: StoreService,
    private calendarService: MyCalendarService
  ) {}

  fetchProfiles() {
    this.profileService
      .getAllProfile(this.storeService.loggedInUser?.id)
      .subscribe(
        (response) => {
          // this.loading = false;
          if (response) {
            console.log(response);
            this.profiles = response;
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
            console.log(response);
            this.mycalendars = response;
          }
        },
        (error) => {
          // this.loading = false;
          //TODO:Handle API error
        }
      );
  }

  ngOnInit(): void {
    this.fetchProfiles();
    this.fetchCalendars();
  }

  addNewCalendar() {
    this.calendarList = [
      ...this.calendarList,
      {
        name: this.calendarTitle,
        color: this.calendarColor == null ? '#EC407A' : this.calendarColor,
        value: '',
      },
    ];
    this.calendarTitle = '';
  }

  deleteCalendar(calendarToDelete: number) {
    this.calendarService.deleteCalendarFromList(calendarToDelete).subscribe(
      () => {
        console.log('Calendar Deleted');
        this.fetchCalendars();
      },
      (error) => {
        console.log('Something went wrong');
        // window.alert('#TODO: Something went wrong.');
      }
    );

  }
}
