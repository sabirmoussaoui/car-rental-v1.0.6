import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/Car.model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { OpenCarImageDialogComponent } from './open-car-image-dialog/open-car-image-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CarDetailDialogComponent } from 'src/app/admin/cars/car-detail-dialog/car-detail-dialog.component';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/app/models/Review.model';
export interface Rating {
  weight: number;
  count: number;
}
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent implements OnInit {
  public photos: any[] = [];
  cars: Array<any>;
  ratings: Rating[] = [];
  reviews: Review[] = [];
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

  calcAverageRating(ratings) {
    let totalWeight = 0;
    let totalReviews = 0;
    ratings.forEach((rating) => {
      const weightMultipliedByNumber = rating.weight * rating.count;
      totalWeight += weightMultipliedByNumber;
      totalReviews += rating.count;
    });

    const averageRating = totalWeight / totalReviews;

    return averageRating.toFixed(2);
  }
  updateRatings() {
    this.carService.getCars().subscribe((cars) => {
      cars.forEach((element) => {
        this.reviews = [];
        this.ratings = [];
        this.reviewService.getReviews(element.id).subscribe((reviews) => {
          console.log(element.id + '=>' + reviews + '=>' + reviews.length);

          if (reviews.length != 0) {
            reviews.forEach((e) => {
              this.reviews.push(e as Review);
            });
            const stars = [];
            for (var i = 1; i <= 5; i++) {
              stars[i] = this.reviews.filter(
                (review) => review.stars === i
              ).length;
            }
            for (var i = 1; i <= 5; i++) {
              this.ratings.push({ weight: i, count: stars[i] });
            }
            this.carService.updateCarRating(
              element.id,
              this.calcAverageRating(this.ratings)
            );
          }
        });
      });
    });
  }
  onDeleteCar(car) {
    this.carService.deleteCar(car);
  }
}
