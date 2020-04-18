import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(public db: AngularFirestore) {}

getCity(cityKey){
    return this.db.collection('users').doc(cityKey).get();
  }
updateCity(cityKey, city){
    return this.db.collection('cities').doc(cityKey).set({
      name:city.name,
    });
  }

deleteCity(cityKey){
    return this.db.collection('cities').doc(cityKey).delete();
  }

getCitiesSnapshot(){
    return this.db.collection('cities').snapshotChanges();
  }
  
getCities(){
    return this.db.collection('cities').get();
  }


  createCity(city){
    return this.db.collection('cities').add({
      name:city.name
    });
  }
}
