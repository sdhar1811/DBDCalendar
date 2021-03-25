import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ProfileModel } from '../services/model/profile-model';
import { ProfileService } from '../services/profile.service';
import { LeftPanelComponent } from '../core/home-screen/left-panel/left-panel.component';
import { StoreService } from '../services/store.service';

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
  state = { hex: '#f44336' };
  color: any = '#673ab7';
  profileModel: ProfileModel;
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

  constructor(
    private profileService: ProfileService,
    private storeService: StoreService,
    ) 
  {
    this.profileModel = new ProfileModel();
    this.profileModel.color = this.color;

  }

  ngOnInit(): void {}

  changeComplete(event) {
    // this.state.hex = event.color.hex;
  }
  close() {
    this.closeTaskPanel.emit(null);
  }

  addProfile(){
    this.profileModel.userId = this.storeService.loggedInUser?.id;
    this.profileService.addProfile(this.profileModel).subscribe((response:ProfileModel)=>{
      //set all fields of profileModel to '' or undefined or null
      this.profileService.addProfileEvent.next(response);
      this.profileModel.name = undefined;
      this.profileModel.birthDate = undefined;
      this.profileModel.color = this.color;
      this.profileModel.email = undefined;
      this.profileModel.gender = undefined;
      this.profileModel.userId = undefined;
      this.profileModel.profileId = undefined;
      this.profileModel.selected = undefined;
      this.profileModel.phoneNumber = undefined;
    })
  }
}
