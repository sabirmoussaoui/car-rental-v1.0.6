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
import { MatFormFieldModule } from '@angular/material/form-field';
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

@NgModule({
  declarations: [
    DashboardComponent,
    MyRentalsComponent,
    ClientProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ClientLayoutRoutes),
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
    NgxPaginationModule,
  ],
  providers: [AuthGuardService, AuthService, CarRequestService],
})
export class ClientLayoutModule {}
