import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { ClipboardModule } from 'ngx-clipboard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from 'src/app/worker/user-profile/user-profile.component';
import { DashboardComponent } from 'src/app/worker/dashboard/dashboard.component';
import { WorkerLayoutRoutes } from './worker-layout.routing';
import { MatDialogModule } from '@angular/material/dialog';
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
import { OpenCarImageDialogComponent } from 'src/app/worker/cars/open-car-image-dialog/open-car-image-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { CarPhotosDialogComponent } from 'src/app/worker/cars/car-photos-dialog/car-photos-dialog.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FourOhFourComponent } from 'src/app/worker/four-oh-four/four-oh-four.component';
import { CarDetailDialogComponent } from 'src/app/worker/cars/car-detail-dialog/car-detail-dialog.component';
import { NewCarComponent } from 'src/app/worker/cars/new-car/new-car.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    CarsComponent,
    CarUpdateDialogComponent,
    DropzoneDirective,
    UploadTaskComponent,
    OpenCarImageDialogComponent,
    CarPhotosDialogComponent,
    FourOhFourComponent,
    CarDetailDialogComponent,
    NewCarComponent,
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
    NgxSpinnerModule,
    MatSlideToggleModule,
  ],
  entryComponents: [
    OpenCarImageDialogComponent,
    CarUpdateDialogComponent,
    CarDetailDialogComponent,
  ],
  providers: [CityService, SectorService, AuthGuardService],
})
export class WorkerLayoutModule {}
