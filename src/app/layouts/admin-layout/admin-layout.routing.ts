import { Routes } from '@angular/router';

import { DashboardComponent } from '../../admin/dashboard/dashboard.component';
import { SettingsComponent } from 'src/app/admin/settings/settings.component';
import { CityComponent } from 'src/app/admin/settings/city/city.component';
import { SectorComponent } from 'src/app/admin/settings/sector/sector.component';
import { ColorComponent } from 'src/app/admin/settings/color/color.component';
import { CarBrandComponent } from 'src/app/admin/settings/car-brand/car-brand.component';
import { CarModelComponent } from 'src/app/admin/settings/car-model/car-model.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { CarsComponent } from 'src/app/admin/cars/cars.component';
import { WorkersComponent } from 'src/app/admin/workers/workers.component';

export const AdminLayoutRoutes: Routes = [
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
  },
  {
    path: 'admin/settings',
    component: SettingsComponent,
  },
  {
    path: 'admin/cars',
    component: CarsComponent,
  },
  {
    path: 'admin/workers',
    component: WorkersComponent,
  },
  {
    path: 'admin/settings/cities',
    component: CityComponent,
  },
  {
    path: 'admin/settings/sectors',
    component: SectorComponent,
  },
  {
    path: 'admin/settings/colors',
    component: ColorComponent,
  },
  {
    path: 'admin/settings/car-brands',
    component: CarBrandComponent,
  },
  {
    path: 'admin/settings/car-models',
    component: CarModelComponent,
  },
];
