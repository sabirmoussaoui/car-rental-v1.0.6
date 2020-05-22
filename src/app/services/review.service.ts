import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Review } from '../models/Review.model';
import { Client } from '../models/Client.model';
import { Car } from '../models/Car.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(public db: AngularFirestore) {}

  addReview(review: Review) {
    var uid = this.db
      .collection('cars')
      .doc(review.carKey)
      .collection('reviews')
      .ref.doc().id;
    return this.db
      .collection('cars')
      .doc(review.carKey)
      .collection('reviews')
      .doc(uid)
      .set({
        reviewKey: uid,
        carKey: review.carKey,
        client: {
          clientKey: review.client.clientKey,
          firstname: review.client.firstname,
          lastname: review.client.lastname,
          phone: review.client.phone,
          city: {
            name: review.client.city.name,
            cityKey: review.client.city.cityKey,
          },
          email: review.client.email,
          profil: review.client.profil,
        },
        stars: review.stars,
        comment: review.comment,
        createdAt: review.createdAt,
      });
  }
  getReviews(carKey) {
    return this.db
      .collection<Car>('cars')
      .doc(carKey)
      .collection<Review>('reviews')
      .valueChanges();
  }
  deleteReview(review: Review) {
    return this.db
      .collection('cars')
      .doc(review.carKey)
      .collection('reviews')
      .doc(review.reviewKey)
      .delete();
  }
}
