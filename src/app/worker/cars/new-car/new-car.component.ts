import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarBrandService } from 'src/app/services/car-brand.service';
import { CarModelService } from 'src/app/services/car-model.service';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/Car.model';
import { MatDialog } from '@angular/material/dialog';
import { CarBrand } from 'src/app/models/CarBrand.model';
import { CarModel } from 'src/app/models/CarModel.model';
import { WorkerService } from 'src/app/services/worker.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as firebase from 'firebase';
import { Worker } from 'src/app/models/Worker.model';
import { CarPhotosDialogComponent } from '../car-photos-dialog/car-photos-dialog.component';
import {
  SelectBrand,
  SelectModel,
  Car_Class,
  Body_Style,
} from 'src/app/interfaces/Select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.scss'],
})
export class NewCarComponent implements OnInit {
  carForm: FormGroup;
  //select
  carBrands: SelectBrand[] = [];
  carModels: SelectModel[] = [];
  car_class: Car_Class[] = [
    {
      value: 'Mini',
      viewValue: 'Mini',
    },
    {
      value: 'Economy',
      viewValue: 'Economy',
    },
    {
      value: 'Compact',
      viewValue: 'Compact',
    },
    {
      value: 'Itermediate',
      viewValue: 'Itermediate',
    },
    {
      value: 'Standard',
      viewValue: 'Standard',
    },
    {
      value: 'Full size',
      viewValue: 'Full size',
    },
    {
      value: 'Luxury',
      viewValue: 'Luxury',
    },
  ];
  body_styles: Body_Style[] = [
    {
      value: 'Small  cars',
      viewValue: 'Small cars',
      avatar:
        'https://cdn2.rcstatic.com/images/car_images/web/chevrolet/spark_lrg.jpg',
    },
    {
      value: 'Medium cars',
      viewValue: 'Medium cars',
      avatar:
        'https://cdn2.rcstatic.com/images/car_images/web/chevrolet/spark_lrg.jpg',
    },
    {
      value: 'Large cars',
      viewValue: 'Large cars',
      avatar:
        'https://cdn2.rcstatic.com/images/car_images/web/nissan/sentra_lrg.jpg',
    },
    {
      value: 'Convertibles',
      viewValue: 'Convertibles',
      avatar:
        'https://cdn2.rcstatic.com/images/car_images/web/ford/mustang_convertible_lrg.jpg',
    },
    {
      value: 'Premium cars',
      viewValue: 'Premium cars',
      avatar:
        'https://cdn2.rcstatic.com/images/car_images/web/toyota/rav4_lrg.jpg',
    },
    {
      value: 'People carriers',
      viewValue: 'People carriers',
      avatar:
        'https://cdn2.rcstatic.com/images/car_images/web/nissan/quest_lrg.jpg',
    },
    {
      value: 'SUVs',
      viewValue: 'SUVs',
      avatar:
        'https://cdn2.rcstatic.com/images/car_images/web/chevrolet/tahoe_lrg.jpg',
    },
  ];

  //upload image
  mainImageIsUploading = false;
  imageUploaded = false;
  imageUrl: string;
  progress: { percentage: number } = { percentage: 0 };
  public photos: any[] = [];
  allPhoots: any[] = [];

  worker: Worker;
  workerKey: string;
  isHovering: boolean;

