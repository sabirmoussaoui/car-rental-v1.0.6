import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { WorkerService } from 'src/app/services/worker.service';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/Car.model';
import { Worker } from 'src/app/models/Worker.model';

@Component({
  selector: 'app-single-worker',
  templateUrl: './single-worker.component.html',
  styleUrls: ['./single-worker.component.scss'],
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
export class SingleWorkerComponent implements OnInit {
  worker: Worker;
  cars: Car[] = [];
  currentrate: number = 5;
  p: number = 1;
  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private workerService: WorkerService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    const workerKey = this.route.snapshot.params['id'];
    this.getWorker(workerKey);
  }
  getWorker(workerKey) {
    this.workerService.getWorker(workerKey).subscribe((data) => {
      console.log(data);
      return this.getCarByWorker(data as Worker);
    });
  }
  getCarByWorker(worker: Worker) {
    this.carService.getCarsByWorker(worker.workerKey).subscribe((cars) => {
      this.cars = cars;
      this.worker = worker;
      this.worker.nbCars = cars.length;
      this.spinner.hide();
    });
  }
}
