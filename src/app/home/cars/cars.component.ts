import { Component, OnInit, Input } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Car } from 'src/app/models/Car.model';
import { CarDetailDialogComponent } from './car-detail-dialog/car-detail-dialog.component';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/app/models/Review.model';
import { MapsComponent } from 'src/app/maps/maps.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
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
export class CarsComponent implements OnInit {
  @Input() car: Car;
  reviews: Review[] = [];
  constructor(
    private dialog: MatDialog,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    console.log(this.car);
  }
  // getReviews(carKey){
  //   this.reviewService.getReviews(carKey).subscribe(
  //     reviews=>{
  //       this.reviews = reviews as Review
  //     }
  //       )
  // }
  getOriginPrice(price) {
    return Number(price) + 10;
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
  showMaps(car: Car) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '1000px';
    dialogConfig.maxHeight = '150vh';
    dialogConfig.data = {
      worker: car.worker,
      lat: car.worker.latitude,
      lng: car.worker.longitude,
    };
    const dialogRef = this.dialog.open(MapsComponent, dialogConfig);
  }
}
