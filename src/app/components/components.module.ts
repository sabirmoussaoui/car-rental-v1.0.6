import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkerService } from '../services/worker.service';
import { AuthService } from '../services/auth.service';
import { AuthGuardService } from '../services/auth-guard.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ClientService } from '../services/client.service';
import { AdminService } from '../services/admin.service';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule, NgxSpinnerModule],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent],
  exports: [FooterComponent, NavbarComponent, SidebarComponent],
  providers: [
    WorkerService,
    AuthService,
    AuthGuardService,
    ClientService,
    AdminService,
  ],
})
export class ComponentsModule {}
