import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IssuesComponent } from './components/issues/issues.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth-guard/auth-guard.service';
import { PullRequestsComponent } from './components/pull-requests/pull-requests.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard'
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { animation: 'dashboard', title: 'Dashboard', icon: 'dashboard' }
  },
  {
    path: 'issues',
    pathMatch: 'full',
    component: IssuesComponent,
    canActivate: [AuthGuard],
    data: { animation: 'issues', title: 'Issues', icon: 'new_releases' }
  },
  {
    path: 'pullrequests',
    pathMatch: 'full',
    component: PullRequestsComponent,
    canActivate: [AuthGuard],
    data: { animation: 'pullrequests', title: 'Pull Requests', icon: 'merge_type' }
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
    data: { animation: 'login', title: 'login', icon: 'fingerprint' }
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
