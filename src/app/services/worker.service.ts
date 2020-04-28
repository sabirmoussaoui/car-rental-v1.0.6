import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Worker } from '../models/Worker.model';
@Injectable({
  providedIn: 'root',
})
export class WorkerService {
  constructor(public db: AngularFirestore) {}

  createWorker(workerKey, worker: Worker) {
    return this.db
      .collection('workers')
      .doc(workerKey)
      .set({
        name: worker.name,
        phone: worker.phone,
        website: worker.website,
        city: {
          name: worker.city.name,
        },
        sector: {
          name: worker.sector.name,
        },
        adresse: worker.adresse,
        email: worker.email,
        logo: worker.logo,
        longitude: worker.longitude,
        latitude: worker.latitude,
        accepted: worker.accepted,
        blocked: worker.blocked,
        created_at: worker.created_at,
        updated_at: worker.updated_at,
      });
  }

  getWorker(workeryKey) {
    return this.db.collection('workers').doc(workeryKey).get();
  }
  getWorkerSnapShot(workeryKey) {
    return this.db.collection('workers').doc(workeryKey).snapshotChanges();
  }
  getWorkers() {
    return this.db.collection('workers').get();
  }

  uploadMainImage(file: File, progress: { percentage: number }) {
    return new Promise((resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = firebase
        .storage()
        .ref()
        .child('images/worker/' + almostUniqueFileName + file.name)
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
