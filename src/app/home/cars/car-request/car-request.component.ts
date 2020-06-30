import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Car } from 'src/app/models/Car.model';
import { City } from 'src/app/models/City.model';
import { CityService } from 'src/app/services/city.service';
import { CarRequest } from 'src/app/models/CarRequest.model';
import { ThemePalette } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth.service';
import { RoleService } from 'src/app/services/role.service';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/Client.model';
import { CarRequestService } from 'src/app/services/car-requests.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AuthClientDialogComponent } from './auth-client-dialog/auth-client-dialog.component';
import * as firebase from 'firebase';
import moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
interface CitySelect {
  value: City;
  viewValue: string;
}
interface NgbTime {
  hour: number;
  minute: number;
  second: number;
}

@Component({
  selector: 'app-car-request',
  templateUrl: './car-request.component.html',
  styleUrls: ['./car-request.component.scss'],
  styles: [
    `
      .star {
        position: relative;
        display: inline-block;
        font-size: 3rem;
        color: #d3d3d3;
      }
      .full {
        color: red;
      }
      .half {
        position: absolute;
        display: inline-block;
        overflow: hidden;
        color: red;
      }
    `,
  ],
  providers: [],
})
export class CarRequestComponent implements OnInit {
  carKey: string;
  car: Car;
  cities: CitySelect[] = [];
  dateFormGroup: FormGroup;
  clientFormGroup: FormGroup;
  hide = true;
  minDate: Date;
  maxDate: Date;
  courrentdate: any;
  car_request: CarRequest = new CarRequest();
  client: Client = new Client();
  password: string;
  show_password_field: boolean = true;
  isAuth: boolean = false;
  already_authenticated: boolean = false;
  pick_up_time: NgbTime = { hour: 8, minute: 0, second: 0 };
  drop_off_time: NgbTime = { hour: 8, minute: 0, second: 0 };
  pick_up_moment;
  drop_off_moment;
  days: number = 1;
  priceTotal: number;
  termFormGroup: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private carService: CarService,
    private spn: NgxSpinnerService,
    private cityService: CityService,
    private authService: AuthService,
    private roleService: RoleService,
    private router: Router,
    private clientService: ClientService,
    private carRequestService: CarRequestService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    const currentYear = new Date().getFullYear();
    const currentMounth = new Date().getMonth();
    const currentDay = new Date().getDay();
    this.minDate = new Date(currentYear, currentMounth, currentDay + 3);
    this.maxDate = new Date(currentYear + 1, currentMounth, currentDay);
    this.courrentdate = moment(
      new Date(currentYear, currentMounth, currentDay)
    );
  }
  ngOnInit() {
    this.spn.show();
    this.onAuthStateChanged();
    const carKey = this.route.snapshot.params['id'];
    this.carService.getCar(carKey).subscribe((car: Car) => {
      this.car = car;
      this.priceTotal = this.car.price;
      this.spn.hide();
    });
    this.initDateForm();
    this.initClientForm();
    this.initTermsForm();
    this.getCities();
    setTimeout(() => {
      this.addVisitor(this.car);
    }, 5000);
  }
  getOriginPrice(price) {
    return Number(price) + 10;
  }
  addVisitor(car: Car) {
    this.carService.addVisitor(car.carKey, car.visitor);
  }
  initDateForm() {
    this.dateFormGroup = this._formBuilder.group({
      pick_up: ['', Validators.required],
      drop_off: ['', Validators.required],
      pick_up_time: [],
      drop_off_time: [],
    });
  }

  initClientForm() {
    this.clientFormGroup = this._formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.email],
      phone: ['', Validators.required],
      password: [
        '',
        [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)],
      ],
      city: [''],
      adresse: [''],
    });
  }
  changePrice() {
    this.pick_up_moment = moment(this.dateFormGroup.get('pick_up').value);
    this.drop_off_moment = moment(this.dateFormGroup.get('drop_off').value);
    this.days = this.drop_off_moment.diff(this.pick_up_moment, 'days');
    this.days = this.days <= 0 ? 1 : this.days;
    this.priceTotal = this.days * this.car.price;
    if (this.pick_up_moment > this.drop_off_moment) {
      this.openSnackBar('check the date please ! ', 'Invalid date');
      console.log(this.courrentdate);
      this.initDateForm();
    }

    console.log(
      this.priceTotal + '----' + this.days + '----' + this.pick_up_moment
    );
  }
  initTermsForm() {
    this.termFormGroup = this._formBuilder.group({
      terms: ['', Validators.required],
    });
  }
  onSaveDate() {
    this.car_request.pick_up = moment(
      this.dateFormGroup.get('pick_up').value
    ).format('YYYY-MM-DD');

    this.car_request.drop_off = moment(
      this.dateFormGroup.get('drop_off').value
    ).format('YYYY-MM-DD');
    this.pick_up_time = this.dateFormGroup.get('pick_up_time').value as NgbTime;
    this.drop_off_time = this.dateFormGroup.get('drop_off_time')
      .value as NgbTime;
    this.car_request.pick_up_time =
      this.pick_up_time.hour + ':' + this.pick_up_time.minute;
    this.car_request.drop_off_time =
      this.drop_off_time.hour + ':' + this.drop_off_time.minute;
  }
  onSaveClient() {
    this.client.email = this.clientFormGroup.get('email').value;
    this.password = this.clientFormGroup.get('password').value;
    this.client.phone = this.clientFormGroup.get('phone').value;
    this.client.firstname = this.clientFormGroup.get('firstname').value;
    this.client.lastname = this.clientFormGroup.get('lastname').value;
    const city = this.clientFormGroup.get('city').value;
    this.client.city = new City(city.name);
    this.client.city.cityKey = city.cityKey;
    this.client.adresse = this.clientFormGroup.get('adresse').value;
    this.client.updated_at = new Date();
    this.client.created_at = new Date();
  }
  authClient() {
    const email = this.clientFormGroup.get('email').value;
    console.log(email);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {
      email: email,
    };
    const dialogRef = this.dialog.open(AuthClientDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data != undefined) {
        this.spn.show();
        const email = data.email;
        const password = data.password;
        console.log(email + 'pssw' + password);
        this.authService.signInUser(email, password).then(
          () => {
            this.onAuthStateChanged();
          },
          (error) => {
            this.spn.hide();
            console.log(error);
            this.openSnackBar(error.message, 'ok');
          }
        );
      }
    });
  }
  onAuthStateChanged() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.getUserRole(user.uid);
      }
    }),
      (err) => {
        this.isAuth = false;
      };
  }

  getUserRole(userKey) {
    this.roleService.getRole(userKey).subscribe((user) => {
      if (user.data().role === 'client') {
        this.getClient(userKey);
      } else {
        console.log('not client is ' + user.data().role);
      }
    });
  }
  onSaveForms() {
    if (this.isAuth) {
      this.createClient(this.client.clientKey);
    } else {
      this.authService.createUser(this.client, this.password).then(
        (clientKey: string) => {
          this.createClient(clientKey);
        },
        (err) => {
          console.log(err);
          this.openSnackBar(err.message, 'ok');
        }
      );
    }
  }
  createClient(clientKey) {
    console.log('client key ' + clientKey);
    this.clientService.createClient(clientKey, this.client).then(
      (client) => {
        this.client.clientKey = clientKey;
        if (this.isAuth) {
          this.createCarRequest();
        } else {
          this.addRole(clientKey).then(() => {
            this.createCarRequest();
          });
        }
      },
      (err) => {
        console.log('client not register');
        if (err.code === 'auth/user-not-found') {
          this.openSnackBar(err.message, 'error');
        } else {
          this.openSnackBar(err.message, 'error');
        }
      }
    );
  }
  addRole(clientKey) {
    return this.roleService.addRole(clientKey, 'client');
  }
  createCarRequest() {
    this.car_request.car = this.car;
    this.car_request.client = this.client;
    this.car_request.clientKey = this.client.clientKey;
    this.car_request.workerKey = this.car.worker.workerKey;
    this.car_request.carBrandKey = this.car.carBrand.name;
    this.car_request.clientCityKey = this.client.city.name;
    this.car_request.price_total = this.priceTotal;
    this.car_request.days = this.days;
    console.log(this.car_request);
    this.carRequestService.createCarRequest(this.car_request).then(
      (ref) => {
        console.log('car requets created with successfully');
        this.router.navigate(['home']);
      },
      (err) => {
        console.log(err);
        this.openSnackBar(err.message, 'error');
      }
    );
  }
  getClient(clientKey) {
    this.client.clientKey = clientKey;
    this.clientService.getClient(clientKey).subscribe((client: Client) => {
      this.client.profil = client.profil;
      this.isAuth = true;
      this.clientFormGroup.get('password').disable();
      this.clientFormGroup.get('email').disable();
      this.clientFormGroup.setValue({
        firstname: client.firstname,
        lastname: client.lastname,
        phone: client.phone,
        city: client.city,
        adresse: client.adresse,
        email: client.email,
        password: '',
      });
      this.spn.hide();
    }),
      (err) => {
        this.isAuth = false;
        console.log('client not exist');
        if (err.code === 'auth/user-not-found') {
          this.openSnackBar(
            'There is no user record corresponding to this identifier',
            'error'
          );
        } else {
          this.openSnackBar(err.message, 'error');
        }
      };
  }

  getCities() {
    this.cityService.getCities().subscribe((result) => {
      result.forEach((doc) => {
        const city = new City(doc.data().name);
        city.cityKey = doc.id;
        this.cities.push({ value: city, viewValue: city.name });
      });
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8000,
    });
  }
}
