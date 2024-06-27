import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ReportsComponent } from "./pages/reports/reports.component";
import { PaymentsComponent } from "./pages/payments/payments.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'reports',
    component: ReportsComponent
  },
  {
    path: 'payments',
    component: PaymentsComponent
  }
];

export default routes;
