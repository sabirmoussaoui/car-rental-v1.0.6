import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from '../../variables/charts';
import { CarRequestService } from 'src/app/services/car-requests.service';
import * as firebase from 'firebase';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/Client.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public datasets: any;
  public data: any;
  public salesChart;
  car_requests: any[] = [];
  client: Client;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  constructor(
    private carRequestService: CarRequestService,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    firebase.auth().onAuthStateChanged((client) => {
      if (client) {
        this.getCurrentClient(client.uid);
      }
    });

    var chartSales = document.getElementById('chart-sales');

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
  }
  getCurrentClient(clientKey) {
    this.clientService.getClient(clientKey).subscribe((client) => {
      this.client = client as Client;
      this.getCarRequestsByDate(this.client.clientKey);
      this.getCarRequestByClient(this.client.clientKey);
    });
  }
  getCarRequestsByDate(clientKey) {
    var labels: Array<any> = [];
    var data: Array<number> = [];
    this.carRequestService
      .getCarRequestByDateOfClient(clientKey)
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
  getCarRequestsByBrand(clientKey) {
    var labels: Array<any> = [];
    var data: Array<number> = [];
    this.carRequestService
      .getCarRequestByBrandOfClient(clientKey)
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
  getCarRequestByClient(clientKey) {
    var data: Array<number> = [];
    var accepted: number = 0;
    var blocked: number = 0;
    var in_progress: number = 0;
    this.carRequestService
      .getCarRequests(clientKey)
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
  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
}
