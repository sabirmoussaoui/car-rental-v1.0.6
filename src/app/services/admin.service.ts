import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(public db: AngularFirestore) {}

  getAdminSnapShot(adminkey) {
    return this.db.collection('admins').doc(adminkey).snapshotChanges();
  }
}
