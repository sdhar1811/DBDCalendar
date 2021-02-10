import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './core/landing/landing.component';
import { LoginComponent } from './core/login/login.component';

const routes: Routes = [{ path: '', component: LandingComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
