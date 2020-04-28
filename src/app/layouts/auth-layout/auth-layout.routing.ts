import { Routes } from '@angular/router';

import { ClientRegisterComponent } from 'src/app/client/client-register/client-register.component';
import { WorkerRegisterComponent } from 'src/app/worker/worker-register/worker-register.component';
import { LoginComponent } from 'src/app/auth/login/login.component';

export const AuthLayoutRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'client-register', component: ClientRegisterComponent },
  { path: 'worker-register', component: WorkerRegisterComponent },
];
