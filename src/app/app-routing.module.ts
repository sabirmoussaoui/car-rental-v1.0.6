import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { WorkerLayoutComponent } from './layouts/worker-layout/worker-layout.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';


const routes: Routes =[
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  }
  , 
  {
    path: '',
    component:WorkerLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/worker-layout/worker-layout.module').then(m => m.WorkerLayoutModule)
      }
    ]
  },
  {
    path: '',
    component:ClientLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/client-layout/client-layout.module').then(m => m.ClientLayoutModule)
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  }
  , 
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
