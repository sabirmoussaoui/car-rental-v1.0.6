import { Component, OnInit } from '@angular/core';
import { SectorService } from 'src/app/services/sector.service';
import { CityService } from 'src/app/services/city.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sector } from 'src/app/models/Sector.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SectorUpdateDialogComponent } from './sector-update-dialog/sector-update-dialog.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';


interface City {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.scss']
})
export class SectorComponent implements OnInit {
  sectors : Array<any>
  sectorForm : FormGroup; 
  cities: City[] = [];

  constructor(
    private sectorService : SectorService,
    private cityService :   CityService,
    private formBuilder : FormBuilder,    
    private dialog: MatDialog




  ) { }

  ngOnInit(): void {
    this.initCityForm();
    this.getSectors();
    this.getCities();

  }

  initCityForm(){
    this.sectorForm = this.formBuilder.group(
      {
        'city' : ['',Validators.required],
        'sector' : ['',Validators.required],

      })}



  onSaveSector(){
    const citywithKey = this.sectorForm.get("city").value
    const name = this.sectorForm.get("sector").value
    const result  = citywithKey.split("@")
    const sector =new Sector(name,result[0],result[1]); 
    
    this.sectorService.createSector(sector)
  }
getSectors(){
  this.sectorService.getSectorsSnapshot()
 .subscribe(result => {
   this.sectors= result;
 })
}

openDialog(sectorKey,name,city,cityKey) {
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
 
  dialogConfig.data = {
      name: name,
      city:city,
      cityKey:cityKey
  };
  
  const dialogRef = this.dialog.open(SectorUpdateDialogComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(
      data =>{ 
        if(data!=undefined){
        console.log("Dialog output:", data.name + data.city + sectorKey)    
        this.onUpdateSector(sectorKey,data)
      }
      }
  );   }

  onUpdateSector(sectorKey,data){
    const citywithKey = data.city
    const result  = citywithKey.split("@")
    const sectorUpdate =new Sector(data.name,result[0],result[1]) ; 
    this.sectorService.updateSector(sectorKey,sectorUpdate); 
 
 }

onDeleteSector(sectorKey){
  console.log(sectorKey)
  this.sectorService.deleteSector(sectorKey)
  .then(
    res => {
     console.log("safi tmsseh")
    },
    err => {
      console.log(err);
    }
  )
  }
getCities(){
  this.cityService.getCities()
  .subscribe(result => {
result.forEach(doc=>{
  const name = doc.data().name; 
  const cityKey = doc.id; 
  console.log("city : "+name + "Key :"+ cityKey)
  this.cities.push({value:name+'@'+cityKey,viewValue:name})
  })})
}


// getCity(cityKey){
//   this.cityService.getCity(cityKey)
//   .subscribe(doc => {
//    console.log( doc.data().name)
//   })
// }









}
