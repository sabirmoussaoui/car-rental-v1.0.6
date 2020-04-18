import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';

import { ClientRegisterComponent } from '../../client/client-register/client-register.component';
import { WorkerRegisterComponent } from '../../worker/worker-register/worker-register.component';
import { LoginComponent } from '../../auth/login/login.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule,} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input'
import { MapsDialogComponent } from 'src/app/dialogs/maps-dialog/maps-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule
  
  ],
  declarations: [
    LoginComponent,
    ClientRegisterComponent,
    WorkerRegisterComponent,
    MapsDialogComponent
  ]
})
export class AuthLayoutModule { }
