import { Component, OnInit } from '@angular/core';
import { WorkerService } from 'src/app/services/worker.service';
import { CarService } from 'src/app/services/car.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Car } from 'src/app/models/Car.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  styles: [
    `
      .star {
        position: relative;
        display: inline-block;
        font-size: 3rem;
        color: #d3d3d3;
      }
      .full {
        color: red;
      }
      .half {
        position: absolute;
        display: inline-block;
        overflow: hidden;
        color: red;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  currentRate = 3.14;
  cars: Car[] = [];
  p: number = 1;
  constructor(
    private workerService: WorkerService,
    private carService: CarService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getCars();
  }
  getOriginPrice(price) {
    return Number(price) + 10;
  }
  getCars() {
    this.carService.getCars().subscribe((cars: any) => {
      cars.forEach((element) => {
        this.cars.push(element as Car);
      });
      this.spinner.hide();
    });
  }
}
