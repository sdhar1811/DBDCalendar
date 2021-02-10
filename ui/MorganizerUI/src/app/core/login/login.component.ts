import { Component, Injectable, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}
  login() {
    this.loginService
      .validateCredentials(this.username, this.password)
      .subscribe(
        (response) => {
          if (response) {
            window.alert('login Successful');
          }
        },
        (error) => {
          window.alert('login Failed');
        }
      );
  }
}
