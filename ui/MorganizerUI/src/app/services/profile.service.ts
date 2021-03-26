import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { ProfileModel } from './model/profile-model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profileURL: string;  
  addProfileEvent: Subject<any> = new Subject();

  constructor(
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private http: HttpClient
  ) { 
    this.profileURL = appConfig.morganizerAPIEndpoint + appConfig.profile;
  }

  getAllProfile(userId: String) {
    return this.http.get<ProfileModel[]>(
      this.profileURL + this.appConfig.fetchAllProfiles(userId)
    );
  }

  addProfile(profile: ProfileModel){
    return this.http.post(this.profileURL + this.appConfig.addProfile, profile);
  }
}
