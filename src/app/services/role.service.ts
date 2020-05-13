import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(public db: AngularFirestore) {}

  addRole(userkey, role: string) {
    return this.db.collection('users').doc(userkey).set({
      role: role,
      userkey: userkey,
    });
  }
  getRole(userKey) {
    return this.db.collection('users').doc(userKey).get();
  }
}
