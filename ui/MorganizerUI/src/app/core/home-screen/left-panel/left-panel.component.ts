import { Component, OnInit } from '@angular/core';

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
  profiles = [];
  calendarList = [];
  calendarTitle: string;
  //calendarColor: string = '#EC407A';
  calendarColor: string;
  constructor() {
    this.fetchProfiles();
  }

  fetchProfiles() {
    this.profiles.push({ name: 'Sharad', color: '#42A5F5', value: '' });
    this.profiles.push({ name: 'Satyen', color: '#cddc39', value: '' });
    this.profiles.push({ name: 'Dhananjay', color: '#ff8a65', value: '' });
    this.profiles.push({ name: 'Asmi', color: '#26a69a', value: '' });
    this.profiles.push({ name: 'Khushboo', color: '#c2185b', value: '' });
    this.calendarList.push({ name: 'Work', color: '#00ACC1', value: '' });
    this.calendarList.push({ name: 'Personal', color: '#AB47BC', value: '' });
    this.calendarList.push({ name: 'School', color: '#455A64', value: '' });
    this.calendarList.push({ name: 'Medical', color: '#C0CA33', value: '' });
  }

  ngOnInit(): void {}

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
}
