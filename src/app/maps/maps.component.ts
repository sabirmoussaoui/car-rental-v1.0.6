import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
declare const google: any;
import * as L from 'leaflet';
import { Car } from '../models/Car.model';
import { Worker } from '../models/Worker.model';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements AfterViewInit {
  map;
  worker: Worker;
  lat: number;
  lng: number;
  // retrieve from https://gist.github.com/ThomasG77/61fa02b35abf4b971390
  smallIcon = new L.Icon({
    iconUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconRetinaUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41],
  });
  constructor(
    public dialogRef: MatDialogRef<MapsComponent>,
    @Inject(MAT_DIALOG_DATA) { worker, lat, lng }
  ) {
    this.worker = worker;
    this.lat = lat;
    this.lng = lng;
    console.log(lat + '-' + lng);
  }
  ngAfterViewInit(): void {
    this.createMap();
  }

  createMap() {
    const zoomLevel = 12;

    this.map = L.map('map', {
      center: [this.lat, this.lng],
      zoom: zoomLevel,
    });

    const mainLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );

    mainLayer.addTo(this.map);
    const descriptionWikipedia = `City : ${this.worker.city.name}  Sector : ${this.worker.sector.name} Adress : ${this.worker.adresse}`;
    const popupOptions = {
      coords: { lat: this.lat, lng: this.lng },
      text: descriptionWikipedia,
      open: true,
    };
    this.addMarker(popupOptions);
  }

  addMarker({ coords, text, open }) {
    const marker = L.marker([coords.lat, coords.lng], { icon: this.smallIcon });
    if (open) {
      marker.addTo(this.map).bindPopup(text).openPopup();
    } else {
      marker.addTo(this.map).bindPopup(text);
    }
  }
}
