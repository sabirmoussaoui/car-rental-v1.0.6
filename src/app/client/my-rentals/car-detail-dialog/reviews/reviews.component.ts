import { Component, OnInit, Input } from '@angular/core';
import { Review } from 'src/app/models/Review.model';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
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
export class ReviewsComponent implements OnInit {
  @Input() review: Review;
  @Input() clientKey: string;
  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {}

  onDeleteReview(review) {
    console.log(review);
    this.reviewService.deleteReview(review).then(
      () => console.log('delete with success'),
      (err) => console.log(err)
    );
  }
}
