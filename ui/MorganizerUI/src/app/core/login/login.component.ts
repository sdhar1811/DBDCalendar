import { Component, Injectable, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Input() clickedSignUp: string;

  username: string;
  password: string;
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}
  login() {
    this.loginService
      .validateCredentials(this.username, this.password)
      .subscribe(
        (response) => {
          console.log('sdasd');
          this.router.navigateByUrl('home');
        },
        (error) => {
          window.alert('login Failed');
        }
      );
  }

  goToRegister() {
    // this.clickedSignUp = 'true';
    this.router.navigateByUrl('register');
  }
}
