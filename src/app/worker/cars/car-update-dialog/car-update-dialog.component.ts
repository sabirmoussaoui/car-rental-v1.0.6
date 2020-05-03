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
  seat: number;
  door: number;
  fuel: string;
  car: Car;
  carBrands: SelectBrand[] = [];
  carModels: SelectModel[] = [];

  constructor(
    private carModelService: CarModelService,
    private carBrandService: CarBrandService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CarUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    {
      car,
      // price,
      // quantity,
      // carBrand,
      // carModel,
      // seat,
      // door,
      // fuel,
      // large_bag,
      // small_bag,
      // gearbox,
      // air_conditioning,
      // description,
      // car_class,
      // body_style,
    } // : Car
  ) {
    this.getCarBrands();
    // this.car.price = car.price;
    // this.car.quantity = car.quantity;
    // this.car.carBrand = car.carBrand;
    // this.car.carModel = car.carModel;
    // this.car.seat = car.seat;
    // this.car.door = car.door;
    // this.car.fuel = car.fuel;
    this.car = car;
  }

  ngOnInit() {
    this.initform();
  }
  initform() {
    this.carForm = this.fb.group({
      price: [this.car.price, Validators.required],
      quantity: [this.car.quantity, Validators.required],
      carBrand: [this.car.carBrand, Validators.required],
      carModel: [this.car.carModel, Validators.required],
      door: [this.car.door, Validators.required],
      fuel: [this.car.fuel, Validators.required],
      seat: [this.car.seat, Validators.required],
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
