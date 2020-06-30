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
import { CarRequestService } from 'src/app/services/car-requests.service';
import { CarRequest } from 'src/app/models/CarRequest.model';
import { Client } from 'src/app/models/Client.model';
import { CityService } from 'src/app/services/city.service';
import { ClientService } from 'src/app/services/client.service';
interface CarVisitor {
  car: Car;
  percentage_visitor: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public bar_chart_client;
  worker: Worker;
  cars: Car[] = [];
  visitor_total: number = 0;
  nbCar: number = 0;
  car_requests: any[] = [];
  car_visitors: CarVisitor[] = [];
  visitors: number[];
  profits: number = 0;
  nbClient: number = 0;
  p: number = 1;
  public clients: Client[] = [];

  //stat

  constructor(
    private workerService: WorkerService,
    private carService: CarService,
    private spinner: NgxSpinnerService,
    private carRequestService: CarRequestService,
    private cityService: CityService,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.spinner.show();
    firebase.auth().onAuthStateChanged((worker) => {
      if (worker) {
        this.getCurrentWorker(worker.uid);
      }
    });
    parseOptions(Chart, chartOptions());
    var chartSales = document.getElementById('chart-sales');
    this.salesChart = new Chart(chartSales, {
      type: 'line',
      options: chartExample1.options,
      data: {
        datasets: [
          {
            label: 'price total',
          },
        ],
      },
    });
    this.bar_chart_client = new Chart(
      document.getElementById('bar-chart-client'),
      {
        type: 'bar',
        data: {
          datasets: [
            {
              label: 'clients',
              backgroundColor: [
                '#3e95cd',
                '#8e5ea2',
                '#3cba9f',
                '#e8c3b9',
                '#c45850',
              ],
            },
          ],
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'client by cities in 2020',
          },
        },
      }
    );
  }
  getProfits(workerKey) {
    this.carRequestService
      .getProfits(workerKey)
      .subscribe((pr) => pr.forEach((e) => (this.profits = e.profits)));
  }
  getClients(workerKey) {
    this.carRequestService.getClientsByWorker(workerKey).subscribe((data) => {
      data.forEach((client) => {
        this.clients.push(client.client as Client);
      });
      this.nbClient = this.clients.length;
    });
  }
  getCarRequestsByDate(workerKey) {
    var labels: Array<any> = [];
    var data: Array<number> = [];
    this.carRequestService
      .getCarRequestByDate(workerKey)
      .subscribe((car_requests) => {
        this.car_requests = car_requests;
        this.car_requests.forEach((car_request) => {
          labels.push(car_request.created_at);
          data.push(car_request.price_total);
        });
        labels.sort(function (a, b) {
          return new Date(a).getTime() - new Date(b).getTime();
        });
        this.salesChart.data.datasets[0].data = data;
        this.salesChart.data.labels = labels;
        this.salesChart.update();
      });
  }
  getCarRequestsByBrand(workerKey) {
    var labels: Array<any> = [];
    var data: Array<number> = [];
    this.carRequestService
      .getCarRequestByBrand(workerKey)
      .subscribe((car_requests) => {
        this.car_requests = car_requests;
        this.car_requests.forEach((car_request) => {
          console.log(car_request);
          labels.push(car_request.brand);
          data.push(car_request.price_total);
        });
        this.salesChart.data.datasets[0].data = data;
        this.salesChart.data.labels = labels;
        this.salesChart.update();
      });
  }
  getCurrentWorker(workerKey) {
    this.workerService.getWorkerSnapShot(workerKey).subscribe((data) => {
      this.worker = data.payload.data() as Worker;
      this.worker.workerKey = data.payload.id;
      this.getCars(this.worker.workerKey);
      this.getCarRequestsByDate(this.worker.workerKey);
      this.getClients(this.worker.workerKey);
      this.getProfits(this.worker.workerKey);
      this.getVisitorByBrand(this.worker.workerKey);
      this.getCarRequestByWorker(this.worker.workerKey);
      this.getClientsByCity(this.worker.workerKey);
    });
  }
  getCars(workerKey) {
    this.carService.getCarsByWorker(workerKey).subscribe((cars) => {
      this.cars = cars;
      this.storageChart(this.cars);
      this.getPercentageVisitors(this.cars);
      var quantity: number = 0;
      this.cars.forEach((car) => {
        quantity += car.quantity;
      });
      this.nbCar = quantity;
      this.spinner.hide();
    });
  }
  getClientsByCity(workerKey) {
    var labels: Array<any> = [];
    var data: Array<number> = [];
    this.cityService.getCities().subscribe((cities) => {
      cities.forEach((city) => {
        this.carRequestService
          .getClientsByCityOfWorker(workerKey, city.data().name)
          .subscribe((clients) => {
            labels.push(city.data().name);
            data.push(clients.length);
            this.bar_chart_client.data.datasets[0].data = data;
            this.bar_chart_client.data.labels = labels;
            this.bar_chart_client.update();
          });
      });
    });
  }
  getPercentageVisitors(cars: Car[]) {
    var percentage_visitor: number;
    cars.forEach((car) => {
      this.visitor_total += car.visitor;
    });
    cars.forEach((car) => {
      if (this.visitor_total != 0) {
        percentage_visitor = Math.round(
          (car.visitor * 100) / this.visitor_total
        );
      } else {
        percentage_visitor = 0;
      }
      this.car_visitors.push({
        car: car as Car,
        percentage_visitor: percentage_visitor,
      });
    });
  }
  storageChart(cars: Car[]) {
    var labels: Array<any> = [];
    var data: Array<number> = [];
    cars.forEach((car) => {
      labels.push(car.carBrand.name + ' ' + car.carModel.name);
      data.push(car.quantity);
    });
    console.log(data);

    var chartOrders = document.getElementById('chart-orders');
    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Sales',
            data: data,
          },
        ],
      },
    });
  }
  getCarRequestByWorker(workerKey) {
    var data: Array<number> = [];
    var accepted: number = 0;
    var blocked: number = 0;
    var in_progress: number = 0;
    this.carRequestService
      .getCarRequestByWorker(workerKey)
      .subscribe((car_requests) => {
        car_requests.forEach((e) => {
          if (e.accepted === true && e.blocked === false) {
            accepted += e.price_total;
          } else if (e.blocked === true) {
            blocked += e.price_total;
          } else {
            in_progress += e.price_total;
          }
        });
        data.push(accepted);
        data.push(in_progress);
        data.push(blocked);
        var bar_chart_horizontal = document.getElementById(
          'bar-chart-horizontal'
        );
        new Chart(bar_chart_horizontal, {
          type: 'horizontalBar',
          data: {
            labels: ['Cofirmed', 'In progress', 'blocked'],
            datasets: [
              {
                label: 'Requests (dollars) $',
                backgroundColor: ['#2dce89', '#fb6340', '#f5365c'],
                data: data,
              },
            ],
          },
          options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Car Request Statuses (dollars)',
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    callback: function (value) {
                      if (!(value % 10)) {
                        return '$' + value;
                      }
                    },
                  },
                },
              ],
            },
          },
        });
      });
  }
  getVisitorByBrand(workerKey) {
    var labels: Array<any> = [];
    var data: Array<number> = [];
    this.carService.getVisitorByBrand(workerKey).subscribe((cars) => {
      cars.forEach((car) => {
        labels.push(car.carBrand.name);
        data.push(car.visitors);
      });
      this.setPieChart(data, labels);
    });
  }
  setPieChart(data, labels) {
    var pieChartHTML = document.getElementById('doughnutChart');
    var pieChart = new Chart(pieChartHTML, {
      type: 'pie',
      data: {
        labels: labels,
        options: {
          animation: {
            animateScale: true,
          },
        },
        datasets: [
          {
            backgroundColor: [
              '#5603ad',
              '#f5365c',
              '#11cdef',
              '#ffd600',
              '#2dce89',
              '#e74c3c',
              '#34495e',
            ],
            data: data,
          },
        ],
      },
    });
    pieChart.update();
  }
  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
}
