import { Component, OnInit, ElementRef } from '@angular/core';
import { WORKER_ROUTES } from '../sidebar/sidebar.component';
import { CLIENT_ROUTES } from '../sidebar/sidebar.component';
import { ADMIN_ROUTES } from '../sidebar/sidebar.component';

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
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  worker: any;
  isAuth: boolean;
  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private workerService: WorkerService,
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
            if (user.data().role === 'worker') {
              this.listTitles = WORKER_ROUTES.filter((listTitle) => listTitle);
              this.getCurrentWorker(user.id);
            } else if (user.data().role === 'client') {
              this.listTitles = CLIENT_ROUTES.filter((listTitle) => listTitle);
            } else {
              this.listTitles = ADMIN_ROUTES.filter((listTitle) => listTitle);
            }
          });
        } else {
          this.isAuth = false;
        }
      },
      (err) => {
        console.log(err);
      }
    );

    this.listTitles = WORKER_ROUTES.filter((listTitle) => listTitle);
  }

  getCurrentWorker(workerKey) {
    this.workerService.getWorkerSnapShot(workerKey).subscribe((data: any) => {
      this.worker = data.payload.data();
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
