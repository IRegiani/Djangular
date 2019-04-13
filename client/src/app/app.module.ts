import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StudentAttendancePageComponent } from './student-attendance-page/student-attendance-page.component';
import { TeacherAttendancePageComponent } from './teacher-attendance-page/teacher-attendance-page.component';
import { StudentHistoryComponent } from './student-history/student-history.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ManageClassesComponent } from './manage-classes/manage-classes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomePageComponent,
    StudentAttendancePageComponent,
    TeacherAttendancePageComponent,
    StudentHistoryComponent,
    CalendarComponent,
    ManageClassesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  // bootstrap: [LoginPageComponent]
  bootstrap: [AppComponent]
})
export class AppModule { }
