import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClipboardModule } from 'ngx-clipboard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ClientLayoutRoutes } from './client-layout.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from 'src/app/client/dashboard/dashboard.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CarRequestService } from 'src/app/services/car-requests.service';
import { MyRentalsComponent } from 'src/app/client/my-rentals/my-rentals.component';
import { ClientProfileComponent } from 'src/app/client/client-profile/client-profile.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CarDetailDialogComponent } from 'src/app/client/my-rentals/car-detail-dialog/car-detail-dialog.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ReviewsComponent } from 'src/app/client/my-rentals/car-detail-dialog/reviews/reviews.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CarRequestUpdateDialogComponent } from 'src/app/client/my-rentals/car-request-update-dialog/car-request-update-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import { OpenCarImageDialogComponent } from 'src/app/client/my-rentals/open-car-image-dialog/open-car-image-dialog.component';
import { GeneratePdfDialogComponent } from 'src/app/client/my-rentals/generate-pdf-dialog/generate-pdf-dialog.component';
@NgModule({
  declarations: [
    DashboardComponent,
    MyRentalsComponent,
    ClientProfileComponent,
    CarDetailDialogComponent,
    ReviewsComponent,
    CarRequestUpdateDialogComponent,
    OpenCarImageDialogComponent,
    GeneratePdfDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ClientLayoutRoutes),
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    ClipboardModule,
    ReactiveFormsModule,
    NgbModule,
    MatRadioModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSliderModule,
    NgxSpinnerModule,
    MatSlideToggleModule,
    NgxPaginationModule,
    MatTabsModule,
    MatNativeDateModule,
    MatMomentDateModule,
  ],
  providers: [AuthGuardService, AuthService, CarRequestService],
})
export class ClientLayoutModule {}
