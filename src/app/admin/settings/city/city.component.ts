import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CityService } from 'src/app/services/city.service';
import { City } from 'src/app/models/City.model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { CityUpdateDialogComponent } from './city-update-dialog/city-update-dialog.component';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
//Cities
cities: Array<any> ;
cityForm : FormGroup; 
  constructor(
    private cityService : CityService,
    private formBuilder : FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initCityForm(); 
    this.getCities()

  }
//Dialod
openDialog(cityKey,name) {
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
 
  dialogConfig.data = {
      name: name
  };
  
  const dialogRef = this.dialog.open(CityUpdateDialogComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(
      data =>{ 
        if(data!=undefined){
        console.log("Dialog output:", data.name + cityKey)    
        this.onUpdateCity(cityKey,data)}
      }
  );   }
// Cities
initCityForm(){
  this.cityForm = this.formBuilder.group(
    {'name' : ['',Validators.required]},
)}


getCities(){
     this.cityService.getCitiesSnapshot()
    .subscribe(result => {
      this.cities = result;
    })
  }


onSaveCity(){
    const city =new City(this.cityForm.get("name").value) ; 
    this.cityService.createCity(city)
}


onUpdateCity(cityKey,data){
   const cityUpdate =new City(data.name) ; 
   this.cityService.updateCity(cityKey,cityUpdate); 

}



onDeleteCity(cityKey){
  console.log(cityKey)
  this.cityService.deleteCity(cityKey)
  .then(
    res => {
     console.log("successfully deleted")
    },
    err => {
      console.log(err);
    }
  )
  }
}
