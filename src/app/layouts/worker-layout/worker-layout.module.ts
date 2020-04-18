import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { ClipboardModule } from 'ngx-clipboard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { MapsComponent } from 'src/app/worker/maps/maps.component';
import { IconsComponent } from 'src/app/worker/icons/icons.component';
import { TablesComponent } from 'src/app/worker/tables/tables.component';
import { UserProfileComponent } from 'src/app/worker/user-profile/user-profile.component';
import { DashboardComponent } from 'src/app/worker/dashboard/dashboard.component';
import { WorkerLayoutRoutes } from './worker-layout.routing';
import {MatDialogModule} from '@angular/material/dialog'
import { MapsDialogComponent } from 'src/app/dialogs/maps-dialog/maps-dialog.component';

// Fire Base 
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CityService } from 'src/app/services/city.service';
import { SectorService } from 'src/app/services/sector.service';

@NgModule({
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(WorkerLayoutRoutes),
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSelectModule,
    ClipboardModule,
    NgbModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule,
  ]
 ,
 providers: [CityService,SectorService],
})
export class WorkerLayoutModule { }
