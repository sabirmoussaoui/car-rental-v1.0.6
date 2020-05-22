import { Component, OnInit, ElementRef } from '@angular/core';
import { WORKER_ROUTES } from '../sidebar/sidebar.component';
import { CLIENT_ROUTES } from '../sidebar/sidebar.component';
import { ADMIN_ROUTES } from '../sidebar/sidebar.component';
import { HOME_ROUTES } from '../sidebar/sidebar.component';

import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { Router } from '@angular/router';
import { WorkerService } from 'src/app/services/worker.service';
import { Worker } from '../../models/Worker.model';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';
import { RoleService } from 'src/app/services/role.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/Client.model';
import { AdminService } from 'src/app/services/admin.service';
import { Admin } from 'src/app/models/Admin.model';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  worker: Worker;
  client: Client;
  admin: Admin;
  fullname: string;
  photoUrl: string;
  isAuth: boolean;
  page_title: string;
  user_profile_route;

  constructor(
    element: ElementRef,
    location: Location,
    private router: Router,
    private workerService: WorkerService,
    private clientService: ClientService,
    private adminService: AdminService,
    private authService: AuthService,
    private roleService: RoleService,
    private spinner: NgxSpinnerService
  ) {
    this.location = location;
  }
  ngOnInit() {
    /// Get Current User
    this.spinner.show();
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
          this.roleService.getRole(user.uid).subscribe((user) => {
            if (user.data().role != undefined) {
              if (user.data().role === 'worker') {
                this.user_profile_route = '/' + user.data().role + '/profile';
                this.listTitles = WORKER_ROUTES.filter(
                  (listTitle) => listTitle
                );
                this.page_title = this.getTitle();
                this.getCurrentWorker(user.id);
              } else if (user.data().role === 'client') {
                this.user_profile_route = '/' + user.data().role + '/profile';
                this.listTitles = CLIENT_ROUTES.filter(
                  (listTitle) => listTitle
                );
                this.page_title = this.getTitle();
                this.getCurrentClient(user.id);
              } else {
                this.user_profile_route = '/' + user.data().role + '/profile';
                this.listTitles = ADMIN_ROUTES.filter((listTitle) => listTitle);
                this.getCurrentAdmin(user.id);
                this.page_title = this.getTitle();
              }
            } else {
              console.log('not login');
              this.listTitles = HOME_ROUTES.filter((listTitle) => listTitle);
              this.page_title = this.getTitle();
              this.isAuth = false;
            }
          });
        } else {
          this.listTitles = HOME_ROUTES.filter((listTitle) => listTitle);
          this.page_title = this.getTitle();
          this.isAuth = false;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getCurrentWorker(workerKey) {
    this.workerService.getWorker(workerKey).subscribe((data) => {
      this.worker = data as Worker;
      this.fullname = this.worker.name;
      this.photoUrl = this.worker.logo;
      this.spinner.hide();
    });
  }
  getCurrentClient(clientKey) {
    this.clientService.getClientSnapShot(clientKey).subscribe((data) => {
      this.client = data.payload.data() as Client;
      this.client.clientKey = data.payload.id;
      this.fullname = this.client.firstname + ' ' + this.client.lastname;
      this.photoUrl = this.client.profil;
      this.spinner.hide();
    });
  }
  getCurrentAdmin(adminKey) {
    this.adminService.getAdminSnapShot(adminKey).subscribe((data) => {
      this.admin = data.payload.data() as Admin;
      this.admin.adminKey = data.payload.id;
      this.fullname = this.admin.firstname + ' ' + this.admin.lastname;
      this.photoUrl = this.admin.photoURL;
      this.spinner.hide();
    });
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }
  onSignOut() {
    this.authService.signOutUser().then(
      () => {
        console.log('signOut with successfully');
        this.router.navigate(['/login']);
      },
      (err) => {
        console.log('signOut error' + err);
      }
    );
  }
}
