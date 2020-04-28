import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarBrandService } from 'src/app/services/car-brand.service';
import { CarModelService } from 'src/app/services/car-model.service';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/Car.model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { OpenCarImageDialogComponent } from './open-car-image-dialog/open-car-image-dialog.component';
import { CarBrand } from 'src/app/models/CarBrand.model';
import { CarModel } from 'src/app/models/CarModel.model';
import { CarUpdateDialogComponent } from './car-update-dialog/car-update-dialog.component';
import { CarPhotosDialogComponent } from './car-photos-dialog/car-photos-dialog.component';
import { WorkerService } from 'src/app/services/worker.service';
interface SelectModel {
  value: CarModel;
  viewValue: string;
}
interface SelectBrand {
  value: CarBrand;
  viewValue: string;
}

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent implements OnInit {
  carForm: FormGroup;
  //select
  carBrands: SelectBrand[] = [];
  carModels: SelectModel[] = [];
  //upload image
  mainImageIsUploading = false;
  imageUploaded = false;
  imageUrl: string;
  progress: { percentage: number } = { percentage: 0 };
  public photos: any[] = [];
  allPhoots: any[] = [];

  isHovering: boolean;

  files: File[] = [];
  cars: Array<any>;
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
    private workerService: WorkerService
  ) {
    this.carService.myMethod$.subscribe((data) => {
      this.photos.push(data);
    });
  }

  ngOnInit(): void {
    this.initCarModelForm();
    this.getCarBrands();
    this.getCars();
  }
  initCarModelForm() {
    this.carForm = this.formBuilder.group({
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      carBrand: ['', Validators.required],
      carModel: ['', Validators.required],
      place: ['', Validators.required],
      fuel: [''],
      door: ['', Validators.required],
    });
  }

  onSaveCarModel() {
    const price = this.carForm.get('price').value;
    const quantity = this.carForm.get('quantity').value;
    const fuel = this.carForm.get('fuel').value;
    const place = this.carForm.get('place').value;
    const door = this.carForm.get('door').value;
    const carBrand = this.carForm.get('carBrand').value;
    const carModel = this.carForm.get('carModel').value;

    const car = new Car(
      price,
      quantity,
      carBrand,
      carModel,
      place,
      door,
      fuel,
      this.dformat
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
  openDialog(car) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '1098px';
    dialogConfig.data = {
      price: car.data().price,
      quantity: car.data().quantity,
      carBrand: car.data().carBrand,
      carModel: car.data().carModel,
      place: car.data().place,
      door: car.data().door,
      fuel: car.data().fuel,
    };

    const dialogRef = this.dialog.open(CarUpdateDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data != undefined) {
        console.log('Dialog output:', data);
        const carUpdate = new Car(
          data.price,
          data.quantity,
          data.carBrand,
          data.carModel,
          data.place,
          data.door,
          data.fuel,
          this.dformat
        );
        carUpdate.main_photo = car.data().main_photo;
        carUpdate.photos = car.data().photos;
        console.log(carUpdate);
        this.onUpdateCar(car.id, carUpdate);
      }
    });
  }
  onUpdateCar(carKey, carUpdate) {
    this.carService.updateCar(carKey, carUpdate);
  }
  openImageDialog(photoUrl, photos, carKey) {
    var status = false;
    if (photos != false) {
      status = true;
    }
    console.log(status);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {
      photoUrl: photoUrl,
      status: status,
    };
    const dialogRef = this.dialog.open(
      OpenCarImageDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.photos = photos;
        console.log('haahya :' + data);
        const index = this.photos.indexOf(data);
        if (index > -1) {
          this.photos.splice(index, 1);
          console.log(this.photos);
          this.carService.deleteCarPhoto(carKey, this.photos);
        }
      }
    });
  }
  getCars() {
    this.carService.getCarsSnapshot().subscribe((cars) => {
      this.cars = cars;
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
  onDeleteCar(car) {
    this.carService.deleteCar(car);
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
