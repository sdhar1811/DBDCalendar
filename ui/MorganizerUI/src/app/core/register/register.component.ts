import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterEvent, RouterModule } from '@angular/router';
import { isThursday } from 'date-fns';
import { RegisterService } from 'src/app/services/register.service';
import { UserModel } from '../model/user.model';
import { MatchPassword } from './password-validator';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  tabIndex = 0;

  userModel: UserModel = new UserModel();
  confirmPassword: string;
  birthdate: string;
  personalForm: FormGroup;
  accountForm: FormGroup;
  @Output() closeRegisterEvent = new EventEmitter();
  error = {};
  apiError = false;
  constructor(
    private registerService: RegisterService,
    public dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.createPersonalForm();
    this.createAccountForm();
  }
  createAccountForm() {
    this.accountForm = this.formBuilder.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.maxLength(255),
            Validators.minLength(3),
            Validators.email,
          ],
        ],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern('[0-9]{10}')],
        ],
        username: ['', [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}'
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: MatchPassword('password', 'confirmPassword'),
      }
    );
  }
  createPersonalForm() {
    this.personalForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      middleName: ['', [Validators.minLength(3), Validators.maxLength(100)]],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      gender: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
    });
  }
  registerUser() {
    Object.keys(this.personalForm.controls).forEach((key) => {
      this.userModel[key] = this.personalForm.get(key).value;
    });
    Object.keys(this.accountForm.controls).forEach((key) => {
      this.userModel[key] = this.accountForm.get(key).value;
    });

    this.userModel.birthdate = this.transformDateToSQL(
      this.userModel.birthdate
    );
    this.registerService.registerUser(this.userModel).subscribe(
      (response) => {
        this.openSuccessDialog();
      },
      (error) => {
        this.apiError = true;
        this.error['type'] = 'danger';
        this.error['message'] = error.message;
      }
    );
  }
  openSuccessDialog() {
    const dialogRef = this.dialog.open(RegisterDialogComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('login');
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
  incrementIndex() {
    this.tabIndex++;
  }

  decrementIndex() {
    this.tabIndex--;
  }
  tabSelectionChanged(event) {
    this.tabIndex = event;
  }
  backToLogin() {
    this.accountForm.markAsUntouched();
    this.personalForm.markAsUntouched();
    this.closeRegisterEvent.emit(null);
  }
  closeErrorAlert() {
    this.apiError = false;
    this.error = {};
  }
}
