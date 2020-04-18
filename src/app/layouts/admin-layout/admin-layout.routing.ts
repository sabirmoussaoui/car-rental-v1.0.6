import { Routes } from '@angular/router';

import { DashboardComponent } from '../../admin/dashboard/dashboard.component';
import { IconsComponent } from '../../admin/icons/icons.component';
import { MapsComponent } from '../../admin/maps/maps.component';
import { UserProfileComponent } from '../../admin/user-profile/user-profile.component';
import { TablesComponent } from '../../admin/tables/tables.component';
import { SettingsComponent } from 'src/app/admin/settings/settings.component';
import { CityComponent } from 'src/app/admin/settings/city/city.component';
import { SectorComponent } from 'src/app/admin/settings/sector/sector.component';
import { ColorComponent } from 'src/app/admin/settings/color/color.component';
import { CarBrandComponent } from 'src/app/admin/settings/car-brand/car-brand.component';
import { CarModelComponent } from 'src/app/admin/settings/car-model/car-model.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'admin/dashboard',      component: DashboardComponent },
    { path: 'admin/user-profile',   component: UserProfileComponent },
    { path: 'admin/tables',         component: TablesComponent },
    { path: 'admin/icons',          component: IconsComponent },
    { path: 'admin/maps',           component: MapsComponent },
    
    
    { path: 'admin/settings',                 component: SettingsComponent },
    { path: 'admin/settings/cities',          component: CityComponent },
    { path: 'admin/settings/sectors',         component: SectorComponent },
    { path: 'admin/settings/colors',          component: ColorComponent },
    { path: 'admin/settings/car-brands',      component: CarBrandComponent },
    { path: 'admin/settings/car-models',      component: CarModelComponent },



];
