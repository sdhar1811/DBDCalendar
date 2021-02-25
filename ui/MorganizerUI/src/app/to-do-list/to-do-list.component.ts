import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NewListDialogComponent } from './new-list-dialog/new-list-dialog.component';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit {
  selectedTodoList = new FormControl();
  selectedCalendar = new FormControl();
  assignee = new FormControl();
  editMode = false;

  todoLists = [
    { name: 'My List', id: 1 },
    { name: 'School List', id: 2 },
  ];
  calendarList = [
    { name: 'My Calendar', id: 1 },
    { name: 'Work Calendar', id: 2 },
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
      data: { name: this.name },
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
    this.tasks.push({ name: this.taskTitle, checked: false });
    this.sortTaskList();
    this.taskTitle = '';
  }
  removeTask(index) {
    this.tasks.splice(index, 1);
  }
  editTask(index) {
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
