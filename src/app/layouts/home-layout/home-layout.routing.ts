import { Routes } from '@angular/router';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { HomeComponent } from 'src/app/home/home/home.component';
import { CarRequestComponent } from 'src/app/home/home/cars/car-request/car-request.component';

export const HomeLayoutRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home/car-requests/:id', component: CarRequestComponent },
];
