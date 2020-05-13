import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/Car.model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { WorkerService } from 'src/app/services/worker.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as firebase from 'firebase';
import { Worker } from 'src/app/models/Worker.model';
import { CarDetailDialogComponent } from 'src/app/worker/cars/car-detail-dialog/car-detail-dialog.component';
import { OpenCarImageDialogComponent } from 'src/app/worker/cars/open-car-image-dialog/open-car-image-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/models/Client.model';
import { CarRequestService } from 'src/app/services/car-requests.service';
import { ClientService } from 'src/app/services/client.service';
import { CarRequest } from 'src/app/models/CarRequest.model';
import { element } from 'protractor';
import { format } from 'path';
import moment from 'moment';

@Component({
  selector: 'app-my-rentals',
  templateUrl: './my-rentals.component.html',
  styleUrls: ['./my-rentals.component.scss'],
})
export class MyRentalsComponent implements OnInit {
  public photos: any[] = [];
  client: Client;
  clientKey: string;
  car_requests: CarRequest[] = [];
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
    this.clientService.getClient(clientKey).subscribe((data) => {
      this.client = data.data() as Client;
      this.client.clientKey = data.id;
      this.getCarRequests(this.client.clientKey);
    });
  }

  openDialog(car: Car, carKey) {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = '1098px';
    // dialogConfig.data = {
    //   car: car,
    // };
    // const dialogRef = this.dialog.open(CarUpdateDialogComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe((carUpdate: Car) => {
    //   if (carUpdate != undefined) {
    //     console.log('Dialog output:', carUpdate);
    //     carUpdate.updated_at = new Date();
    //     console.log(carUpdate);
    //     this.onUpdateCar(carKey, carUpdate);
    //   }
    // });
  }
  // onUpdateCar(carKey, carUpdate) {
  //   this.carService.updateCar(carKey, carUpdate);
  // }
  openImageDialog(photoUrl) {
    console.log(status);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
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
  showDetails(car: Car) {
    console.log(status);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '1000px';
    dialogConfig.maxHeight = '90vh';
    dialogConfig.data = {
      car: car,
    };
    const dialogRef = this.dialog.open(CarDetailDialogComponent, dialogConfig);
  }
  getdateFormat(date) {
    console.log(moment(date).format('YYYY-MM-DD hh:mm:ss'));

    var s = new Date(date).toLocaleDateString('en-US');
    console.log(s);
    return s;
  }
  getCarRequests(clientKey) {
    this.carRequestService
      .getCarRequests(clientKey)
      .subscribe((car_requests) => {
        car_requests.forEach((element) => {
          console.log(element.data());
          // this.car_requests.push(element as CarRequest);
        });
        this.spinner.hide();
      });
    console.log(this.car_requests);
  }

  // onDeleteCar(car) {
  //   this.carService.deleteCar(car);
  // }
}
