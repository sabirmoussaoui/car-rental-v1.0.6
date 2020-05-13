import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { WorkerService } from 'src/app/services/worker.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Worker } from '../../models/Worker.model';
import * as firebase from 'firebase';
import { City } from 'src/app/models/City.model';
import { Sector } from 'src/app/models/Sector.model';
import { CityService } from 'src/app/services/city.service';
import { SectorService } from 'src/app/services/sector.service';
import { NgxSpinnerService } from 'ngx-spinner';
interface CitySelect {
  value: City;
  viewValue: string;
}
interface SectorSelect {
  value: Sector;
  viewValue: string;
}
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  cities: CitySelect[] = [];
  sectors: SectorSelect[] = [];
  worker: Worker;
  isAuth: boolean;
  workerForm: FormGroup;
  workerkey: String;
  sector: SectorSelect;
  constructor(
    private workerService: WorkerService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private sectorService: SectorService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.initForm();
    this.getCities();
    firebase.auth().onAuthStateChanged((worker) => {
      this.workerkey = worker.uid;
      this.getCurrentWorker(worker.uid);
    });
  }
  getCurrentWorker(workerKey) {
    this.workerService.getWorkerSnapShot(workerKey).subscribe((data: any) => {
      this.worker = data.payload.data();
      const getCity = new City(this.worker.city.name);
      getCity.cityKey = this.worker.city.cityKey;

      const city: CitySelect = {
        value: getCity,
        viewValue: getCity.name,
      };
      this.workerForm.setValue({
        name: this.worker.name,
        email: this.worker.email,
        phone: this.worker.phone,
        website: '',
        city: city.value,
        sector: '',
        adresse: this.worker.adresse,
      });

      this.spinner.hide();
    });
  }
  initForm() {
    this.workerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      phone: ['', Validators.required],
      website: [''],
      city: ['', Validators.required],
      sector: ['', Validators.required],
      adresse: ['', Validators.required],
    });
  }
  onSaveWorker() {
    const name = this.workerForm.get('name').value;
    const email = this.workerForm.get('email').value;
    const phone = this.workerForm.get('phone').value;
    const website = this.workerForm.get('website').value;
    const city = this.workerForm.get('city').value;
    const sector = this.workerForm.get('sector').value;
    const adresse = this.workerForm.get('adresse').value;
    const workerupdated = new Worker(
      name,
      phone,
      website,
      city,
      sector,
      adresse,
      email,
      'not working',
      'not working',
      false,
      false,
      new Date(),
      new Date()
    );
    this.workerService.updateWorker(this.workerkey, workerupdated);
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
