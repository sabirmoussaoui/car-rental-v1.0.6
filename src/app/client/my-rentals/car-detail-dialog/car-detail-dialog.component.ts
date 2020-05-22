import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarBrandService } from 'src/app/services/car-brand.service';
import { CarModel } from 'src/app/models/CarModel.model';
import { CarBrand } from 'src/app/models/CarBrand.model';
import { Car } from 'src/app/models/Car.model';
import {
  NgbSlideEvent,
  NgbSlideEventSource,
  NgbCarousel,
} from '@ng-bootstrap/ng-bootstrap';
import { CarRequest } from 'src/app/models/CarRequest.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/app/models/Review.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarService } from 'src/app/services/car.service';
export interface Rating {
  weight: number;
  count: number;
}
@Component({
  selector: 'app-car-detail-dialog',
  templateUrl: './car-detail-dialog.component.html',
  styleUrls: ['./car-detail-dialog.component.scss'],
  styles: [
    `
      .star {
        font-size: 1.5rem;
        color: #b0c4de;
      }
      .filled {
        color: #1e90ff;
      }
      .bad {
        color: #deb0b0;
      }
      .filled.bad {
        color: #ff1e1e;
      }
    `,
  ],
})
export class CarDetailDialogComponent implements OnInit {
  carRequest: CarRequest;
  allPhotos: any[] = [];
  currentRate = 6;
  reviewForm: FormGroup;
  reviews: Review[] = [];
  ratings: Rating[] = [];
  car: Car;
  constructor(
    private carService: CarService,
    private _snackBar: MatSnackBar,
    private reviewService: ReviewService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CarDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) { carRequest }
  ) {
    this.carRequest = carRequest;
    this.getReviews(this.carRequest.car.carKey);

    this.allPhotos = this.carRequest.car.photos
      ? this.carRequest.car.photos
      : [];
    this.allPhotos.push(this.carRequest.car.main_photo);
  }
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }
  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      comment: [''],
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  onSaveReview() {
    const comment = this.reviewForm.get('comment').value;
    this.reviewService
      .addReview(
        new Review(
          this.carRequest.car.carKey,
          this.currentRate,
          comment,
          this.carRequest.client,
          new Date().toDateString()
        )
      )
      .then(() => {
        this.openSnackBar('review added with success', 'done');
        return this.updateRatings(this.carRequest.car.carKey);
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
  updateRatings(carKey) {
    this.reviews = [];
    this.ratings = [];
    this.reviewService.getReviews(carKey).subscribe((reviews) => {
      console.log('=>' + reviews + '=>' + reviews.length);
      if (reviews.length != 0) {
        this.reviews = reviews;
        const stars = [];
        for (var i = 1; i <= 5; i++) {
          stars[i] = this.reviews.filter((review) => review.stars === i).length;
        }
        for (var i = 1; i <= 5; i++) {
          this.ratings.push({ weight: i, count: stars[i] });
        }
        this.carService.updateCarRating(
          carKey,
          this.calcAverageRating(this.ratings)
        );
      }
    });
  }
  getReviews(carKey) {
    this.reviewService.getReviews(carKey).subscribe((reviews) => {
      this.reviews = reviews;
    });
  }
  close() {
    this.dialogRef.close();
  }
}
