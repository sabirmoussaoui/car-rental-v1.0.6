import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(
    public db: AngularFirestore
    ) {}

  getCity(userKey){
    return this.db.collection('users').doc(userKey).snapshotChanges();
  }

  updateSector(sectorKey, sector){
    return this.db.collection('sectors').doc(sectorKey).set(
      {
        name:sector.name,
        city:sector.city,
        cityKey:sector.cityKey
      }
      
    );
  }

  deleteSector(sectorKey){
    return this.db.collection('sectors').doc(sectorKey).delete();
  }

  getSectors(cityKey){
    return this.db.collection('sectors',ref=>ref.where("cityKey","==",cityKey)).get();
  }

  getSectorsSnapshot(){
    return this.db.collection('sectors').snapshotChanges();

  }
  createSector(sector){
    return this.db.collection('sectors').add({
      name:sector.name,
      city:sector.city,
      cityKey:sector.cityKey
    });
  }
  
}
