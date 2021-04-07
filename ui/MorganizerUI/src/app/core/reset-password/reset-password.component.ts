import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterEvent, RouterModule } from '@angular/router';
import { ResetPasswordModel } from '../model/resetPass.model';
import { ResetPasswordDialogComponent } from './reset-password-dialog/reset-password-dialog.component';
import { ResetpasswordService } from 'src/app/services/resetpassword.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordModel: ResetPasswordModel = new ResetPasswordModel();
  confirmPassword: string;
  userName: string;
  displayScreen: number;
  userAnswer: string;
  newPassword: string;
  ques: any[] = [
    { name: 'What was your childhood nickname?' },
    { name: 'What is the name of your favorite childhood friend?' },
    { name: 'What street did you live on in third grade?' },
    { name: 'In what city or town was your first job?' },
    { name: 'In what city does your nearest sibling live?' },
    { name: 'What was the last name of your third grade teacher?' },
    { name: "What is your oldest sibling's middle name?" },
  ];
  resetForm: FormGroup;
  constructor(
    private resetPassService: ResetpasswordService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.displayScreen = 1;
  }
  resetPassword()    {
    this.resetPassService
      .validateUserName(this.userName)
              .subscribe((response) => {
                if(response) {
                  this.resetPasswordModel.username = response.username;
                  this.resetPasswordModel.questiontext = response.questiontext;
                  this.resetPasswordModel.answer = response.answer;
                  console.log(this.resetPasswordModel);
                  this.displayScreen = 2;
                }

              },
      (error) => {
        console.log('Something went wrong');
        // window.alert('#TODO: Something went wrong.');
      });
  }

  resetPassword2(){
    if((this.userAnswer).toLowerCase()===(this.resetPasswordModel.answer).toLowerCase()){
      this.displayScreen = 3;
    }
  }

  resetPassword3(){
    this.displayScreen = 4;
  }

  // resetPassword() {
  //   if (
  //     this.confirmPassword !== undefined &&
  //     this.confirmPassword === this.resetPasswordModel.oldpassword
  //   ) {
  //     this.resetPassService
  //       .validateCredAndResetPassword(this.resetPasswordModel)
  //       .subscribe((response) => {
  //         this.openSuccessDialog();
  //       });
  //   } else {
  //     window.alert("Passwords doesn't match");
  //   }
  // }

  openSuccessDialog() {
    const dialogRef = this.dialog.open(ResetPasswordDialogComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('login');
    });
  }
}
