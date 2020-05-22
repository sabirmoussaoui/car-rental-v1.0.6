import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/Car.model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { WorkerService } from 'src/app/services/worker.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as firebase from 'firebase';
import { Worker } from 'src/app/models/Worker.model';
import { CarDetailDialogComponent } from 'src/app/client/my-rentals/car-detail-dialog/car-detail-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/models/Client.model';
import { CarRequestService } from 'src/app/services/car-requests.service';
import { ClientService } from 'src/app/services/client.service';
import { CarRequest } from 'src/app/models/CarRequest.model';
import { element } from 'protractor';
import { format } from 'path';
import moment from 'moment';
interface NgbTime {
  hour: number;
  minute: number;
  second: number;
}

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss'],
})
export class MyRequestsComponent implements OnInit {
  worker: Worker;
  car_requests: CarRequest[] = [];
  pick_up_time: NgbTime;
  drop_off_time: NgbTime;
  constructor(
    private carRequestService: CarRequestService,
    private dialog: MatDialog,
    private workerService: WorkerService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((client) => {
      if (client) {
        this.getCurrentWorker(client.uid);
      }
    });
    this.spinner.show();
  }

  getCurrentWorker(workerKey) {
    this.workerService.getWorker(workerKey).subscribe((data) => {
      this.worker = data as Worker;
      this.getCarRequests(this.worker.workerKey);
    });
  }

  openDialog(car_request: CarRequest) {}
  onUpdateCarRequest(carRequest: CarRequest) {
    this.carRequestService.updateCarRequest(carRequest);
  }

  showDetails(carRequest: CarRequest) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '1000px';
    dialogConfig.maxHeight = '90vh';
    dialogConfig.data = {
      carRequest: carRequest,
    };
    const dialogRef = this.dialog.open(CarDetailDialogComponent, dialogConfig);
  }
  getdateFormat(date) {
    // console.log(moment(date).format('YYYY-MM-DD hh:mm:ss'));
    // var s = new Date(date).toLocaleDateString('en-US');
    // console.log(s);
    // return s;
  }
  getCarRequests(workerKey) {
    this.carRequestService
      .getCarRequestByWorker(workerKey)
      .subscribe((car_requests) => {
        this.car_requests = car_requests;
        this.spinner.hide();
      });
    console.log(this.car_requests);
  }
  acceptRequest(carRequestKey) {
    this.carRequestService.acceptRequest(carRequestKey).then((cpm) => {
      console.log('request accepted');
    });
  }
  removeRequest(carRequestKey) {
    this.carRequestService.removeRequest(carRequestKey).then((cpm) => {
      console.log('request removed');
    });
  }
  blockRequest(carRequestKey, status) {
    this.carRequestService.blockRequest(carRequestKey, status).then((cpm) => {
      console.log('request :' + status);
    });
  }
}
