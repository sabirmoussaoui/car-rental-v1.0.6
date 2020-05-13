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
interface CitySelect {
  value: City;
  viewValue: string;
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
  car: Car = new Car();
  cities: CitySelect[] = [];
  dateFormGroup: FormGroup;
  clientFormGroup: FormGroup;
  hide = true;
  minDate: Date;
  maxDate: Date;
  car_request: CarRequest = new CarRequest();
  client: Client = new Client();
  password: string;
  show_password_field: boolean = true;
  isAuth: boolean = false;
  already_authenticated: boolean = false;
  //datepickertime
  public date: moment.Moment;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
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
    private dialog: MatDialog
  ) {
    const currentYear = new Date().getFullYear();
    const currentMounth = new Date().getMonth();
    const currentDay = new Date().getDay();
    console.log(currentDay);
    this.minDate = new Date(currentYear, currentMounth, currentDay + 3);
    this.maxDate = new Date(currentYear + 1, currentMounth, currentDay);
  }
  ngOnInit() {
    this.spn.show();
    this.onAuthStateChanged();
    const carKey = this.route.snapshot.params['id'];
    this.carService.getCar(carKey).subscribe((car) => {
      this.car = car.payload.data() as Car;
      this.spn.hide();
    });
    this.initDateForm();
    this.initClientForm();
    this.getCities();
  }
  getOriginPrice(price) {
    return Number(price) + 10;
  }
  initDateForm() {
    this.dateFormGroup = this._formBuilder.group({
      pick_up: ['', Validators.required],
      drop_off: ['', Validators.required],
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
  onSaveDate() {
    this.car_request.pick_up = this.dateFormGroup.get('pick_up').value;
    this.car_request.drop_off = this.dateFormGroup.get('drop_off').value;
    console.log(this.dateFormGroup.get('pick_up').value);
    //date format
    // var strDate = 'Y-m-d'
    //   .replace('Y', date.getFullYear())
    //   .replace('m', date.getMonth() + 1)
    //   .replace('d', date.getDate());
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
        }
      );
    }
  }
  createClient(clientKey) {
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
      }
    );
  }
  addRole(clientKey) {
    return this.roleService.addRole(clientKey, 'client');
  }
  createCarRequest() {
    this.car_request.car = this.car;
    this.car_request.client = this.client;
    console.log(this.car_request);
    this.carRequestService.createCarRequest(this.car_request).then(
      (ref) => {
        this.carRequestService.updateCarRequestKey(ref.id);
        console.log('car requets created with successfully' + ref.id);
        this.router.navigate(['/client/dashboard']);
      },
      (err) => console.log(err)
    );
  }
  getClient(clientKey) {
    this.clientService.getClient(clientKey).subscribe((client) => {
      this.isAuth = true;
      this.client.clientKey = client.id;
      this.clientFormGroup.get('password').disable();
      this.clientFormGroup.get('email').disable();
      this.clientFormGroup.setValue({
        firstname: client.data().firstname,
        lastname: client.data().lastname,
        phone: client.data().phone,
        city: client.data().city,
        adresse: client.data().adresse,
        email: client.data().email,
        password: '',
      });
      this.spn.hide();
    }),
      (err) => {
        this.isAuth = false;
        console.log('client not exist');
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
}
