import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor() {
    const config = {
      apiKey: "AIzaSyBp2fY5aSNhE4epOC9YUXw4dQzd0tIE21Q",
      authDomain: "car-rental-7142d.firebaseapp.com",
      databaseURL: "https://car-rental-7142d.firebaseio.com",
      projectId: "car-rental-7142d",
      storageBucket: "car-rental-7142d.appspot.com",
      messagingSenderId: "41164079727",
      appId: "1:41164079727:web:8f1ab56313e2a51e04039a",
      measurementId: "G-ZNB8YHFWYG"
             };
  firebase.initializeApp(config);
  }
   

  ngOnInit() {
  }
  

}
