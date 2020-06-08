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
  selector: 'app-worker-profile',
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.scss'],
})
export class WorkerProfileComponent implements OnInit {
  user: firebase.User;
  cities: CitySelect[] = [];
  sectors: SectorSelect[] = [];
  worker: Worker;
  isAuth: boolean;
  workerForm: FormGroup;
  passwordForm: FormGroup;
  workerkey: String;
  sector: SectorSelect;
  mainImageIsUploading: boolean;
  imageUploaded = false;
  imageUrl: string;
  progress: { percentage: number } = { percentage: 0 };
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
      this.user = worker;
      this.getCurrentWorker(worker.uid);
    });
    this.passwordForm = this.formBuilder.group({
      newpassword: ['', Validators.pattern(/[0-9a-zA-Z]{6,}/)],
      confirmpassword: ['', Validators.pattern(/[0-9a-zA-Z]{6,}/)],
    });
  }
  getCurrentWorker(workerKey) {
    this.workerService.getWorker(workerKey).subscribe((data) => {
      this.worker = data as Worker;
      const getCity = new City(this.worker.city.name);
      getCity.cityKey = this.worker.city.cityKey;
      const city: CitySelect = {
        value: getCity,
        viewValue: getCity.name,
      };
      const getSector = new Sector(this.worker.sector.name, getCity.cityKey);
      const sector: SectorSelect = {
        value: getSector,
        viewValue: getSector.name,
      };
      this.workerForm.setValue({
        name: this.worker.name,
        email: this.worker.email,
        phone: this.worker.phone,
        website: this.worker.website,
        city: city.value,
        sector: sector.value,
        adresse: this.worker.adresse,
        newpassword: '',
        confirmpassword: '',
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
      city: [''],
      sector: [''],
      adresse: ['', Validators.required],
      newpassword: ['', Validators.pattern(/[0-9a-zA-Z]{6,}/)],
      confirmpassword: ['', Validators.pattern(/[0-9a-zA-Z]{6,}/)],
    });
  }
  onChangePassword() {
    const newpassword = this.workerForm.get('newpassword').value;
    const confirmpassword = this.workerForm.get('confirmpassword').value;
    if (newpassword === confirmpassword && newpassword != '') {
      // this.authService.passwordChangeUser(newpassword,this.user);
      this.user.updatePassword(newpassword).then(() => {
        console.log('all done');
      });
    }
  }
  onSaveWorker() {
    const name = this.workerForm.get('name').value;
    const email = this.workerForm.get('email').value;
    const phone = this.workerForm.get('phone').value;
    const website = this.workerForm.get('website').value;
    const city = this.workerForm.get('city').value;
    const sector = this.workerForm.get('sector').value;
    const adresse = this.workerForm.get('adresse').value;
    console.log(city);
    const workerupdated = new Worker(
      name,
      phone,
      website,
      city,
      sector,
      adresse,
      email,
      22,
      22,
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

  detectMainImage(event) {
    this.onUploadMainImage(event.target.files[0]);
  }
  onUploadMainImage(file: File) {
    console.log(file);
    this.mainImageIsUploading = true;
    this.workerService
      .uploadMainImage(file, this.progress)
      .then((url: string) => {
        this.imageUrl = url;
        console.log('Url =>' + url);
        this.mainImageIsUploading = false;
        this.imageUploaded = true;
      })
      .then(() => {
        this.workerService.updateProfil(this.imageUrl, this.worker);
      });
  }
}
