import { Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/client/dashboard/dashboard.component';
import { UserProfileComponent } from 'src/app/client/user-profile/user-profile.component';
import { TablesComponent } from 'src/app/client/tables/tables.component';
import { IconsComponent } from 'src/app/client/icons/icons.component';
import { MapsComponent } from 'src/app/client/maps/maps.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

export const ClientLayoutRoutes: Routes = [
  {
    path: 'client/dashboard',
    component: DashboardComponent,
  },
  {
    path: 'client/user-profile',
    component: UserProfileComponent,
  },
  {
    path: 'client/tables',
    component: TablesComponent,
  },
  {
    path: 'client/icons',
    component: IconsComponent,
  },
  {
    path: 'client/maps',
    component: MapsComponent,
  },
];
