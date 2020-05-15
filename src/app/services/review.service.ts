import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Review } from '../models/Review.model';
import { Client } from '../models/Client.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(public db: AngularFirestore) {}

  addReview(review: Review) {
    console.log(review);

    return this.db
      .collection('cars')
      .doc(review.carKey)
      .collection('reviews')
      .add({
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
      .collection('cars', (ref) => ref.where('carKey', '==', carKey))
      .valueChanges();
  }
}
