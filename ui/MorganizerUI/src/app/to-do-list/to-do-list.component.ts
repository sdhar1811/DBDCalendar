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
import { endOfToday, startOfDay, startOfToday } from 'date-fns';
import { TaskModel } from '../services/model/task-model';

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
  completedTaskList = [];
  todoLists = [];
  assigneeList = [];
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
      if (this.selectedTodoList.value && this.selectedTodoList.value.tasks) {
        const index = this.selectedTodoList.value.tasks.indexOf(event);
        this.removeTask(this.selectedTodoList.value.tasks[index]);
        this.selectedTodoList.value.tasks.splice(index, 1);
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
          this.completedTaskList = [];
          response.forEach((todoList) => {
            let taskList: TaskModel[] = [];

            if (todoList.tasks) {
              todoList.tasks.forEach((taskResponse) => {
                const task: TaskModel = new TaskModel();
                task.id = taskResponse.id;
                task.complete = taskResponse.complete;
                task.description = taskResponse.description;
                task.dueDate = taskResponse.dueDate;
                task.title = taskResponse.title;
                task.todoListId = taskResponse.todoListId;
                task.userId = this.storeService.loggedInUser.id;
                task.calendarId = taskResponse.calendarId;
                if (task.complete) {
                  this.completedTaskList.push(task);
                } else {
                  taskList.push(task);
                }
              });
            }
            this.todoLists.push({
              name: todoList.title,
              id: todoList.id,
              tasks: taskList,
            });
          });
          this.selectedTodoList.setValue(this.todoLists[0]);
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
    const task: TaskModel = new TaskModel();
    task.title = this.taskTitle;
    task.start = startOfToday();
    task.userId = this.storeService.loggedInUser?.id;
    task.todoListId = this.selectedTodoList.value.id;
    this.selectedTodoList.value.tasks.push(task);
    // this.tasks.push(
    //   // title: this.taskTitle,
    //   // description: null,
    //   // calendar: {},
    //   // color: undefined,
    //   // complete: false,
    //   // draggable: true,
    //   // start: new Date(),
    //   // dueDate: endOfToday(),
    //   // userId: this.storeService.loggedInUser?.id,
    //   // todoListId: this.selectedTodoList.value.id,
    //   task
    // );
    this.updateTask(task);
    this.taskTitle = '';
  }
  removeTask(task) {
    this.taskService.deleteTask(task.id).subscribe(
      () => {},
      (error) => {
        console.log(error);
      }
    );
  }
  editTask(index) {
    this.taskIndex = index;
    this.editMode = true;
  }
  sortTaskList() {
    this.selectedTodoList.value?.tasks?.sort((task1, task2) => {
      return task1.complete - task2.complete;
    });
    // this.tasks.sort((task1, task2) => {
    //   return task1.complete - task2.complete;
    // });
  }
  closeEditMode(event) {
    if (this.selectedTodoList.value.tasks[this.taskIndex]) {
      this.updateTask(this.selectedTodoList.value.tasks[this.taskIndex]);
    }
    this.editMode = false;
  }
  close() {
    //this.updateTasks();
    this.closeTaskPanel.emit(null);
  }
  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }
  todoListSelectionChanged(event) {
    this.sortTaskList();
  }
  updateTask(task) {
    //this.sortTaskList();
    this.taskService.addTasksInTodoList(task).subscribe(
      (response) => {
        task.id = response.id;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
