import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { UsersComponent } from './features/users/users.component';
import { authGuard } from './core/services/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'users', component: UsersComponent }
    ]
  }
];
