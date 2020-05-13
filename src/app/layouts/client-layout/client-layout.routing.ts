import { Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/client/dashboard/dashboard.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { MyRentalsComponent } from 'src/app/client/my-rentals/my-rentals.component';
import { HomeComponent } from 'src/app/home/home/home.component';
import { ClientProfileComponent } from 'src/app/client/client-profile/client-profile.component';

export const ClientLayoutRoutes: Routes = [
  {
    path: 'client/dashboard',
    component: DashboardComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'client/my-rentals',
    component: MyRentalsComponent,
  },
  {
    path: 'client/profile',
    component: ClientProfileComponent,
  },
];
