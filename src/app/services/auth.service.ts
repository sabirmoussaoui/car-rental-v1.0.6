import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  constructor() {}
  createUser(user, password) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, password)
        .then(
          (user) => {
            resolve(user.user.uid);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
  singUpwithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  }
  signInUser(email: string, password: string) {
    return new Promise((resolve, reject) =>
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          (complete) => {
            resolve(complete);
          },
          (error) => {
            reject(error);
          }
        )
    );
  }

  signOutUser() {
    return firebase.auth().signOut();
  }
}
