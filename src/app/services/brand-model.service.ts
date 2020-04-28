import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { CarBrand } from '../models/CarBrand.model';
import { BrandModel } from '../interfaces/brandModel';
import { CarModel } from '../models/CarModel.model';

@Injectable()
export class BrandModelService {
  carModelCollection: AngularFirestoreCollection<CarModel>;
  carBrandModelItem: Observable<BrandModel[]>;
  
  constructor(private afs: AngularFirestore) { }
  collectionInitialization() {
  this.carModelCollection = this.afs.collection('carModels');
  this.carBrandModelItem = this.carModelCollection.snapshotChanges().map(changes => {
        return changes.map(a => {
          const carModel= a.payload.doc.data() 
          const carModelKey = a.payload.doc.id
          const carBrandKey = carModel.carBrandKey
          return this.afs.collection('carBrands').doc(carBrandKey).snapshotChanges().take(1).map(actions => {
            return actions.payload.data();
          }).map((carBrand : CarBrand ) => {
            return {
                carModel        : carModel.name,
                year            : carModel.year,
                carBrand        : carBrand.name?carBrand.name:"******",
                photoUrl        : carBrand.photoUrl,
                carModelKey     : carModelKey,
                carBrandKey     : carBrandKey
              };
          });
        })
      }).flatMap(positions => combineLatest(positions));
    }
  sellectAllCarModelssWithCarBrands() {
    this.collectionInitialization();
    return this.carBrandModelItem;
  }
}