import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Client } from '../models/Client.model';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ClientService {
  client$: Observable<any>;
  constructor(public db: AngularFirestore) {
    // this.client$ = firebase.auth;
    // this.afAuth.authState.pipe(
    //   switchMap((user) => {
    //     if (user) {
    //       return this.db.doc<Client>(`clients/${user.uid}`).valueChanges();
    //     } else {
    //       return of(null);
    //     }
    //   })
    // );
  }

  createClient(clientkey, client: Client) {
    return this.db
      .collection('clients')
      .doc(clientkey)
      .set({
        clientKey: clientkey,
        firstname: client.firstname,
        lastname: client.lastname,
        phone: client.phone,
        city: {
          name: client.city.name,
          cityKey: client.city.cityKey,
        },
        adresse: client.adresse,
        email: client.email,
        profil: client.profil,
        created_at: client.created_at,
        updated_at: client.updated_at,
      });
  }

  getClientSnapShot(clientkey) {
    return this.db.collection('clients').doc(clientkey).snapshotChanges();
  }
  getClient(clientkey) {
    return this.db.collection<Client>('clients').doc(clientkey).valueChanges();
  }

  uploadMainImage(file: File, progress: { percentage: number }) {
    return new Promise((resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = firebase
        .storage()
        .ref()
        .child('images/client/' + almostUniqueFileName + file.name)
        .put(file);
      upload.on(
        'state_changed',
        function (snapshot) {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          progress.percentage = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        },
        function (error) {
          console.log(error);
        },
        function () {
          resolve(upload.snapshot.ref.getDownloadURL());
        }
      );
    });
  }

  updateClient(client: Client, clientkey) {
    return this.db
      .collection('clients')
      .doc(clientkey)
      .update({
        fisrtname: client.firstname,
        lastname: client.lastname,
        phone: client.phone,
        city: {
          name: client.city.name,
          cityKey: client.city.cityKey,
        },
        adresse: client.adresse,
        email: client.email,
        created_at: client.created_at,
        updated_at: client.updated_at,
      });
  }

  singUpwithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        console.log(result.user);

        return this.createClientwithGoogle(result.user);
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log(error);
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }
  updateProfil(fileurl, workerKey, client: Client) {
    return this.db
      .collection('clients')
      .doc(workerKey)
      .update({
        profil: fileurl,
      })
      .then((complete) => {
        // delete photos
        if (
          client.profil &&
          client.profil != 'assets/img/avatar/avatar_profile.png'
        ) {
          const storageRef = firebase.storage().refFromURL(client.profil);
          storageRef.delete().then(
            () => {
              console.log('main Photo removed!');
            },
            (error) => {
              console.log('Could not remove main photo! : ' + error);
            }
          );
        }
      });
  }
  updatPassword(password: String, user) {
    user
      .updatePassword(password)
      .then(function () {
        console.log('password updated');
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  createClientwithGoogle(client) {
    console.log(client);
    var fullname = client.displayName;
    var splitfullname = fullname.split(' ');
    return this.db
      .collection('clients')
      .doc(client.uid)
      .set({
        firstname: splitfullname[0],
        lastname: splitfullname[1],
        phone: '',
        city: {
          name: '',
          cityKey: '',
        },
        adresse: '',
        email: client.email,
        profil: client.photoURL ? client.photoURL : ' ',
        created_at: new Date(),
        updated_at: new Date(),
      });
  }
}
