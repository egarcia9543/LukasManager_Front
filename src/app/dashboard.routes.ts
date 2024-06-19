import { Routes } from "@angular/router";
import { HomeComponent } from "./components/pages/home/home.component";
import { ReportsComponent } from "./components/pages/reports/reports.component";

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
];

export default routes;
