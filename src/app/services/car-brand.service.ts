import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class CarBrandService {
  constructor(public db: AngularFirestore) {}

  getCarBrand(carBrandKey) {
    return this.db.collection('carBrands').doc(carBrandKey).get();
  }
  updateCarBrand(carBrandKey, carBrand) {
    return this.db.collection('carBrands').doc(carBrandKey).set({
      name: carBrand.name,
    });
  }

  updateCarBrandAvatar(carBrandKey, avatar) {
    return this.db
      .collection('carBrands')
      .doc(carBrandKey)
      .update({
        photoUrl: avatar,
      })
      .then(function () {
        console.log('Document successfully updated!');
      });
  }

  deleteCarBrand(carBrand) {
    if (carBrand.data().photoUrl) {
      const storageRef = firebase
        .storage()
        .refFromURL(carBrand.data().photoUrl);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
    return this.db.collection('carBrands').doc(carBrand.id).delete();
  }
  getAvatars() {
    return this.db.collection('carBrands').valueChanges();
  }
  getCarBrandsSnapshot() {
    return this.db.collection('carBrands').snapshotChanges();
  }

  getCarBrands() {
    return this.db.collection('carBrands').get();
  }

  createCarBrand(carBrand) {
    var uid = this.db.collection('carBrands').ref.doc().id;
    console.log(uid);
    return this.db
      .collection('carBrands')
      .doc(uid)
      .set({
        carBrandKey: uid,
        name: carBrand.name,
        photoUrl: carBrand.photoUrl ? carBrand.photoUrl : '',
      });
  }

  /// Upload Image
  uploadImage(file: File, progress: { percentage: number }) {
    return new Promise((resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = firebase
        .storage()
        .ref()
        .child('images/brands/' + almostUniqueFileName + file.name)
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
}
