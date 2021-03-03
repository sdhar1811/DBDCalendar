import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss'],
})
export class RightPanelComponent implements OnInit {
  @Input() showTaskPanel;

  taskPanel: boolean = false;
  profilePanel: boolean = false;

  @Output() updateRightPanelStatus = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
  toggleTaskPanel() {
    this.updateRightPanelStatus.emit(this.showTaskPanel);
  }
  closeTaskPanel() {
    this.showTaskPanel = false;
    this.taskPanel = false;
    this.profilePanel = false;
    this.updateRightPanelStatus.emit(false);
  }
}
