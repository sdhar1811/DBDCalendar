import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { StoreService } from 'src/app/services/store.service';
import { ProfileModel } from 'src/app/services/model/profile-model';

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

  @Output() updateFilterValues = new EventEmitter();

  profiles: ProfileModel[] = [];
  calendarList = [];
  calendarTitle: string;
  //calendarColor: string = '#EC407A';
  calendarColor: string;
  constructor(private profileService: ProfileService,
    private storeService: StoreService) {}

  fetchProfiles() {
    this.profileService.getAllProfile(this.storeService.loggedInUser?.id)
    .subscribe(
      (response) => {
        // this.loading = false;
        if (response) {
          console.log(response);
          this.profiles =response;
        }
      },
      (error) => {
        // this.loading = false;
        //TODO:Handle API error
      }
    );
    this.calendarList.push({ name: 'Work', color: '#00ACC1', value: '' });
    this.calendarList.push({ name: 'Personal', color: '#AB47BC', value: '' });
    this.calendarList.push({ name: 'School', color: '#455A64', value: '' });
    this.calendarList.push({ name: 'Medical', color: '#C0CA33', value: '' });
  }

  ngOnInit(): void {
    this.fetchProfiles();
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

  changeProfileFilter(){
    let selectedProfiles = [];
    console.log("Inside ");
    console.log(this.profiles);
    selectedProfiles = this.profiles.filter((profile) => profile.selected).map((profile) => profile.profileId);
    this.updateFilterValues.emit(selectedProfiles);
  }
}
