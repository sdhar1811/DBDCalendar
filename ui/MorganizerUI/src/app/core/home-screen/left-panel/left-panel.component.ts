import { Component, OnInit } from '@angular/core';

export interface MyCalendars{
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
    this.profiles.push({ name: 'Sharad', color: 'red', value: '' });
    this.profiles.push({ name: 'Satyen', color: 'yellow', value: '' });
    this.profiles.push({ name: 'Dhananjay', color: 'green', value: '' });
    this.profiles.push({ name: 'Asmi', color: 'black', value: '' });
    this.profiles.push({ name: 'Khushboo', color: 'purple', value: '' });
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
        color: this.calendarColor     ==     null     ?     '#EC407A'     :     this.calendarColor,
        value: '',
      },
    ];
    this.calendarTitle = '';
  }
}
