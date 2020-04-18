import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Sector } from 'src/app/models/Sector.model';
import { CityService } from 'src/app/services/city.service';
interface City {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-sector-update-dialog',
  templateUrl: './sector-update-dialog.component.html',
  styleUrls: ['./sector-update-dialog.component.scss']
})
export class SectorUpdateDialogComponent implements OnInit{
  form: FormGroup;
  name:string;
  city:string ; 
  cities: City[] = []

  constructor(
      private fb: FormBuilder,
      private cityService :   CityService,
      private dialogRef: MatDialogRef<SectorUpdateDialogComponent>,
      @Inject(MAT_DIALOG_DATA) {name,city,cityKey}:Sector ) {
      this.getCities();
      this.name = name;
      this.city = city+"@"+cityKey; 
        this.form = fb.group({
          name: [name, Validators.required],
          city:[city, Validators.required],
      });
      

  }

  ngOnInit() {
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

  save() {
      this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
