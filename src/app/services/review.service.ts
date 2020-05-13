import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(public db: AngularFirestore) {}

  addReview(userkey, role: string) {
    return this.db.collection('users').doc(userkey).set({
      type: role,
      userkey: userkey,
    });
  }
  getReviews(carKey) {
    return this.db
      .collection('reviews', (ref) => ref.where('carKey', '==', carKey))
      .valueChanges();
  }
}
