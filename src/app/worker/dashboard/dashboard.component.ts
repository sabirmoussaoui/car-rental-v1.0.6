import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Worker } from '../../models/Worker.model';
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from '../../variables/charts';
import { WorkerService } from 'src/app/services/worker.service';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/Car.model';
import * as firebase from 'firebase';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  worker: Worker;
  cars: Car[] = [];
  countCar: number;
  //stat

  constructor(
    private workerService: WorkerService,
    private carService: CarService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    firebase.auth().onAuthStateChanged((worker) => {
      if (worker) {
        this.getCurrentWorker(worker.uid);
      }
    });
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40],
    ];
    this.data = this.datasets[0];

    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());

    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data,
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
      type: 'line',
      options: chartExample1.options,
      data: chartExample1.data,
    });
  }
  getCurrentWorker(workerKey) {
    this.workerService.getWorkerSnapShot(workerKey).subscribe((data) => {
      this.worker = data.payload.data() as Worker;
      this.worker.workerKey = data.payload.id;
      this.getCars(this.worker.workerKey);
    });
  }
  getCars(workerKey) {
    this.carService.getCarsSnapshot(workerKey).subscribe((cars: any) => {
      cars.forEach((element) => {
        this.cars.push(element.payload.doc.data() as Car);
      });
      this.countCar = this.cars.length;
      this.spinner.hide();
    });
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
}
