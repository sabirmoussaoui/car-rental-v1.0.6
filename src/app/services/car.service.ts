import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { Car } from '../models/Car.model';
import { Worker } from '../models/Worker.model';
import { CarModel } from '../models/CarModel.model';
import { CarBrand } from '../models/CarBrand.model';
import { City } from '../models/City.model';
import { FireSQL } from 'firesql';
import * as firebase from 'firebase/app';
import 'firesql/rx'; // <-- Important! Don't forget

@Injectable({
  providedIn: 'root',
})
export class CarService {
  myMethod$: Observable<any>;
  public fireSQL: FireSQL;
  private myMethodSubject = new Subject<any>();

  constructor(public db: AngularFirestore) {
    this.myMethod$ = this.myMethodSubject.asObservable();
    this.fireSQL = new FireSQL(firebase.firestore());
  }
  findCarsByCity(city: City) {
    return this.db
      .collection<Car>('cars', (ref) =>
        ref.where('worker.city.name', '==', city.name)
      )
      .valueChanges();
  }
  findCarsByBrand(carBrandKey: string) {
    return this.db
      .collection<Car>('cars', (ref) =>
        ref.where('carBrand.carBrandKey', '==', carBrandKey)
      )
      .valueChanges();
  }
  findCarsByModel(carModelKey: string) {
    return this.db
      .collection<Car>('cars', (ref) =>
        ref.where('carModel.carModelKey', '==', carModelKey)
      )
      .valueChanges();
  }
  findCarsByBodyStyle(body_style: string) {
    return this.db
      .collection<Car>('cars', (ref) =>
        ref.where('body_style', '==', body_style)
      )
      .valueChanges();
  }
  findCarsByTopRating() {
    return this.db
      .collection<Car>('cars', (ref) => ref.orderBy('rating', 'desc'))
      .valueChanges();
  }
  updateCar(carKey, car) {
    return this.db
      .collection('cars')
      .doc(carKey)
      .update({
        price: car.price,
        quantity: car.quantity,
        carBrand: {
          name: car.carBrand.name,
          photoUrl: car.carBrand.photoUrl,
          carBrandKey: car.carBrand.carBrandKey,
        },
        carModel: {
          name: car.carModel.name,
          year: car.carModel.year,
          photoUrl: car.carModel.year,
          carModelKey: car.carModel.carModelKey,
        },
        seat: car.seat,
        door: car.door,
        fuel: car.fuel,
        updated_at: car.updated_at,
      });
  }
  myMethod(data) {
    this.myMethodSubject.next(data);
  }
  updateCarRating(carKey, averageRating) {
    return this.db
      .collection('cars')
      .doc(carKey)
      .update({
        rating: averageRating ? averageRating : 0,
      })
      .then(function () {
        console.log('Rating successfully updated!');
      });
  }
  addVisitor(carKey, visitor) {
    return this.db
      .collection('cars')
      .doc(carKey)
      .update({
        visitor: visitor + 1,
      })
      .then(function () {
        console.log('Visitor successfully added!');
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
  deleteCarPhoto(carKey, photos) {
    return this.db
      .collection('cars')
      .doc(carKey)
      .update({
        photos: photos,
      })
      .then(function () {
        console.log('Photo successfully removed!');
      });
  }
  deleteCar(carKey) {
    // delete photos
    // if (car.data().main_photo) {
    //   const storageRef = firebase.storage().refFromURL(car.data().main_photo);
    //   storageRef.delete().then(
    //     () => {
    //       console.log('main Photo removed!');
    //     },
    //     (error) => {
    //       console.log('Could not remove main photo! : ' + error);
    //     }
    //   );
    // }
    // const photos = car.data().photos;
    // if (photos.length) {
    //   photos.forEach((photo) => {
    //     const storageRef = firebase.storage().refFromURL(photo);
    //     storageRef.delete().then(
    //       () => {
    //         console.log('Photo removed!' + photo);
    //       },
    //       (error) => {
    //         console.log('Could not remove  photo! : ' + error);
    //       }
    //     );
    //   });
    // }
    return this.db.collection('cars').doc(carKey).delete();
  }

  getCarsSnapshot(workerKey) {
    return this.db
      .collection('cars', (ref) =>
        ref.where('worker.workerKey', '==', workerKey)
      )
      .snapshotChanges();
  }

  getCars() {
    return this.db.collection<Car>('cars').valueChanges();
  }
  getCar(carKey) {
    return this.db.collection<Car>('cars').doc(carKey).valueChanges();
  }

  getCarsByWorker(workerKey) {
    return this.db
      .collection<Car>('cars', (ref) =>
        ref.where('worker.workerKey', '==', workerKey)
      )
      .valueChanges();
  }
  getVisitorByBrand(workerKey) {
    return this.fireSQL.rxQuery(
      `
      SELECT carBrand ,SUM(visitor) AS visitors
      FROM cars  WHERE  workerKey = '${workerKey}' 
      GROUP BY carBrandKey
     `
    );
  }
  getAllCars() {
    return this.db.collection<Car>('cars').valueChanges();
  }
  createCar(car: Car) {
    var uid = this.db.collection('cars').ref.doc().id;
    return this.db
      .collection('cars')
      .doc(uid)
      .set({
        carKey: uid,
        carBrandKey: car.carBrand.carBrandKey,
        workerKey: car.worker.workerKey,
        price: car.price,
        quantity: car.quantity,
        carBrand: {
          name: car.carBrand.name,
          photoUrl: car.carBrand.photoUrl,
          carBrandKey: car.carBrand.carBrandKey,
        },
        carModel: {
          name: car.carModel.name,
          year: car.carModel.year,
          carModelKey: car.carModel.carModelKey,
        },
        seat: car.seat,
        door: car.door,
        fuel: car.fuel,
        main_photo: car.main_photo ? car.main_photo : '',
        photos: car.photos ? car.photos : [],
        created_at: car.created_at,
        worker: car.worker as Worker,
        large_bag: car.large_bag,
        small_bag: car.small_bag,
        gearbox: car.gearbox,
        air_conditioning: car.air_conditioning,
        description: car.description,
        car_class: car.car_class,
        body_style: car.body_style,
        rating: car.rating,
        visitor: car.visitor,
      });
  }

  createPhotos(allPhotos, carBrand, carModel) {
    allPhotos.forEach((photo) => {
      return this.db.collection('photos').add({
        link: photo,
        carBrand: {
          name: carBrand.name,
          photoUrl: carBrand.photoUrl,
          carBrandKey: carBrand.carBrandKey,
        },
        carModel: {
          name: carModel.name,
          year: carModel.year,
          carBrandKey: carModel.carBrandKey,
          carModelKey: carModel.carModelKey,
        },
      });
    });
  }
  findPhotosByCarModel(carModelKey, value) {
    return this.db
      .collection('photos', (ref) =>
        ref.where('carModel.carModelKey', '==', carModelKey).limit(value)
      )
      .valueChanges();
  }
  /// Upload Image

  uploadMainImage(file: File, progress: { percentage: number }) {
    return new Promise((resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = firebase
        .storage()
        .ref()
        .child('images/car/' + almostUniqueFileName + file.name)
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
