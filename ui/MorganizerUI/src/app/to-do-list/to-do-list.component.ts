import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TodoListService } from '../services/todo-list.service';
import { StoreService } from 'src/app/services/store.service';
import { NewListDialogComponent } from './new-list-dialog/new-list-dialog.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { EventService } from '../services/event.service';
import { endOfToday } from 'date-fns';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
  animations: [
    trigger('todoInOutAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(150%)' }),
        animate('0.5s'),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(200%)' }),
        animate('1s ease-in'),
      ]),
    ]),
  ],
})
export class ToDoListComponent implements OnInit {
  selectedTodoList = new FormControl();
  selectedCalendar = new FormControl();
  @ViewChild('createList', { static: false }) public createListRef: ElementRef;

  @Output() closeTaskPanel = new EventEmitter();
  assignee = new FormControl();

  editMode = false;
  taskIndex = 0;

  previousTaskList = [];
  todoLists = [{ name: 'My List', id: '1' }];
  assigneeList = [
    { name: 'Sharad', id: 1 },
    { name: 'Satyen', id: 2 },
    { name: 'Dhananjay', id: 3 },
  ];
  name: string;
  taskTitle: string;
  tasks = [];
  selectedIndex = 0;

  constructor(
    public dialog: MatDialog,
    private taskService: TodoListService,
    private eventService: EventService,
    private storeService: StoreService
  ) {
    this.eventService.eventDropped.subscribe((event) => {
      const index = this.tasks.indexOf(event);
      if (this.tasks && index !== -1) {
        this.tasks.splice(index, 1);
      }
    });
  }

  ngOnInit(): void {
    this.populateTaskLOV();
    this.sortTaskList();
  }

  populateTaskLOV() {
    this.taskService
      .getTask(this.storeService.loggedInUser?.id)
      .subscribe((response) => {
        if (response) {
          response.forEach((todoList) => {
            this.todoLists.push({ name: todoList.title, id: todoList.id });
            if (todoList.tasks) {
              todoList.tasks.forEach((task) => {
                this.previousTaskList.push(task);
              });
            }
            this.selectedTodoList.setValue(this.todoLists[0]);
          });
        }
      });
  }

  addNewList() {
    const dialogRef = this.dialog.open(NewListDialogComponent, {
      hasBackdrop: true,
      data: { name: this.name, positionRef: this.createListRef },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.name !== '') {
        this.taskService
          .createTask(result.name, this.storeService.loggedInUser.id)
          .subscribe(
            (response) => {
              this.todoLists.push({
                name: response['title'],
                id: response['id'],
              });
              this.selectedTodoList.setValue(
                this.todoLists[this.todoLists.length - 1]
              );
            },
            (error) => {
              window.alert(error.error.message);
            }
          );
      }
    });
  }
  addNewTask() {
    console.log(this.selectedTodoList.value);
    this.tasks.push({
      title: this.taskTitle,
      description: null,
      calendar: {},
      color: undefined,
      complete: false,
      draggable: true,
      start: new Date(),
      dueDate: endOfToday(),
      userId: this.storeService.loggedInUser?.id,
      todoListId: this.selectedTodoList.value.id,
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
      return task1.complete - task2.complete;
    });
  }
  closeEditMode(event) {
    this.editMode = false;
  }
  close() {
    this.updateTasks();
    this.closeTaskPanel.emit(null);
  }
  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }
  todoListSelectionChanged(event) {
    console.log(event);
  }
  updateTasks() {
    this.taskService.addTasksInTodoList(this.tasks).subscribe(
      (response) => {
        console.log('Tasks updated');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
