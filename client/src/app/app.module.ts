import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page.component';
import { HistoryDetailComponent } from './components/history-detail/history-detail.component';
import { StudentHistoryComponent } from './pages/student-history-page/student-history-page.component';
import { CalendarComponent } from './pages/calendar-page/calendar-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { StudentAttendancePageComponent } from './pages/student-attendance-page/student-attendance-page.component';
import { TeacherAttendancePageComponent } from './pages/teacher-attendance-page/teacher-attendance-page.component';
import { ManageClassesComponent } from './pages/manage-classes-page/manage-classes-page.component';
import { ClassDetailComponent } from './components/class-detail/class-detail.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ExpandableListModule } from 'angular2-expandable-list';
import { AttendanceListComponent } from './pages/attendance-list/attendance-list.component';
import { NgQRCodeReaderModule } from 'ng2-qrcode-reader';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    LoginPage,
    RegisterPageComponent,
    ClassDetailComponent,
    HistoryDetailComponent,
    HomePageComponent,
    StudentAttendancePageComponent,
    StudentHistoryComponent,
    TeacherAttendancePageComponent,
    ManageClassesComponent,
    AttendanceListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ExpandableListModule,
    NgQRCodeReaderModule,
    ZXingScannerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
