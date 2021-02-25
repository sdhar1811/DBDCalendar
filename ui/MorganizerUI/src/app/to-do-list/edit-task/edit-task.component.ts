import {
  Component,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  selectedCalendar = new FormControl();
  @Input() data;
  @Output() closeEmitter = new EventEmitter();
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(private _ngZone: NgZone) {}

  ngOnInit(): void {}
  closeEditMode() {
    console.log('sdasdsa');
    this.closeEmitter.emit('asjdkasd');
  }
  removeTask() {
    this.data.tasks.splice(this.data.index, 1);
  }

  // triggerResize() {
  //   this._ngZone.onStable
  //     .pipe(take(1))
  //     .subscribe(() => this.autosize.resizeToFitContent(true));
  // }
}
