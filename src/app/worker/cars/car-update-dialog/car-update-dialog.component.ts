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
interface Body_Style {
  value: string;
  viewValue: string;
  avatar: string;
}
interface Car_Class {
  value: string;
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
  constructor(
    private carModelService: CarModelService,
    private carBrandService: CarBrandService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CarUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    { car }
  ) {
    this.getCarBrands();
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
      large_bag: [this.car.large_bag],
      small_bag: [this.car.small_bag],
      body_style: [this.car.body_style, Validators.required],
      air_conditioning: [this.car.air_conditioning],
      description: [this.car.description],
      car_class: [this.car.car_class, Validators.required],
      gearbox: [this.car.gearbox, Validators.required],
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
