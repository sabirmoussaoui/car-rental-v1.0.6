import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CarModelService {

  constructor(public db: AngularFirestore) {}

getCarModel(carModelKey){
    return this.db.collection('users').doc(carModelKey).get();
  }
updateCarModel(carModelKey, carModel){
    return this.db.collection('carModels').doc(carModelKey).set({
      name:carModel.name,
    });
  }

deleteCarModel(carModelKey){
    return this.db.collection('carModels').doc(carModelKey).delete();
  }

getCarModelsSnapshot(){
    return this.db.collection('carModels').snapshotChanges();
  }
  
getCarModels(){
    return this.db.collection('carModels').get();
  }


  createCarModel(carModel){
    return this.db.collection('carModels').add({
      name:carModel.name,
      year:carModel.year
    });
  }
}
