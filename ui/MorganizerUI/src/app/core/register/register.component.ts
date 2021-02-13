import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterEvent, RouterModule } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import { UserModel } from '../model/user.model';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userModel: UserModel = new UserModel();
  confirmPassword: string;
  birthdate: string;
  constructor(
    private registerService: RegisterService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {}

  registerUser() {
    if (
      this.confirmPassword !== undefined &&
      this.confirmPassword === this.userModel.password
    ) {
      console.log(this.userModel);
      this.userModel.birthdate = this.transformDateToSQL(this.birthdate);
      this.registerService
        .registerUser(this.userModel)
        .subscribe((response) => {
          this.openSuccessDialog();
        });
    } else {
      window.alert("Passwords doesn't match");
    }
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
}
