import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserModel } from '../core/model/user.model';
import { MatchPassword } from '../core/register/password-validator';
import { RegisterService } from '../services/register.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export class UserAccountComponent implements OnInit {
  tabIndex = 0;

  userModel: UserModel = new UserModel();
  confirmPassword: string;
  birthdate: string;
  personalForm: FormGroup;
  accountForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private storeService: StoreService,
    private dialogRef: MatDialogRef<UserAccountComponent>
  ) {}

  ngOnInit(): void {
    this.userModel = this.storeService.loggedInUser;
    this.createForm();
  }
  createForm() {
    this.createPersonalForm();
  }
  createPersonalForm() {
    this.personalForm = this.formBuilder.group({
      firstName: [
        this.userModel.firstName,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      middleName: [
        this.userModel.middleName,
        [Validators.minLength(3), Validators.maxLength(100)],
      ],
      lastName: [
        this.userModel.lastName,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      gender: [this.userModel.gender, [Validators.required]],
      birthdate: [this.userModel.birthdate, [Validators.required]],
      email: [
        this.userModel.email,
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.minLength(3),
          Validators.email,
        ],
      ],
      phoneNumber: [
        this.userModel.phoneNumber,
        [Validators.required, Validators.pattern('[0-9]{10}')],
      ],
      username: [this.userModel.userName, [Validators.required]],
    });
    this.personalForm.get('email').disable();
    this.personalForm.get('username').disable();
  }
  updateDetails() {
    Object.keys(this.personalForm.controls).forEach((key) => {
      this.userModel[key] = this.personalForm.get(key).value;
    });

    this.userModel.birthdate = this.transformDateToSQL(
      this.userModel.birthdate
    );
    this.registerService.registerUser(this.userModel).subscribe((response) => {
      // this.openSuccessDialog();
    });
  }
  transformDateToSQL(paramDate: any): string {
    if (paramDate === undefined || paramDate === null) {
      return paramDate;
    }
    let tempDate = paramDate.toLocaleDateString('en-GB');
    tempDate = tempDate.split('/');
    return tempDate[2] + '-' + tempDate[1] + '-' + tempDate[0];
  }

  close() {
    this.dialogRef.close();
  }
}
