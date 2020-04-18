import { Routes } from '@angular/router';

import { LoginComponent } from '../../auth/login/login.component';
import { ClientRegisterComponent } from 'src/app/client/client-register/client-register.component';
import { WorkerRegisterComponent } from 'src/app/worker/worker-register/worker-register.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'client-register',       component: ClientRegisterComponent},
    { path: 'worker-register',       component: WorkerRegisterComponent }

];
