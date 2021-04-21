import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { ResetPasswordModel } from '../core/model/resetPass.model';
import { UserModel } from '../core/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class ResetpasswordService {

  appConfig: any;
  resetURL: string;
  checkuserURL: string;
  constructor(
    @Inject(APP_CONFIG) appConfig: IAppConfig,
    private http: HttpClient
  ) {
    this.appConfig = appConfig;
    this.resetURL = appConfig.morganizerAPIEndpoint + appConfig.resetpassword;
    this.checkuserURL = appConfig.morganizerAPIEndpoint + appConfig.checkuser;
  }

  resetUserPassword(resetPasswordModel: ResetPasswordModel) {
    return this.http.post(this.resetURL, resetPasswordModel);
  }

  confirmUserDetails(username: string) {
    let userModel = new UserModel();
    userModel.username = username;

    return this.http.post(this.checkuserURL, userModel);
  }
}
