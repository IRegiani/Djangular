import { NgModule } from '@angular/core';
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
import { AttendanceListComponent } from './pages/attendance-list/attendance-list.component';
import route from './constants/routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/falso',
    pathMatch: 'full',
  },
  { path: route.LOGIN_PAGE, component: LoginPage },
  { path: `${route.ABSENCE_DETAIL}/:id`, component: HistoryDetailComponent },
  { path: route.HISTORY_PAGE, component: StudentHistoryComponent },
  { path: route.CALENDAR_PAGE, component: CalendarComponent },
  { path: `${route.HOME_PAGE}/:adm`, component: HomePageComponent },
  { path: route.PRESENCE_PAGE, component: StudentAttendancePageComponent },
  { path: route.TEACHER_PAGE, component: TeacherAttendancePageComponent },
  { path: route.CLASS_PAGE, component: ManageClassesComponent },
  { path: `${route.CLASS_DETAIL}/:id`, component: ClassDetailComponent },
  { path: route.REGISTER_PAGE, component: RegisterPageComponent },
  { path: route.ATTENDANCE_PAGE, component: AttendanceListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
