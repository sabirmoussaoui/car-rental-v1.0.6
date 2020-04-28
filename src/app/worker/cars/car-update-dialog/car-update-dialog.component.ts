import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarModel } from 'src/app/models/CarModel.model';
import { CarBrandService } from 'src/app/services/car-brand.service';
import { Car } from 'src/app/models/Car.model';
import { CarBrand } from 'src/app/models/CarBrand.model';
import { CarModelService } from 'src/app/services/car-model.service';
interface SelectModel {
  value: CarModel;
  viewValue: string;
}
interface SelectBrand {
  value: CarBrand;
  viewValue: string;
}

@Component({
  selector: 'app-car-update-dialog',
  templateUrl: './car-update-dialog.component.html',
  styleUrls: ['./car-update-dialog.component.scss'],
})
export class CarUpdateDialogComponent implements OnInit {
  carForm: FormGroup;

  price: number;
  quantity: number;
  carBrand: CarBrand;
  carModel: CarModel;
  place: number;
  door: number;
  fuel: string;

  carBrands: SelectBrand[] = [];
  carModels: SelectModel[] = [];

  constructor(
    private carModelService: CarModelService,
    private carBrandService: CarBrandService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CarUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    { price, quantity, carBrand, carModel, place, door, fuel }: Car
  ) {
    this.getCarBrands();
    this.price = price;
    this.quantity = quantity;
    this.carBrand = carBrand;
    this.carModel = carModel;
    this.place = place;
    this.door = door;
    this.fuel = fuel;
  }

  ngOnInit() {
    this.initform();
  }
  initform() {
    this.carForm = this.fb.group({
      price: [this.price, Validators.required],
      quantity: [this.quantity, Validators.required],
      carBrand: [this.carBrand, Validators.required],
      carModel: [this.carModel, Validators.required],
      door: [this.door, Validators.required],
      fuel: [this.fuel, Validators.required],
      place: [this.place, Validators.required],
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

  save() {
    this.dialogRef.close(this.carForm.value);
  }

  close() {
    this.dialogRef.close();
  }
}
