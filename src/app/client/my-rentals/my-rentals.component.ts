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
import { CarRequestUpdateDialogComponent } from './car-request-update-dialog/car-request-update-dialog.component';
import { OpenCarImageDialogComponent } from './open-car-image-dialog/open-car-image-dialog.component';
import { GeneratePdfDialogComponent } from './generate-pdf-dialog/generate-pdf-dialog.component';
interface NgbTime {
  hour: number;
  minute: number;
  second: number;
}
@Component({
  selector: 'app-my-rentals',
  templateUrl: './my-rentals.component.html',
  styleUrls: ['./my-rentals.component.scss'],
})
export class MyRentalsComponent implements OnInit {
  client: Client;
  clientKey: string;
  car_requests: CarRequest[] = [];
  pick_up_time: NgbTime;
  drop_off_time: NgbTime;
  constructor(
    private carRequestService: CarRequestService,
    private dialog: MatDialog,
    private clientService: ClientService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((client) => {
      if (client) {
        this.getCurrentClient(client.uid);
      }
    });
    this.spinner.show();
  }

  getCurrentClient(clientKey) {
    this.clientService.getClient(clientKey).subscribe((client) => {
      this.client = client as Client;
      this.getCarRequests(this.client.clientKey);
    });
  }
  showPDF(carRequest: CarRequest) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '1000px';
    dialogConfig.maxHeight = '90vh';
    dialogConfig.data = {
      carRequest: carRequest,
    };
    const dialogRef = this.dialog.open(
      GeneratePdfDialogComponent,
      dialogConfig
    );
  }
  openDialog(car_request: CarRequest) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '1098px';
    dialogConfig.data = {
      carRequest: car_request,
    };
    const dialogRef = this.dialog.open(
      CarRequestUpdateDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((data) => {
      if (data != undefined) {
        car_request.updated_at = new Date();
        car_request.pick_up = moment(data.pick_up).format('YYYY-MM-DD');
        car_request.drop_off = moment(data.drop_off).format('YYYY-MM-DD');
        this.pick_up_time = data.pick_up_time as NgbTime;
        this.drop_off_time = data.drop_off_time as NgbTime;
        car_request.pick_up_time =
          this.pick_up_time.hour + ':' + this.pick_up_time.minute;
        car_request.drop_off_time =
          this.drop_off_time.hour + ':' + this.drop_off_time.minute;

        this.onUpdateCarRequest(car_request);
      }
    });
  }
  onUpdateCarRequest(carRequest: CarRequest) {
    this.carRequestService.updateCarRequest(carRequest);
  }
  openImageDialog(photoUrl) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {
      photoUrl: photoUrl,
    };
    const dialogRef = this.dialog.open(
      OpenCarImageDialogComponent,
      dialogConfig
    );
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
  getCarRequests(clientKey) {
    this.carRequestService
      .getCarRequests(clientKey)
      .subscribe((car_requests) => {
        this.car_requests = car_requests;
        this.spinner.hide();
      });
    console.log(this.car_requests);
  }

  // onDeleteCar(car) {
  //   this.carService.deleteCar(car);
  // }
}
