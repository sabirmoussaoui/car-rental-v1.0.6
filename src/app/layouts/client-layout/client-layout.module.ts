import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClipboardModule } from 'ngx-clipboard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ClientLayoutRoutes } from './client-layout.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from 'src/app/client/dashboard/dashboard.component';
import { UserProfileComponent } from 'src/app/client/user-profile/user-profile.component';
import { IconsComponent } from 'src/app/client/icons/icons.component';
import { MapsComponent } from 'src/app/client/maps/maps.component';
import { TablesComponent } from 'src/app/client/tables/tables.component';



@NgModule({
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ClientLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,

  ]
})
export class ClientLayoutModule { }
