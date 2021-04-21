import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterEvent, RouterModule } from '@angular/router';
import { ResetPasswordModel } from '../model/resetPass.model';
import { ResetPasswordDialogComponent } from './reset-password-dialog/reset-password-dialog.component';
import { ResetpasswordService } from 'src/app/services/resetpassword.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatchPassword } from '../register/password-validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordModel: ResetPasswordModel = new ResetPasswordModel();
  confirmPassword: string;
  resetForm: FormGroup;
  @Output() closeRegisterEvent = new EventEmitter();
  error = {};
  apiError = false;
  showScreen: number = 1;
  resetRelatedUserInfo: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    private resetPassService: ResetpasswordService
  ) {
    this.createForm();
  }

  question: any;
  ngOnInit(): void {
  }



  createForm() {
    this.createResetForm_Screen1();
  }


  createResetForm_Screen1() {
    this.resetForm = this.formBuilder.group(
      {

        username: ['', [Validators.required]],
      }
    );
  }

    createResetForm_Screen2() {
      this.resetForm = this.formBuilder.group(
        {

          answer: ['', [Validators.required]],
        }
      );
    }

    createResetForm_Screen3() {
      this.resetForm = this.formBuilder.group(
        {

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

   confirmUsername() {
    Object.keys(this.resetForm.controls).forEach((key) => {
      this.resetPasswordModel[key] = this.resetForm.get(key).value;
    });


    this.resetPassService.confirmUserDetails(this.resetPasswordModel.username).subscribe(
      (response:any) => {
        if (response == null){
          this.apiError = true;
          this.error['type'] = 'danger';
          this.error['message'] = "Username not found.";
        }else{
          this.resetRelatedUserInfo = response;
          this.question = response.question;
          this.showScreen = 2;
          this.createResetForm_Screen2();
        }

      },
      (error) => {
        this.apiError = true;
        this.error['type'] = 'danger';
        this.error['message'] = error.message;
      }
    );
  }


  confirmSecurityAnswer() {
    Object.keys(this.resetForm.controls).forEach((key) => {
      this.resetPasswordModel[key] = this.resetForm.get(key).value;
    });


    let userAnswer = this.resetPasswordModel.answer;
    userAnswer = userAnswer.toLowerCase().trim();

    let actualAnswer = this.resetRelatedUserInfo.answer;
    actualAnswer = actualAnswer.toLowerCase().trim();

    if (userAnswer==actualAnswer){
      this.showScreen = 3;
      this.createResetForm_Screen3();
    }else{
      this.apiError = true;
      this.error['type'] = 'danger';
      this.error['message'] = "Your answer does not match.";
    }
  }



  closeErrorAlert() {
    this.apiError = false;
    this.error = {};
  }


  resetPassword() {
    Object.keys(this.resetForm.controls).forEach((key) => {
      this.resetPasswordModel[key] = this.resetForm.get(key).value;
    });
    //this.resetPasswordModel.email = this.resetRelatedUserInfo.email;
    this.resetPassService
        .resetUserPassword(this.resetPasswordModel)
        .subscribe((response) => {
          this.openSuccessDialog();
        },
    (error) => {
      this.apiError = true;
      this.error['type'] = 'danger';
      this.error['message'] = "Problem with password reset..Please try again!";
    }
      );
    }

    openSuccessDialog() {
    const dialogRef = this.dialog.open(ResetPasswordDialogComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('login');
    });
  }
}
