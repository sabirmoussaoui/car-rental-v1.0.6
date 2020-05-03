import { Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/client/dashboard/dashboard.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

export const ClientLayoutRoutes: Routes = [
  {
    path: 'client/dashboard',
    component: DashboardComponent,
  },
];
