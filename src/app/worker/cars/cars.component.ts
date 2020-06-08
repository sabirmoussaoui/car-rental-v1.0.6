import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/Car.model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { OpenCarImageDialogComponent } from './open-car-image-dialog/open-car-image-dialog.component';
import { CarUpdateDialogComponent } from './car-update-dialog/car-update-dialog.component';
import { WorkerService } from 'src/app/services/worker.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as firebase from 'firebase';
import { Worker } from 'src/app/models/Worker.model';
import { CarDetailDialogComponent } from 'src/app/worker/cars/car-detail-dialog/car-detail-dialog.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent implements OnInit {
  public photos: any[] = [];
  worker: Worker;
  workerKey: string;
  cars: Array<any>;

  constructor(
    private carService: CarService,
    private dialog: MatDialog,
    private workerService: WorkerService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((worker) => {
      if (worker) {
        this.getCurrentWorker(worker.uid);
      }
    });
    this.spinner.show();
  }

  getCurrentWorker(workerKey) {
    this.workerService.getWorkerSnapShot(workerKey).subscribe((data) => {
      this.worker = data.payload.data() as Worker;
      this.worker.workerKey = data.payload.id;
      this.getCars(this.worker.workerKey);
    });
  }

  openDialog(car: Car, carKey) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '1098px';
    dialogConfig.data = {
      car: car,
    };

    const dialogRef = this.dialog.open(CarUpdateDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((carUpdate: Car) => {
      if (carUpdate != undefined) {
        console.log('Dialog output:', carUpdate);
        carUpdate.updated_at = new Date();
        console.log(carUpdate);
        this.onUpdateCar(carKey, carUpdate);
      }
    });
  }
  onUpdateCar(carKey, carUpdate) {
    this.carService.updateCar(carKey, carUpdate);
  }
  openImageDialog(photoUrl, photos, carKey) {
    var status = false;
    if (photos != false) {
      status = true;
    }
    console.log(status);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {
      photoUrl: photoUrl,
      status: status,
    };
    const dialogRef = this.dialog.open(
      OpenCarImageDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.photos = photos;
        console.log('haahya :' + data);
        const index = this.photos.indexOf(data);
        if (index > -1) {
          this.photos.splice(index, 1);
          console.log(this.photos);
          this.carService.deleteCarPhoto(carKey, this.photos);
        }
      }
    });
  }
  showDetails(car: Car) {
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
  getCars(workerKey) {
    this.carService.getCarsSnapshot(workerKey).subscribe((cars) => {
      this.cars = cars;
      this.spinner.hide();
    });
  }

  onDeleteCar(carKey) {
    this.carService.deleteCar(carKey);
  }
}
