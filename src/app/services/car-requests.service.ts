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
      .collection('car_requests', (ref) =>
        ref.where('client.clientKey', '==', clientKey)
      )
      .get();
  }

  getCities() {
    return this.db.collection('cities').get();
  }
  updateCarRequestKey(carRequestKey) {
    return this.db.collection('car_requests').doc(carRequestKey).update({
      carRequestKey: carRequestKey,
    });
  }
  getDateFormats(date: Date) {
    return date.toLocaleString();
  }
  createCarRequest(carRequest: CarRequest) {
    return this.db.collection('car_requests').add({
      carRequestKey: '',
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
      accepted: false,
      blocked: false,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
}
