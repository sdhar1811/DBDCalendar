import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewListDialogComponent } from './new-list-dialog/new-list-dialog.component';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit {
  selectedTodoList = new FormControl();
  selectedCalendar = new FormControl();
  @ViewChild('createList', { static: false }) public createListRef: ElementRef;

  assignee = new FormControl();

  editMode = false;
  taskIndex = 0;

  todoLists = [
    { name: 'My List', id: 1 },
    { name: 'School List', id: 2 },
  ];
  assigneeList = [
    { name: 'Sharad', id: 1 },
    { name: 'Satyen', id: 2 },
    { name: 'Dhananjay', id: 3 },
  ];
  name: string;
  taskTitle: string;
  tasks = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.sortTaskList();
  }

  addNewList() {
    const dialogRef = this.dialog.open(NewListDialogComponent, {
      hasBackdrop: true,
      data: { name: this.name, positionRef: this.createListRef },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.name !== '') {
        this.todoLists.push({
          name: result.name,
          id: undefined,
        });
        this.selectedTodoList.setValue(
          this.todoLists[this.todoLists.length - 1]
        );
      }
    });
  }
  addNewTask() {
    this.tasks.push({
      title: this.taskTitle,
      description: null,
      calendar: [],
      duedate: '',
      checked: false,
    });
    this.sortTaskList();
    this.taskTitle = '';
  }
  removeTask(index) {
    this.tasks.splice(index, 1);
  }
  editTask(index) {
    this.taskIndex = index;

    this.editMode = true;
  }
  sortTaskList() {
    this.tasks.sort((task1, task2) => {
      return task1.checked - task2.checked;
    });
  }
  closeEditMode(event) {
    this.editMode = false;
  }
}
