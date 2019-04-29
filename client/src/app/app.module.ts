import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ClassDetailComponent } from './class-detail/class-detail.component';
import { HistoryDetailComponent } from './history-detail/history-detail.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StudentAttendancePageComponent } from './student-attendance-page/student-attendance-page.component';
import { StudentHistoryPageComponent } from './student-history-page/student-history-page.component';
import { TeacherAttendancePageComponent } from './teacher-attendance-page/teacher-attendance-page.component';
import { ManageClassesPageComponent } from './manage-classes-page/manage-classes-page.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ClassDetailComponent,
    HistoryDetailComponent,
    HomePageComponent,
    StudentAttendancePageComponent,
    StudentHistoryPageComponent,
    TeacherAttendancePageComponent,
    ManageClassesPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
