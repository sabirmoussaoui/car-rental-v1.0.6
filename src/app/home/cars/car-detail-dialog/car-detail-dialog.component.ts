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
import { Review } from 'src/app/models/Review.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-car-detail-dialog',
  templateUrl: './car-detail-dialog.component.html',
  styleUrls: ['./car-detail-dialog.component.scss'],
})
export class CarDetailDialogComponent implements OnInit {
  car: Car;
  allPhotos: any[] = [];
  reviews: Review[] = [];

  constructor(
    private spn: NgxSpinnerService,
    private reviewService: ReviewService,
    private carBrandService: CarBrandService,
    public dialogRef: MatDialogRef<CarDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) { car }
  ) {
    this.car = car;
    this.allPhotos = this.car.photos;
    this.allPhotos.push(this.car.main_photo);
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
    this.getReviews(this.car.carKey);
  }
  getReviews(carKey) {
    this.spn.show();
    this.reviewService.getReviews(carKey).subscribe((reviews) => {
      this.reviews = reviews;
      this.spn.hide();
    });
    console.log(this.reviews);
  }
  close() {
    this.dialogRef.close();
  }
}
