import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { LandingComponent } from './core/landing/landing.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_CONFIG, APPCONFIG } from './app.config';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RegisterDialogComponent } from './core/register/register-dialog/register-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { HomeScreenComponent } from './core/home-screen/home-screen.component';
import { ResetPasswordComponent } from './core/reset-password/reset-password.component';
import { ResetPasswordDialogComponent } from './core/reset-password/reset-password-dialog/reset-password-dialog.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { RightPanelComponent } from './core/home-screen/right-panel/right-panel.component';
import { LeftPanelComponent } from './core/home-screen/left-panel/left-panel.component';
import { NewListDialogComponent } from './to-do-list/new-list-dialog/new-list-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { AddProfileComponent } from './add-profile/add-profile.component';
import {
  MAT_COLOR_FORMATS,
  NgxMatColorPickerModule,
  NGX_MAT_COLOR_FORMATS,
} from '@angular-material-components/color-picker';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    LandingComponent,
    RegisterDialogComponent,
    HomeScreenComponent,
    ResetPasswordComponent,
    ResetPasswordDialogComponent,
    ToDoListComponent,
    RightPanelComponent,
    LeftPanelComponent,
    NewListDialogComponent,
    AddProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTabsModule,
    MatRadioModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    ReactiveFormsModule,
    NgxMatColorPickerModule,
  ],
  providers: [
    {
      provide: APP_CONFIG,
      useValue: APPCONFIG,
    },
    MatNativeDateModule,
    {
      provide: MAT_COLOR_FORMATS,
      useValue: NGX_MAT_COLOR_FORMATS,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
