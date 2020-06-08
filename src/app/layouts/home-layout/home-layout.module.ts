import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { WorkerService } from 'src/app/services/worker.service';
import { AuthLayoutRoutes } from '../auth-layout/auth-layout.routing';
import { HomeLayoutRoutes } from './home-layout.routing';
import { HomeComponent } from 'src/app/home/home/home.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { BrowserModule } from '@angular/platform-browser';
import { ReviewService } from 'src/app/services/review.service';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { CarRequestService } from 'src/app/services/car-requests.service';
import { MatTabsModule } from '@angular/material/tabs';
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WorkersComponent } from 'src/app/home/workers/workers.component';
import { SingleWorkerComponent } from 'src/app/home/workers/single-worker/single-worker.component';
import { MatRippleModule } from '@angular/material/core';
import { TopRatedCarsComponent } from 'src/app/home/top-rated-cars/top-rated-cars.component';
import { CarRequestComponent } from 'src/app/home/cars/car-request/car-request.component';
import { CarsComponent } from 'src/app/home/cars/cars.component';
import { CarDetailDialogComponent } from 'src/app/home/cars/car-detail-dialog/car-detail-dialog.component';
import { AuthClientDialogComponent } from 'src/app/home/cars/car-request/auth-client-dialog/auth-client-dialog.component';
import { ReviewsComponent } from 'src/app/home/cars/car-detail-dialog/reviews/reviews.component';
import { MapsComponent } from 'src/app/maps/maps.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomeLayoutRoutes),
    FormsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    NgxSpinnerModule,
    NgbModule,
    NgxPaginationModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatTabsModule,
    MatCardModule,
    MatSnackBarModule,
    MatRippleModule,
  ],
  declarations: [
    CarRequestComponent,
    HomeComponent,
    CarsComponent,
    AuthClientDialogComponent,
    CarDetailDialogComponent,
    ReviewsComponent,
    WorkersComponent,
    MapsComponent,
    SingleWorkerComponent,
    TopRatedCarsComponent,
  ],
  providers: [AuthService, WorkerService, ReviewService, CarRequestService],
})
export class HomeLayoutModule {}
