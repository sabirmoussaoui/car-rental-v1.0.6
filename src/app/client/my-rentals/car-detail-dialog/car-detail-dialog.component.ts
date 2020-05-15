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

@Component({
  selector: 'app-car-detail-dialog',
  templateUrl: './car-detail-dialog.component.html',
  styleUrls: ['./car-detail-dialog.component.scss'],
  styles: [
    `
      .star {
        font-size: 2rem;
        color: #deb0b0;
      }
      .filled {
        color: #ff1e1e;
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
  constructor(
    private fb: FormBuilder,
    private reviewService: ReviewService,
    public dialogRef: MatDialogRef<CarDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) { carRequest }
  ) {
    this.carRequest = carRequest;
    this.allPhotos = this.carRequest.car.photos;
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
  onSaveReview() {
    const comment = this.reviewForm.get('comment').value;
    this.reviewService.addReview(
      new Review(
        this.carRequest.car.carKey,
        this.currentRate,
        comment,
        this.carRequest.client,
        new Date().toDateString()
      )
    );
    // this.dialogRef.close(this.currentRate,this.reviewForm.value);
  }
  close() {
    this.dialogRef.close();
  }
}
