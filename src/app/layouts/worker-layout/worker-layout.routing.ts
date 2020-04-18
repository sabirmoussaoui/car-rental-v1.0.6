import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/worker/dashboard/dashboard.component';
import { UserProfileComponent } from 'src/app/worker/user-profile/user-profile.component';
import { TablesComponent } from 'src/app/worker/tables/tables.component';
import { IconsComponent } from 'src/app/worker/icons/icons.component';
import { MapsComponent } from 'src/app/worker/maps/maps.component';


export const WorkerLayoutRoutes: Routes = [
  { path: 'worker/dashboard',      component: DashboardComponent },
  { path: 'worker/user-profile',   component: UserProfileComponent },
  { path: 'worker/tables',         component: TablesComponent },
  { path: 'worker/icons',          component: IconsComponent },
  { path: 'worker/maps',           component: MapsComponent }
];

