import { Routes } from '@angular/router';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { CarsComponent } from 'src/app/home/cars/cars.component';
import { HomeComponent } from 'src/app/home/home/home.component';

export const HomeLayoutRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cars', component: CarsComponent },
];
