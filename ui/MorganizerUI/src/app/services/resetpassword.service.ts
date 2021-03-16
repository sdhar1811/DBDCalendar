import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { ResetPasswordModel } from '../core/model/resetPass.model';

@Injectable({
  providedIn: 'root',
})
export class ResetpasswordService {
  resetURL: string;
  constructor(
    @Inject(APP_CONFIG) appConfig: IAppConfig,
    private http: HttpClient
  ) {
    this.resetURL = appConfig.morganizerAPIEndpoint + appConfig.resetpassword;
  }

  validateCredAndResetPassword(resetPasswordModel: ResetPasswordModel) {
    return this.http.post(this.resetURL, resetPasswordModel);
  }
}
