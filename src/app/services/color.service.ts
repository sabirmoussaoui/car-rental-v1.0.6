import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  constructor(public db: AngularFirestore) {}

  getColor(colorKey) {
    return this.db.collection('users').doc(colorKey).get();
  }
  updateColor(colorKey, color) {
    return this.db.collection('colors').doc(colorKey).set({
      name: color.name,
    });
  }

  deleteColor(colorKey) {
    return this.db.collection('colors').doc(colorKey).delete();
  }

  getColorsSnapshot() {
    return this.db.collection('colors').snapshotChanges();
  }

  getColors() {
    return this.db.collection('colors').get();
  }

  createColor(color) {
    return this.db.collection('colors').add({
      name: color.name,
    });
  }
}
