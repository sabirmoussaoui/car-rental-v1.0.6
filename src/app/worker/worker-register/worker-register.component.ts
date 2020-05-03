import { Component, OnInit } from '@angular/core';
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

declare const google: any;
interface CitySelect {
  value: City;
  viewValue: string;
}
interface SectorSelect {
  value: Sector;
  viewValue: string;
}
@Component({
  selector: 'app-worker-register',
  templateUrl: './worker-register.component.html',
  styleUrls: ['./worker-register.component.scss'],
})
export class WorkerRegisterComponent implements OnInit {
  workerForm: FormGroup;
  cities: CitySelect[] = [];
  sectors: SectorSelect[] = [];
  //upload image
  mainImageIsUploading = false;
  imageUploaded = false;
  imageUrl: string;
  progress: { percentage: number } = { percentage: 0 };

  constructor(
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

    // MAP
    //   let maps = document.getElementById('map-canvas');
    //   let lat = maps.getAttribute('data-lat');
    //   let lng = maps.getAttribute('data-lng');

    //   var myLatlng = new google.maps.LatLng(lat, lng);
    //   var mapOptions = {
    //       zoom: 12,
    //       scrollwheel: false,
    //       center: myLatlng,
    //       mapTypeId: google.maps.MapTypeId.ROADMAP,
    //       styles: [
    //         {"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},
    //         {"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},
    //         {"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},
    //         {"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},
    //         {"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},
    //         {"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},
    //         {"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},
    //         {"featureType":"water","elementType":"all","stylers":[{"color":'#5e72e4'},{"visibility":"on"}]}]
    //   }

    //   maps = new google.maps.Map(maps, mapOptions);

    //   var marker = new google.maps.Marker({
    //       position: myLatlng,
    //       map: maps,
    //       animation: google.maps.Animation.DROP,
    //       title: 'Hello World!'
    //                                       });

    //   var contentString = '<div class="info-window-content"><h2>Car Rental</h2>' +
    //       '<p>*************************************</p></div>';

    //   var infowindow = new google.maps.InfoWindow({
    //       content: contentString
    //   });

    //   google.maps.event.addListener(marker, 'click', function() {
    //       infowindow.open(map, marker);
    //   });
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
        'not working',
        'not working',
        false,
        false,
        new Date(),
        new Date()
      );

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
    console.log(name + email + phone + password + website + city + sector);
    return this.router.navigate(['/worker/dashbord']);
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
      });
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
