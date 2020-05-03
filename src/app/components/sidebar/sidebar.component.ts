import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/services/role.service';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';
import { NgxSpinnerService } from 'ngx-spinner';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const WORKER_ROUTES: RouteInfo[] = [
  // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
  // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' },
  //worker route
  {
    path: '/worker/dashboard',
    title: 'Dashboard',
    icon: 'ni-tv-2 text-primary',
    class: '',
  },
  {
    path: '/home',
    title: 'Home',
    icon: 'ni-planet text-primary',
    class: '',
  },
  {
    path: '/worker/cars',
    title: 'My Cars',
    icon: 'ni-circle-08 text-info',
    class: '',
  },
  {
    path: '/worker/clients',
    title: 'My Clients',
    icon: 'fa fa-users text-pink',
    class: '',
  },
  {
    path: '/worker/new-car',
    title: 'New Car',
    icon: 'fa fa-plus-circle text-danger',
    class: '',
  },
];
export const CLIENT_ROUTES: RouteInfo[] = [];
export const ADMIN_ROUTES: RouteInfo[] = [
  {
    path: '/admin/dashboard',
    title: 'dashboard',
    icon: 'ni-tv-2 text-primary',
    class: '',
  },
  {
    path: '/admin/settings',
    title: 'Settings',
    icon: 'ni-single-02 text-yellow',
    class: '',
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;
  public isAuth: boolean;

  constructor(
    private router: Router,
    private roleService: RoleService,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    //sniper
    this.spinner.show();
    /// Get Current User
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isAuth = true;
        this.roleService.getRole(user.uid).subscribe((user) => {
          if (user.data().role === 'worker') {
            this.spinner.hide();
            this.menuItems = WORKER_ROUTES.filter((menuItem) => menuItem);
            this.router.events.subscribe((event) => {
              this.isCollapsed = true;
            });
          } else if (user.data().role === 'admin') {
            this.spinner.hide();
            this.menuItems = ADMIN_ROUTES.filter((menuItem) => menuItem);
            this.router.events.subscribe((event) => {
              this.isCollapsed = true;
            });
          } else {
            this.spinner.hide();
            this.menuItems = CLIENT_ROUTES.filter((menuItem) => menuItem);
            this.router.events.subscribe((event) => {
              this.isCollapsed = true;
            });
          }
        });
      } else {
        this.spinner.hide();
        this.isAuth = false;
      }
    });
    this.spinner.hide();
  }
}
