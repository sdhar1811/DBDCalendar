import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedInUser: any;
  constructor(private storeService: StoreService, private router: Router) {}
  ngOnInit() {
    this.storeService.loggedInUserChange.subscribe((value) => {
      this.loggedInUser = value;
    });
  }
  logOut() {
    // this.storeService.loggedInUserChange.unsubscribe();
    this.loggedInUser = undefined;
    sessionStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  openProfile(){
  	let dialogRef = this.dialog.open(UserAccountComp, {
        width: '600px',
        height: '65%',
      });
  }
}
