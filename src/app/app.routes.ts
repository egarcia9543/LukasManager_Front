import { Routes } from '@angular/router';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];
