import { Component, Injectable, OnInit, Input, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { flipAnimation, headShakeAnimation } from 'angular-animations';
import { StoreService } from 'src/app/services/store.service';
import {
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';

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

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  images = [
    '../../../assets/images/b4.png',
    '../../../assets/images/b5.png',
    '../../../assets/images/b6.png',
  ];
  error: any = {};
  showSignUp = false;
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;
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
  ngOnInit(): void {
    sessionStorage.removeItem('user');
    this.storeService.setProperty('loggedInUser', undefined);
    this.storeService.loggedInUserChange.next(null);
  }
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
          this.error['type'] = 'danger';
          this.error['message'] = error.error.message;
          this.loginFailed = true;
          this.errorMessage = error.error;
        }
      );
  }

  goToRegister() {
    // this.clickedSignUp = 'true';
    // this.router.navigateByUrl('register');
    this.loginForm.markAsUntouched();
    this.showSignUp = true;
  }
  animDone(event) {
    this.loginFailed = false;
  }
  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }
  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }
  close() {
    this.loginFailed = false;
    this.error = {};
  }
  closeRegister() {
    this.showSignUp = false;
  }
}
