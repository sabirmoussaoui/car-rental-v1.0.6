import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { ClipboardModule } from 'ngx-clipboard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { MapsComponent } from 'src/app/worker/maps/maps.component';
import { IconsComponent } from 'src/app/worker/icons/icons.component';
import { TablesComponent } from 'src/app/worker/tables/tables.component';
import { UserProfileComponent } from 'src/app/worker/user-profile/user-profile.component';
import { DashboardComponent } from 'src/app/worker/dashboard/dashboard.component';
import { WorkerLayoutRoutes } from './worker-layout.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { MapsDialogComponent } from 'src/app/dialogs/maps-dialog/maps-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';

// Fire Base
import { CityService } from 'src/app/services/city.service';
import { SectorService } from 'src/app/services/sector.service';
import { CarsComponent } from 'src/app/worker/cars/cars.component';
import { CarUpdateDialogComponent } from 'src/app/worker/cars/car-update-dialog/car-update-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DropzoneDirective } from 'src/app/worker/dropzone.directive';
import { UploadTaskComponent } from 'src/app/worker/cars/upload-task/upload-task.component';
import { AngularFireStorageModule } from '@angular/fire/storage/public_api';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore/public_api';
import { OpenCarImageDialogComponent } from 'src/app/worker/cars/open-car-image-dialog/open-car-image-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { CarPhotosDialogComponent } from 'src/app/worker/cars/car-photos-dialog/car-photos-dialog.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@NgModule({
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    CarsComponent,
    CarUpdateDialogComponent,
    DropzoneDirective,
    UploadTaskComponent,
    OpenCarImageDialogComponent,
    CarPhotosDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(WorkerLayoutRoutes),
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSelectModule,
    ClipboardModule,
    ReactiveFormsModule,
    NgbModule,
    MatRadioModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSliderModule,

    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireStorageModule,
    // AngularFireModule,
    // AngularFirestoreModule
  ],
  entryComponents: [OpenCarImageDialogComponent, CarUpdateDialogComponent],
  providers: [CityService, SectorService, AuthGuardService],
})
export class WorkerLayoutModule {}
