import { Component, OnInit } from '@angular/core';
import { WorkerService } from 'src/app/services/worker.service';
import { CarService } from 'src/app/services/car.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Car } from 'src/app/models/Car.model';
import { ReviewService } from 'src/app/services/review.service';
import { element } from 'protractor';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cars: any[] = [];
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
    this.carService.getAllCars().subscribe((cars) => {
      this.cars = cars;
      this.spinner.hide();
    });
  }
}
