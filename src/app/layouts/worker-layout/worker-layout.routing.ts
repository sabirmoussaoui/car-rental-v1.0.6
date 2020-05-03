import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/worker/dashboard/dashboard.component';
import { UserProfileComponent } from 'src/app/worker/user-profile/user-profile.component';
import { CarsComponent } from 'src/app/worker/cars/cars.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { FourOhFourComponent } from 'src/app/worker/four-oh-four/four-oh-four.component';
import { NewCarComponent } from 'src/app/worker/cars/new-car/new-car.component';

export const WorkerLayoutRoutes: Routes = [
  {
    path: 'worker/dashboard',
    component: DashboardComponent,
  },
  {
    path: 'worker/user-profile',
    component: UserProfileComponent,
  },
  {
    path: 'worker/cars',
    component: CarsComponent,
  },
  {
    path: 'worker/new-car',
    component: NewCarComponent,
  },
  // { path: 'not-found', component: FourOhFourComponent },
  // { path: '**', redirectTo: 'not-found' },
];
