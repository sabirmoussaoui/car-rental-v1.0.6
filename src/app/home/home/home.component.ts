import { Component, OnInit } from '@angular/core';
import { WorkerService } from 'src/app/services/worker.service';
import { CarService } from 'src/app/services/car.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Car } from 'src/app/models/Car.model';
import { ReviewService } from 'src/app/services/review.service';
import { element } from 'protractor';
import {
  CitySelect,
  SelectBrand,
  SelectModel,
  Body_Style,
} from 'src/app/interfaces/Select';
import { CityService } from 'src/app/services/city.service';
import { City } from 'src/app/models/City.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CarBrandService } from 'src/app/services/car-brand.service';
import { CarBrand } from 'src/app/models/CarBrand.model';
import { CarModelService } from 'src/app/services/car-model.service';
import { CarModel } from 'src/app/models/CarModel.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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
  cars: Car[] = [];
  cities: CitySelect[] = [];
  carBrands: SelectBrand[] = [];
  carModels: SelectModel[] = [];
  brand_filtered_items: Car[] = [];
  city_filtered_items: Car[] = [];
  model_filtered_items: Car[] = [];
  body_filtered_items: Car[] = [];
  body_style_checked: string;
  p: number = 1;
  searchForm: FormGroup;
  constructor(
    private cityService: CityService,
    private carService: CarService,
    private carBrandService: CarBrandService,
    private carModelService: CarModelService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getCars();
    this.getCities();
    this.getCarBrands();

    this.searchForm = this.fb.group({
      city: [],
      carBrand: [],
      carModel: [],
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
    const city = this.searchForm.get('city').value;
    this.carService.findCarsByCity(city).subscribe((result) => {
      this.city_filtered_items = result;
      this.cars = this.combineLists(result, this.city_filtered_items);
    });
  }
  getCars() {
    this.carService.getAllCars().subscribe((cars) => {
      this.cars = cars;
      this.spinner.hide();
    });
  }
  brandSelected() {
    const carBrand = this.searchForm.get('carBrand').value as CarBrand;
    this.carService
      .findCarsByBrand(carBrand.carBrandKey)
      .subscribe((result) => {
        this.brand_filtered_items = result;
        this.cars = this.combineLists(result, this.brand_filtered_items);
      });
    this.getCarModels(carBrand.carBrandKey);
  }
  modelSelected() {
    const carModel = this.searchForm.get('carModel').value as CarModel;
    this.carService
      .findCarsByModel(carModel.carModelKey)
      .subscribe((result) => {
        this.model_filtered_items = result;
        this.cars = this.combineLists(result, this.model_filtered_items);
      });
  }
  onCheckBodyStyle(body_style) {
    this.body_style_checked = body_style;
    this.carService
      .findCarsByBodyStyle(this.body_style_checked)
      .subscribe((result) => {
        this.body_filtered_items = result;
        this.cars = this.combineLists(result, this.body_filtered_items);
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
  combineLists(a: Car[], b: Car[]) {
    let result = [];

    a.filter((x) => {
      return b.filter((x2) => {
        if (x2.carKey == x.carKey) {
          result.push(x2);
        }
      });
    });
    return result;
  }
}
