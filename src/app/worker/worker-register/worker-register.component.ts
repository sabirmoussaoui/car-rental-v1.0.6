import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CityService } from 'src/app/services/city.service';
import { SectorService } from 'src/app/services/sector.service';
import { WorkerService } from 'src/app/services/worker.service';
import { AuthService } from 'src/app/services/auth.service';
import { Worker } from '../../models/Worker.model';
import { City } from 'src/app/models/City.model';
import { Sector } from 'src/app/models/Sector.model';
import { RoleService } from 'src/app/services/role.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CitySelect, SectorSelect } from 'src/app/interfaces/Select';
import { from } from 'rxjs';
import * as L from 'leaflet';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-worker-register',
  templateUrl: './worker-register.component.html',
  styleUrls: ['./worker-register.component.scss'],
})
export class WorkerRegisterComponent implements OnInit, AfterViewInit {
  workerForm: FormGroup;
  cities: CitySelect[] = [];
  sectors: SectorSelect[] = [];
  //upload image
  mainImageIsUploading = false;
  imageUploaded = false;
  imageUrl: string;
  progress: { percentage: number } = { percentage: 0 };
  map;
  parcThabor = {
    lat: 33.5950627,
    lng: -7.6187768,
  };
  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private sectorService: SectorService,
    private workerService: WorkerService,
    private authService: AuthService,
    private roleService: RoleService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit() {
    // initialiser la formulaire
    this.getCities();
    this.initForm();
  }
  ngAfterViewInit() {
    this.createMap();
  }

  createMap() {
    const zoomLevel = 12;

    this.map = L.map('map', {
      center: [this.parcThabor.lat, this.parcThabor.lng],
      zoom: zoomLevel,
    });

    const mainLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );
    mainLayer.addTo(this.map);
    this.map.on('click', (e) => {
      this.parcThabor = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      };
      this.openSnackBar(
        'alt :' + e.latlng.lat + ' lng :' + e.latlng.lng,
        'done'
      );
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
  initForm() {
    this.workerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      phone: ['', Validators.required],
      password: [
        '',
        [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)],
      ],
      confirmPassword: [
        '',
        [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)],
      ],
      website: [''],
      city: ['', Validators.required],
      sector: ['', Validators.required],
      adresse: ['', Validators.required],
    });
  }

  onSaveWorker() {
    this.spinner.show();
    const name = this.workerForm.get('name').value;
    const email = this.workerForm.get('email').value;
    const phone = this.workerForm.get('phone').value;
    const password = this.workerForm.get('password').value;
    const confirmPassword = this.workerForm.get('confirmPassword').value;
    const website = this.workerForm.get('website').value;
    const city = this.workerForm.get('city').value;
    const sector = this.workerForm.get('sector').value;
    const adresse = this.workerForm.get('adresse').value;
    if (password === confirmPassword) {
      const worker = new Worker(
        name,
        phone,
        website,
        city,
        sector,
        adresse,
        email,
        this.parcThabor.lng,
        this.parcThabor.lat,
        false,
        false,
        new Date(),
        new Date()
      );
      console.log(worker);

      if (this.imageUrl && this.imageUrl !== '') {
        worker.logo = this.imageUrl;
      }
      this.authService.createUser(worker, password).then(
        (workerKey) => {
          this.workerService.createWorker(workerKey, worker).then(
            () => {
              this.roleService.addRole(workerKey, 'worker');
              this.spinner.hide();
              this.router.navigate(['/worker/dashboard']);
            },
            (err) => {
              console.log('worker not register');
              this.spinner.hide();
            }
          );
        },
        (err) => {
          console.log(err);
          this.spinner.hide();
        }
      );
    } else {
      console.log('not ok');
      this.spinner.hide();
    }
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
  onCitySelected() {
    const city = this.workerForm.get('city').value;
    this.getSectors(city.cityKey);
  }
  getSectors(cityKey) {
    this.sectors = [];
    this.sectorService.getSectors(cityKey).subscribe((result) => {
      result.forEach((doc) => {
        const sector = new Sector(doc.data().name, cityKey);
        this.sectors.push({ value: sector, viewValue: sector.name });
      });
    });
  }
}
