import { Routes } from '@angular/router';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { HomeComponent } from 'src/app/home/home/home.component';
import { WorkersComponent } from 'src/app/home/workers/workers.component';
import { SingleWorkerComponent } from 'src/app/home/workers/single-worker/single-worker.component';
import { TopRatedCarsComponent } from 'src/app/home/top-rated-cars/top-rated-cars.component';
import { CarRequestComponent } from 'src/app/home/cars/car-request/car-request.component';

export const HomeLayoutRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home/car-requests/:id', component: CarRequestComponent },
  { path: 'home/workers', component: WorkersComponent },
  {
    path: 'home/workers/:id',
    component: SingleWorkerComponent,
  },
  { path: 'home/top-rated-car', component: TopRatedCarsComponent },
];
