import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { WorkerLayoutComponent } from './layouts/worker-layout/worker-layout.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layouts/admin-layout/admin-layout.module').then(
            (m) => m.AdminLayoutModule
          ),
      },
    ],
  },
  {
    path: '',
    component: WorkerLayoutComponent,
    // canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layouts/worker-layout/worker-layout.module').then(
            (m) => m.WorkerLayoutModule
          ),
      },
    ],
  },
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layouts/client-layout/client-layout.module').then(
            (m) => m.ClientLayoutModule
          ),
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layouts/auth-layout/auth-layout.module').then(
            (m) => m.AuthLayoutModule
          ),
      },
    ],
  },
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layouts/home-layout/home-layout.module').then(
            (m) => m.HomeLayoutModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
