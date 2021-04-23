import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ProfileModel } from '../services/model/profile-model';
import { ProfileService } from '../services/profile.service';
import { LeftPanelComponent } from '../core/home-screen/left-panel/left-panel.component';
import { StoreService } from '../services/store.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  ],
})
export class AddProfileComponent implements OnInit {
  editFlag: boolean = false;
  color: any = '#673ab7';
  colorPalette: Array<string> = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    //     '#03a9f4',
    //     '#00bcd4',
    '#009688',
    '#4caf50',
    //     '#8bc34a',
    //     '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#795548',
    '#607d8b',
  ];

  constructor(
    private dialogRef: MatDialogRef<AddProfileComponent>,
    private profileService: ProfileService,
    private storeService: StoreService,
    @Inject(MAT_DIALOG_DATA) public profileModel
  ) {}

  ngOnInit(): void {
    this.editFlag = this.profileModel.name == undefined ? false : true;

    let letters = '0123456789ABCDEF';
    let randomcolor = '#';
    for (var i = 0; i < 6; i++) {
      randomcolor += letters[Math.floor(Math.random() * 16)];
    }
    if (!this.editFlag) {
      this.profileModel.color = randomcolor;
    }
  }
  close() {
    this.dialogRef.close();
  }

  addProfile() {
    this.profileModel.userId = this.storeService.loggedInUser?.id;
    this.profileService
      .addProfile(this.profileModel)
      .subscribe((response: ProfileModel) => {
        //set all fields of profileModel to '' or undefined or null
        this.profileService.addProfileEvent.next(response);
        this.close();
      });
  }
}
