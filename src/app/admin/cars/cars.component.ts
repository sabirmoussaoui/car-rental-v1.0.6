import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/Car.model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { OpenCarImageDialogComponent } from './open-car-image-dialog/open-car-image-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/app/models/Review.model';
import { CarDetailDialogComponent } from 'src/app/home/cars/car-detail-dialog/car-detail-dialog.component';
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent implements OnInit {
  private photos: any[] = [];
  cars: Car[] = [];
  constructor(
    private carService: CarService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getCars();
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
  getCars() {
    this.carService.getAllCars().subscribe((cars) => {
      this.cars = cars;
      this.spinner.hide();
    });
  }

  onDeleteCar(car) {
    this.carService.deleteCar(car);
  }
}
