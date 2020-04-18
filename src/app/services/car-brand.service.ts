import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CarBrandService {

  constructor(public db: AngularFirestore) {}

getCarBrand(carBrandKey){
    return this.db.collection('users').doc(carBrandKey).get();
  }
updateCarBrand(carBrandKey, carBrand){
    return this.db.collection('carBrands').doc(carBrandKey).set({
      name:carBrand.name,
    });
  }

deleteCarBrand(carBrandKey){
    return this.db.collection('carBrands').doc(carBrandKey).delete();
  }

getCarBrandsSnapshot(){
    return this.db.collection('carBrands').snapshotChanges();
  }
  
getCarBrands(){
    return this.db.collection('carBrands').get();
  }


  createCarBrand(carBrand){
    return this.db.collection('carBrands').add({
      name:carBrand.name
    });
  }
}
