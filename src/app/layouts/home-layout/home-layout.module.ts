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
import { CarsComponent } from 'src/app/home/cars/cars.component';
import { HomeLayoutRoutes } from './home-layout.routing';
import { HomeComponent } from 'src/app/home/home/home.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomeLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    NgxSpinnerModule,
    NgbModule,
    NgxPaginationModule,
  ],
  declarations: [CarsComponent, HomeComponent],
  providers: [AuthService, WorkerService],
})
export class HomeLayoutModule {}
