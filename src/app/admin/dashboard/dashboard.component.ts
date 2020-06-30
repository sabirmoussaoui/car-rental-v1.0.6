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
  public chart_car_request;
  public bar_chart_client;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  cars: Car[] = [];
  workers: Worker[] = [];
  visitor_total: number = 0;
  nbWorkers: number = 0;
  car_requests: any[] = [];
  car_visitors: CarVisitor[] = [];
  visitors: number[];
  profits: number = 0;
  nbClient: number = 0;
  public clients: Client[] = [];
  p: number = 1;
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
    //chart sale
    parseOptions(Chart, chartOptions());
    var chartSales = document.getElementById('chart-sales');
    this.salesChart = new Chart(chartSales, {
      type: 'line',
      options: chartExample1.options,
      data: {
        datasets: [
          {
            label: 'price total $',
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
            text: 'THE NUMBER OF CUSTOMERS BY CITY 2020',
          },
        },
      }
    );
    ///***********************************/
    this.getCarRequestsByDateOfAdmin();
    this.getCars();
    this.getVisitorByBrand();
    this.getWorkers();
    this.getQuantityChart();
    this.getProfits();
    this.getClients();
    this.getCarRequest();
    this.getClientsByCity();
    this.getCarRequestByWorker();
  }
  getWorkers() {
    this.workerService.getWorkers().subscribe((workers) => {
      this.workers = workers;
      this.nbWorkers = this.workers.length;
    });
  }
  getProfits() {
    this.carRequestService
      .getAllProfits()
      .subscribe((pr) => pr.forEach((e) => (this.profits = e.profits)));
  }
  getClients() {
    this.carRequestService.getAllClients().subscribe((data) => {
      data.forEach((client) => {
        this.clients.push(client.client as Client);
      });
      this.nbClient = this.clients.length;
    });
  }
  getCarRequestsByDateOfAdmin() {
    var labels: Array<any> = [];
    var data: Array<number> = [];
    this.carRequestService
      .getCarRequestByDateOfAdmin()
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
  getCarRequestsByBrandOfAdmin() {
    var labels: Array<any> = [];
    var data: Array<number> = [];
    this.carRequestService
      .getCarRequestByBrandOfAdmin()
      .subscribe((car_requests) => {
        this.car_requests = car_requests;
        this.car_requests.forEach((car_request) => {
          labels.push(car_request.brand);
          data.push(car_request.price_total);
        });
        this.salesChart.data.datasets[0].data = data;
        this.salesChart.data.labels = labels;
        this.salesChart.update();
      });
  }
  getCarRequestByWorker() {
    var labels: Array<any> = [];
    var data: Array<number> = [];
    this.carRequestService
      .getCarRequestByWorkerOfAdmin()
      .subscribe((car_requests) => {
        car_requests.forEach((car_request) => {
          labels.push(car_request.car.worker.name);
          data.push(car_request.price_total);
        });
        console.log(car_requests);
        new Chart(document.getElementById('polar-chart'), {
          type: 'polarArea',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Profits $',
                backgroundColor: [
                  '#3e95cd',
                  '#8e5ea2',
                  '#3cba9f',
                  '#e8c3b9',
                  '#c45850',
                ],
                data: data,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Profits by agencies (dollars) in 2020',
            },
          },
        });
      });
  }
  getCarRequest() {
    var data: Array<number> = [];
    var accepted: number = 0;
    var blocked: number = 0;
    var in_progress: number = 0;
    this.carRequestService.getAllCarRequests().subscribe((car_requests) => {
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
  getClientsByCity() {
    var labels: Array<any> = [];
    var data: Array<number> = [];
    this.cityService.getCities().subscribe((cities) => {
      cities.forEach((city) => {
        this.clientService
          .getClientsByCities(city.data().name)
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
  getCars() {
    this.carService.getCars().subscribe((cars) => {
      this.cars = cars;
      this.getPercentageVisitors(this.cars);
      this.spinner.hide();
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
  getQuantityChart() {
    var labels: Array<any> = [];
    var data: Array<number> = [];
    this.carService.getQuantityByBrand().subscribe((cars) => {
      cars.forEach((car) => {
        labels.push(car.carBrand.name);
        data.push(car.quantity);
      });
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
    });
  }
  getVisitorByBrand() {
    var labels: Array<any> = [];
    var data: Array<number> = [];
    this.carService.getVisitorByBrandOfAdmin().subscribe((cars) => {
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
