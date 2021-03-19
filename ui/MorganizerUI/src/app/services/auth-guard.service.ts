import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private storeService: StoreService, public router: Router) {}
  canActivate() {
    if (
      sessionStorage.getItem('user') === undefined ||
      sessionStorage.getItem('user') === null
    ) {
      this.router.navigate(['login']);
      return false;
    } else {
      this.storeService.loggedInUserChange.next(
        JSON.parse(sessionStorage.getItem('user'))
      );
      return true;
    }
  }
}