  files: File[] = [];
  created_at = new Date();
  dformat =
    [
      this.created_at.getMonth() + 1,
      this.created_at.getDate(),
      this.created_at.getFullYear(),
    ].join('/') +
    ' ' +
    [
      this.created_at.getHours(),
      this.created_at.getMinutes(),
      this.created_at.getSeconds(),
    ].join(':');
  constructor(
    private formBuilder: FormBuilder,
    private carBrandService: CarBrandService,
    private carModelService: CarModelService,
    private carService: CarService,
    private dialog: MatDialog,
    private workerService: WorkerService,
    private spinner: NgxSpinnerService,
    private route: Router
  ) {
    this.carService.myMethod$.subscribe((data) => {
      this.photos.push(data);
    });
  }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((worker) => {
      if (worker) {
        this.getCurrentWorker(worker.uid);
      }
    });
    this.initCarModelForm();
    this.getCarBrands();
  }

  initCarModelForm() {
    this.carForm = this.formBuilder.group({
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      carBrand: ['', Validators.required],
      carModel: ['', Validators.required],
      seat: ['', Validators.required],
      fuel: ['', Validators.required],
      door: ['', Validators.required],
      large_bag: [''],
      small_bag: [''],
      body_style: ['', Validators.required],
      air_conditioning: [''],
      description: [''],
      car_class: ['', Validators.required],
      gearbox: ['', Validators.required],
    });
  }
  getCurrentWorker(workerKey) {
    this.workerService.getWorkerSnapShot(workerKey).subscribe((data) => {
      this.worker = data.payload.data() as Worker;
      this.worker.workerKey = data.payload.id;
    });
  }

  onSaveCar() {
    const price = this.carForm.get('price').value;
    const quantity = this.carForm.get('quantity').value;
    const fuel = this.carForm.get('fuel').value;
    const seat = this.carForm.get('seat').value;
    const door = this.carForm.get('door').value;
    const carBrand = this.carForm.get('carBrand').value;
    const carModel = this.carForm.get('carModel').value;
    const gearbox = this.carForm.get('gearbox').value;
    const air_conditioning = this.carForm.get('air_conditioning').value;
    const large_bag = this.carForm.get('large_bag').value;
    const small_bag = this.carForm.get('small_bag').value;
    const body_style = this.carForm.get('body_style').value;
    const car_class = this.carForm.get('car_class').value;
    const description = this.carForm.get('description').value;

    const car = new Car(
      price,
      quantity,
      carBrand,
      carModel,
      seat,
      door,
      fuel,
      new Date(),
      new Date(),
      this.worker,
      large_bag,
      small_bag,
      gearbox,
      air_conditioning,
      description,
      car_class,
      body_style
    );
    if (this.imageUrl && this.imageUrl !== '') {
      car.main_photo = this.imageUrl;
    }
    car.photos = this.photos;
    this.carService.createCar(car); //create car
    this.photos.push(this.imageUrl);
    this.allPhoots = this.photos;
    console.log(this.allPhoots);
    this.carService.createPhotos(this.allPhoots, carBrand, carModel); //create all photos with car brand and car model
    this.route.navigate(['/worker/cars']);
  }
  searchMainPhoto() {
    const dialogRef = this.dialog.open(CarPhotosDialogComponent, {
      width: '1000px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.imageUrl = result.link;
      }
    });
  }

  getCarBrands() {
    this.carBrandService.getCarBrands().subscribe((result) => {
      result.forEach((doc) => {
        const carBrand = new CarBrand(doc.data().name);
        carBrand.carBrandKey = doc.id;
        carBrand.photoUrl = doc.data().photoUrl;
        this.carBrands.push({
          value: carBrand,
          viewValue: carBrand.name,
        });
      });
    });
  }

  brandSelected() {
    const carBrand = this.carForm.get('carBrand').value;
    this.getCarModels(carBrand.carBrandKey);
  }

  getCarModels(carBrandKey) {
    this.carModels = [];
    this.carModelService
      .findCarModelsByBrand(carBrandKey)
      .subscribe((result) => {
        result.forEach((doc) => {
          const carModel = new CarModel(
            doc.data().name,
            doc.data().year,
            doc.data().carBrandKey
          );
          carModel.carModelKey = doc.id;
          this.carModels.push({
            value: carModel,
            viewValue: carModel.name + ' ' + carModel.year,
          });
        });
      });
  }

  //Upload Imagde

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  detectMainImage(event) {
    this.onUploadMainImage(event.target.files[0]);
  }
  onUploadMainImage(file: File) {
    console.log(file);
    this.mainImageIsUploading = true;
    this.carService.uploadMainImage(file, this.progress).then((url: string) => {
      this.imageUrl = url;
      console.log('Url =>' + url);
      this.mainImageIsUploading = false;
      this.imageUploaded = true;
    });
  }
}
