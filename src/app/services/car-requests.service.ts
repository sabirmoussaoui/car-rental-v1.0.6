import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CarRequest } from '../models/CarRequest.model';
import { Client } from '../models/Client.model';
import { Car } from '../models/Car.model';
import { database } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class CarRequestService {
  constructor(public db: AngularFirestore) {}

  getCity(cityKey) {
    return this.db.collection('users').doc(cityKey).get();
  }
  updateCity(cityKey, city) {
    return this.db.collection('cities').doc(cityKey).set({
      name: city.name,
    });
  }

  deleteCity(cityKey) {
    return this.db.collection('cities').doc(cityKey).delete();
  }

  getCarRequests(clientKey) {
    return this.db
      .collection<CarRequest>('car_requests', (ref) =>
        ref.where('client.clientKey', '==', clientKey)
      )
      .valueChanges();
  }

  getCarRequestByWorker(workerKey) {
    return this.db
      .collection<CarRequest>('car_requests', (ref) =>
        ref.where('car.worker.workerKey', '==', workerKey)
      )
      .valueChanges();
  }

  acceptRequest(carRequestKey) {
    return this.db.collection('car_requests').doc(carRequestKey).update({
      accepted: true,
    });
  }
  removeRequest(carRequestKey) {
    return this.db.collection('car_requests').doc(carRequestKey).update({
      accepted: false,
    });
  }
  blockRequest(carRequestKey, status: boolean) {
    return this.db.collection('car_requests').doc(carRequestKey).update({
      blocked: status,
    });
  }
  deblockRequest(carRequestKey) {
    return this.db.collection('car_requests').doc(carRequestKey).update({
      blocked: true,
    });
  }
  getCities() {
    return this.db.collection('cities').get();
  }

  getDateFormats(date: Date) {
    return date.toLocaleString();
  }
  createCarRequest(carRequest: CarRequest) {
    var uid = this.db.collection('car_requests').ref.doc().id;
    return this.db
      .collection('car_requests')
      .doc(uid)
      .set({
        carRequestKey: uid,
        client: {
          clientKey: carRequest.client.clientKey,
          firstname: carRequest.client.firstname,
          lastname: carRequest.client.lastname,
          phone: carRequest.client.phone,
          city: {
            name: carRequest.client.city.name,
            cityKey: carRequest.client.city.cityKey,
          },
          adresse: carRequest.client.adresse,
          email: carRequest.client.email,
          profil: carRequest.client.profil,
        },
        car: carRequest.car as Car,
        pick_up: carRequest.pick_up,
        drop_off: carRequest.drop_off,
        pick_up_time: carRequest.pick_up_time,
        drop_off_time: carRequest.drop_off_time,
        accepted: false,
        blocked: false,
        created_at: new Date(),
        updated_at: new Date(),
      });
  }
  updateCarRequest(carRequest: CarRequest) {
    return this.db
      .collection('car_requests')
      .doc(carRequest.carRequestKey)
      .update({
        pick_up: carRequest.pick_up,
        drop_off: carRequest.drop_off,
        pick_up_time: carRequest.pick_up_time,
        drop_off_time: carRequest.drop_off_time,
        updated_at: new Date(),
      });
  }
}
