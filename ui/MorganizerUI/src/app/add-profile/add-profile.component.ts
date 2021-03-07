import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss'],
  animations: [
    trigger('addprofileInOutAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(150%)' }),
        animate('0.5s'),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(200%)' }),
        animate('1s ease-in'),
      ]),
    ]),
  ]
})
export class AddProfileComponent implements OnInit {
  state = { hex: '#f44336' };
  color: any = '#673ab7';
  colorPalette: Array<string> = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#795548',
    '#607d8b',
  ];
  @Output() closeTaskPanel = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  changeComplete(event) {
    // this.state.hex = event.color.hex;
  }
  close() {
    this.closeTaskPanel.emit(null);
  }
}
