import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Car } from 'src/app/models/Car.model';
@Component({
  selector: 'app-top-rated-cars',
  templateUrl: './top-rated-cars.component.html',
  styleUrls: ['./top-rated-cars.component.scss'],
})
export class TopRatedCarsComponent implements OnInit {
  cars: Car[] = [];
  p: number = 1;
  constructor(
    private carService: CarService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getCars();
  }

  getCars() {
    this.carService.findCarsByTopRating().subscribe((cars) => {
      this.cars = cars;
      this.spinner.hide();
    });
  }
}
