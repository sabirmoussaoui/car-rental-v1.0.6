import {Component, OnInit} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CityService } from 'src/app/services/city.service';
import { SectorService } from 'src/app/services/sector.service';


declare const google: any;
interface City {
  value: string;
  viewValue: string;
}
interface Sector {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-worker-register',
  templateUrl: './worker-register.component.html',
  styleUrls: ['./worker-register.component.scss']
})
export class WorkerRegisterComponent implements OnInit {

  workerForm : FormGroup; 
  cities: City[] = [];
  sectors: Sector[] = [];

constructor(
  private router : Router,
  private formBuilder : FormBuilder,
  private cityService : CityService,
  private sectorService : SectorService



){

}
  ngOnInit() {
    // initialiser la formulaire 
    this.getCities(); 
    this.initForm(); 

  // MAP
  //   let maps = document.getElementById('map-canvas');
  //   let lat = maps.getAttribute('data-lat');
  //   let lng = maps.getAttribute('data-lng');
   
  //   var myLatlng = new google.maps.LatLng(lat, lng);
  //   var mapOptions = {
  //       zoom: 12,
  //       scrollwheel: false,
  //       center: myLatlng,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP,
  //       styles: [
  //         {"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},
  //         {"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},
  //         {"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},
  //         {"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},
  //         {"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},
  //         {"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},
  //         {"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},
  //         {"featureType":"water","elementType":"all","stylers":[{"color":'#5e72e4'},{"visibility":"on"}]}]
  //   }

  //   maps = new google.maps.Map(maps, mapOptions);

  //   var marker = new google.maps.Marker({
  //       position: myLatlng,
  //       map: maps,
  //       animation: google.maps.Animation.DROP,
  //       title: 'Hello World!'
  //                                       });

  //   var contentString = '<div class="info-window-content"><h2>Car Rental</h2>' +
  //       '<p>*************************************</p></div>';

  //   var infowindow = new google.maps.InfoWindow({
  //       content: contentString
  //   });

  //   google.maps.event.addListener(marker, 'click', function() {
  //       infowindow.open(map, marker);
  //   });

   }



initForm(){
  this.workerForm = this.formBuilder.group(
    {
'name' : ['',Validators.required],
'email' : ['',Validators.email],
'phone' : ['',Validators.required],
'password' : ['',[Validators.required,Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
'confirmPassword' : ['',[Validators.required,Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
'website' : ['',],
'city':['',Validators.required],
'sector':['',Validators.required],
    })
}

  onSaveWorker(){
    const name  =     this.workerForm.get('name').value;    
    const email =     this.workerForm.get('email').value;
    const phone =     this.workerForm.get('phone').value; 
    const password =  this.workerForm.get('password').value;
    const confirmPassword =  this.workerForm.get('confirmPassword').value;  
    const website =   this.workerForm.get('website').value; 
    const city =      this.workerForm.get('city').value; 
    const sector =    this.workerForm.get('sector').value; 
    if(password===confirmPassword){console.log("ok")}
    else{console.log("not ok")}
    console.log(name+email+phone+password+website+city+sector)
    return this.router.navigate(['/worker/dashbord'])
  }
  getCities(){
    this.cityService.getCities()
    .subscribe(result => {
  result.forEach(doc=>{
    const name = doc.data().name; 
    const cityKey = doc.id; 

    console.log("city : "+name + "Key :"+ cityKey)
    this.cities.push({value:doc.id,viewValue:name})
    })})
  }
  onCitySelection(){
    const cityKey =      this.workerForm.get('city').value; 
    console.log("cityeKeySelected :"+cityKey)

    this.getSectors(cityKey)
  }
  getSectors(cityKey){
    this.sectors = []
    this.sectorService.getSectors(cityKey)
    .subscribe(result => {
  result.forEach(doc=>{
    const name = doc.data().name; 
    this.sectors.push({value:doc.id,viewValue:name})
    console.log("Secteur"+doc.data().name)
  })
    })
  }





}
