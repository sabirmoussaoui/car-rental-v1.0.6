import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CarBrandService } from 'src/app/services/car-brand.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarModel } from 'src/app/models/CarModel.model';
import { CarBrand } from 'src/app/models/CarBrand.model';
import { CarModelService } from 'src/app/services/car-model.service';
import { CarService } from 'src/app/services/car.service';
interface SelectModel {
  value: CarModel;
  viewValue: string;
}
interface SelectBrand {
  value: CarBrand;
  viewValue: string;
}
@Component({
  selector: 'app-car-photos-dialog',
  templateUrl: './car-photos-dialog.component.html',
  styleUrls: ['./car-photos-dialog.component.scss'],
})
export class CarPhotosDialogComponent implements OnInit {
  avatars: Array<any> = new Array<any>();
  carBrands: SelectBrand[] = [];
  carModels: SelectModel[] = [];
  carBrand: CarBrand;
  carModel: CarModel;
  photoForm: FormGroup;
  photoLimit: number = 6;
  constructor(
    private carModelService: CarModelService,
    private fb: FormBuilder,
    private carBrandService: CarBrandService,
    private carService: CarService,
    public dialogRef: MatDialogRef<CarPhotosDialogComponent>
  ) {}

  ngOnInit(): void {
    this.initform();
    this.getCarBrands();
  }
  initform() {
    this.photoForm = this.fb.group({
      carBrand: [this.carBrand, Validators.required],
      carModel: [this.carModel, Validators.required],
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
    const carBrand = this.photoForm.get('carBrand').value;
    this.getCarModels(carBrand.carBrandKey);
  }

  modelSelected() {
    this.carModel = this.photoForm.get('carModel').value;
    this.getPhotos(this.carModel.carModelKey, this.photoLimit);
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
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    } else {
      return value;
    }
  }
  rangeChange(event) {
    this.photoLimit = event.value;
    console.log(this.photoLimit);
    this.getPhotos(this.carModel.carModelKey, this.photoLimit);
  }
  getPhotos(carModelKey, photoLimit) {
    this.carService
      .findPhotosByCarModel(carModelKey, this.photoLimit)
      .subscribe((data) => {
        this.avatars = data;
      });
  }
  save(avatar) {
    this.dialogRef.close(avatar);
  }

  close() {
    this.dialogRef.close();
  }
}
