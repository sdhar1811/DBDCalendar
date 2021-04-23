import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { differenceInCalendarDays } from 'date-fns';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent implements OnInit {
  @Input() events;
  constructor() {}

  ngOnInit(): void {
    this.events.sort((a, b) => {
      return differenceInCalendarDays(a.start, b.start);
    });
  }
}
