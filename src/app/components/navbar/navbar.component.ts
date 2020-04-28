import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
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
    private authService: AuthService
  ) {
    this.location = location;
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((worker) => {
      if (worker) {
        this.getCurrentWorker(worker.uid);
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
  }
  getCurrentWorker(workerKey) {
    this.workerService.getWorkerSnapShot(workerKey).subscribe((data: any) => {
      this.worker = data.payload.data();
      console.log(this.worker);
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
