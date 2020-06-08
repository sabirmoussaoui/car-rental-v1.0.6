import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Worker } from '../models/Worker.model';
import { City } from '../models/City.model';
import { Sector } from '../models/Sector.model';
@Injectable({
  providedIn: 'root',
})
export class WorkerService {
  constructor(public db: AngularFirestore) {}
  updateProfil(fileurl, worker: Worker) {
    return this.db
      .collection('workers')
      .doc(worker.workerKey)
      .update({
        logo: fileurl,
      })
      .then((complete) => {
        // delete photos
        if (
          worker.logo &&
          worker.logo != 'assets/img/avatar/avatar_profile.png'
        ) {
          const storageRef = firebase.storage().refFromURL(worker.logo);
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
  findWorkersByCity(city: City) {
    return this.db
      .collection<Worker>('workers', (ref) =>
        ref.where('city.name', '==', city.name)
      )
      .valueChanges();
  }
  findWorkersBySector(sector: Sector) {
    return this.db
      .collection<Worker>('workers', (ref) =>
        ref.where('sector.name', '==', sector.name)
      )
      .valueChanges();
  }
  findWorkersByName(name: string) {
    return this.db
      .collection<Worker>('workers', (ref) =>
        ref.where('name', '>=', name).where('name', '<=', name + '\uf8ff')
      )
      .valueChanges();
  }

  updateWorker(workerKey, worker) {
    return this.db
      .collection('workers')
      .doc(workerKey)
      .update({
        name: worker.name,
        phone: worker.phone,
        website: worker.website,
        city: {
          name: worker.city.name,
          cityKey: worker.sector.cityKey,
        },
        sector: {
          name: worker.sector.name,
        },
        adresse: worker.adresse,
        // email: worker.email,
        updated_at: new Date().toDateString(),
      });
  }

  updateAllDocuments(workerKey, Worker) {
    this.db
      .collection('cars', (ref) =>
        ref.where('worker.workerKey', '==', workerKey)
      )
      .get()
      .subscribe(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({
            worker: {
              //kteb les champs
            },
          });
        });
      });
  }

  createWorker(workerKey, worker: Worker) {
    return this.db
      .collection('workers')
      .doc(workerKey)
      .set({
        workerKey: workerKey,
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
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
      });
  }

  getWorker(workeryKey) {
    return this.db.collection<Worker>('workers').doc(workeryKey).valueChanges();
  }
  getWorkerSnapShot(workeryKey) {
    return this.db.collection('workers').doc(workeryKey).snapshotChanges();
  }
  getWorkers() {
    return this.db.collection<Worker>('workers').valueChanges();
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
  acceptWorker(workerKey) {
    return this.db.collection('workers').doc(workerKey).update({
      accepted: true,
    });
  }
  disacceptedWorker(workerKey) {
    return this.db.collection('workers').doc(workerKey).update({
      accepted: false,
    });
  }
  blockWorker(workerKey, status: boolean) {
    return this.db.collection('workers').doc(workerKey).update({
      blocked: status,
    });
  }
}
