import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {Position} from '../interfaces/position';
import {Sector} from '../models/Sector.model';
import {City} from '../models/City.model';

import 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class PositionService {
  sectorCollection: AngularFirestoreCollection<Sector>;
  positionItem: Observable<Position[]>;
  
  constructor(private afs: AngularFirestore) { }
  collectionInitialization() {
  this.sectorCollection = this.afs.collection('sectors');
  this.positionItem = this.sectorCollection.snapshotChanges().map(changes => {
        return changes.map(a => {
          const sector = a.payload.doc.data() 
          const sectorKey = a.payload.doc.id
          const cityKey = sector.cityKey
          return this.afs.collection('cities').doc(cityKey).snapshotChanges().take(1).map(actions => {
            return actions.payload.data();
          }).map((city : City) => {
            return {
              sectorKey:sectorKey,
              sector:sector.name,
              cityKey:cityKey,
              city:city.name ,
              };
          });
        })
      }).flatMap(positions => combineLatest(positions));
    }
  sellectAllSectorsWithCities() {
    this.collectionInitialization();
    return this.positionItem;
  }
}