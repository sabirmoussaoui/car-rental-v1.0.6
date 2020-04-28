import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';

import { ClientRegisterComponent } from '../../client/client-register/client-register.component';
import { WorkerRegisterComponent } from '../../worker/worker-register/worker-register.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MapsDialogComponent } from 'src/app/dialogs/maps-dialog/maps-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { WorkerService } from 'src/app/services/worker.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
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
    MatDialogModule,
  ],
  declarations: [
    LoginComponent,
    ClientRegisterComponent,
    WorkerRegisterComponent,
    MapsDialogComponent,
  ],
  providers: [AuthService, WorkerService],
})
export class AuthLayoutModule {}
