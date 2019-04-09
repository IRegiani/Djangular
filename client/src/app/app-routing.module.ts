import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'loginPage',
    pathMatch: 'full',
  },
  {
    path: 'loginPage',
    component: LoginPageComponent,
    }
//    */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
