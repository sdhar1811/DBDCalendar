import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginURL: string;
  constructor(
    @Inject(APP_CONFIG) appConfig: IAppConfig,
    private http: HttpClient
  ) {
    this.loginURL = appConfig.morganizerAPIEndpoint + appConfig.login;
  }

  validateCredentials(username: string, password: string) {
    let params = {
      username: username,
      password: password,
    };
    return this.http.post(this.loginURL, params);
  }
}
