import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { ProfileModel } from './model/profile-model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  eventURL: string;  

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private http: HttpClient
  ) { 
    this.eventURL = appConfig.morganizerAPIEndpoint + appConfig.profile;
  }

  getAllProfile(userId: String) {
    return this.http.get<ProfileModel[]>(
      this.eventURL + this.appConfig.fetchAllProfiles(userId)
    );
  }
}
