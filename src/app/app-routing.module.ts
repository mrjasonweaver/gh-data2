import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IssuesComponent } from './components/issues/issues.component';


const routes: Routes = [
  // routes
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard'
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent,
    // canActivate: [AuthGuard],
    data: { animation: 'dashboard', title: 'Dashboard', icon: 'dashboard' }
  },
  {
    path: 'issues',
    pathMatch: 'full',
    component: IssuesComponent,
    // canActivate: [AuthGuard],
    data: { animation: 'issues', title: 'Issues', icon: 'insert_chart' }
  },
  // {
  //   path: 'users',
  //   pathMatch: 'full',
  //   component: UsersComponent,
  //   canActivate: [AuthGuard],
  //   data: { animation: 'users', title: 'Users', icon: 'account_circle' }
  // },
  // {
  //   path: 'login',
  //   pathMatch: 'full',
  //   component: LoginComponent,
  //   data: { animation: 'login', title: 'login', icon: 'fingerprint' }
  // }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
