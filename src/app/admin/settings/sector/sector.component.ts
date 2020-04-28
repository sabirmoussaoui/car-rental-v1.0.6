import { Component, OnInit } from '@angular/core';
import { SectorService } from 'src/app/services/sector.service';
import { CityService } from 'src/app/services/city.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sector } from 'src/app/models/Sector.model';
import { SectorUpdateDialogComponent } from './sector-update-dialog/sector-update-dialog.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { Position} from '../../../interfaces/position';
import { PositionService } from 'src/app/services/position.service';


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

  sectorForm : FormGroup; 
  cities: City[] = [];

  positions : Position[]; 

  constructor(
    private sectorService : SectorService,
    private cityService :   CityService,
    private formBuilder : FormBuilder,    
    private dialog: MatDialog,
    private positionService : PositionService
         ) { }

  ngOnInit(): void {
    this.initCityForm();
    this.getSectors();
    this.getCities();

  }

initCityForm(){
    this.sectorForm = this.formBuilder.group(
      {
        'cityKey' : ['',Validators.required],
        'sector'  : ['',Validators.required],
      })}



onSaveSector(){
    const cityKey = this.sectorForm.get("cityKey").value
    const name = this.sectorForm.get("sector").value
    const sector =new Sector(name,cityKey); 
    this.sectorService.createSector(sector)
  }

getSectors(){
this.positionService.sellectAllSectorsWithCities() 
.subscribe(positions => {
  this.positions = positions;
})
}

openDialog(sectorKey,name,cityKey) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.data = {
      name: name,
      cityKey:cityKey
  };
  const dialogRef = this.dialog.open(SectorUpdateDialogComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(
      data =>{ 
        if(data!=undefined){
        console.log("Dialog output:", data.name  + sectorKey)    
        this.onUpdateSector(sectorKey,data)
      }}
  );   }


onUpdateSector(sectorKey,data){
    const cityKey = data.cityKey
    const sectorUpdate =new Sector(data.name,cityKey) ; 
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
  )}


getCities(){
  this.cityService.getCities()
  .subscribe(result => {
result.forEach(doc=>{
  const name = doc.data().name; 
  const cityKey = doc.id; 
  this.cities.push({value:cityKey,viewValue:name})
  })})
}









}
