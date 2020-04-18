import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

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

/// Upload Image
uploadImage(file:File){
  return new Promise((resolve,reject)=>{
    const almostUniqueFileName = Date.now().toString(); 
    const upload = firebase.storage().ref()
     .child('images/brands/' + almostUniqueFileName + file.name).put(file); 
    upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
      ()=>{
        console.log('Chargement Image...') ; 
      }, 
      (error)=>{
        console.log('Erreur de Chargement Image !'+error);
        reject(); 
        
      },
      ()=> {
        resolve(upload.snapshot.ref.getDownloadURL()); 
      }
      );

  });
}
}
