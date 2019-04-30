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

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/falso',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginPage },
  { path: 'detailFalta/:id', component: HistoryDetailComponent },
  { path: 'history', component: StudentHistoryComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'home/:adm', component: HomePageComponent },
  { path: 'chamada', component: StudentAttendancePageComponent },
  { path: 'teacher', component: TeacherAttendancePageComponent },
  { path: 'turma', component: ManageClassesComponent },
  { path: 'detailClasse/:id', component: ClassDetailComponent },
  { path: 'register', component: RegisterPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
