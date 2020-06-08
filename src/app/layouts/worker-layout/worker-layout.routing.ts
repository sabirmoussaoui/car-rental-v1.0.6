import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/worker/dashboard/dashboard.component';
import { CarsComponent } from 'src/app/worker/cars/cars.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { FourOhFourComponent } from 'src/app/worker/four-oh-four/four-oh-four.component';
import { NewCarComponent } from 'src/app/worker/cars/new-car/new-car.component';
import { WorkerProfileComponent } from 'src/app/worker/worker-profile/worker-profile.component';
import { MyRequestsComponent } from 'src/app/worker/my-requests/my-requests.component';
import { ClientsComponent } from 'src/app/worker/clients/clients.component';

export const WorkerLayoutRoutes: Routes = [
  {
    path: 'worker/dashboard',
    component: DashboardComponent,
  },
  {
    path: 'worker/profile',
    component: WorkerProfileComponent,
  },
  {
    path: 'worker/cars',
    component: CarsComponent,
  },
  {
    path: 'worker/new-car',
    component: NewCarComponent,
  },
  {
    path: 'worker/my-requests',
    component: MyRequestsComponent,
  },
  {
    path: 'worker/clients',
    component: ClientsComponent,
  },

  // { path: 'not-found', component: FourOhFourComponent },
  // { path: '**', redirectTo: 'not-found' },
];
