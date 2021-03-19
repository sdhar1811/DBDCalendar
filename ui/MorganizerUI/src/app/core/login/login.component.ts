import { Component, Injectable, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { flipAnimation, headShakeAnimation } from 'angular-animations';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [headShakeAnimation(), flipAnimation()],
})
export class LoginComponent implements OnInit {
  @Input() clickedSignUp: string;
  loginFailed = false;
  viewRendered = false;
  errorMessage: any;
  loginForm: FormGroup;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private storeService: StoreService
  ) {
    this.createForm();
  }
  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {}
  ngAfterContentInit() {
    this.viewRendered = true;
  }
  login() {
    this.loginFailed = false;
    this.loginService
      .validateCredentials(
        this.loginForm.get('username').value,
        this.loginForm.get('password').value
      )
      .subscribe(
        (response) => {
          sessionStorage.setItem('user', JSON.stringify(response));
          this.storeService.setProperty('loggedInUser', response);
          this.storeService.setLoggedInUserDetails(response);
          this.router.navigateByUrl('home');
        },
        (error) => {
          this.loginFailed = true;

          this.errorMessage = error.error;
        }
      );
  }

  goToRegister() {
    // this.clickedSignUp = 'true';
    this.router.navigateByUrl('register');
  }
  animDone(event) {
    this.loginFailed = false;
  }
}
