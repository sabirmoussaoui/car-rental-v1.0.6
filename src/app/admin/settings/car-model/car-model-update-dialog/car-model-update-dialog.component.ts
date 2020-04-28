import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarModel } from 'src/app/models/CarModel.model';
import { CarModelComponent } from '../car-model.component';
import { CarBrandService } from 'src/app/services/car-brand.service';
interface CarBrand {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-car-model-update-dialog',
  templateUrl: './car-model-update-dialog.component.html',
  styleUrls: ['./car-model-update-dialog.component.scss']
})
export class CarModelUpdateDialogComponent implements OnInit {

  form: FormGroup;
  name:string;
  year : number; 
  carBrandKey:string;
  carBrands : CarBrand[] = []

  constructor(
    private carBrandService: CarBrandService,
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<CarModelUpdateDialogComponent>,
      @Inject(MAT_DIALOG_DATA) {name,year,carBrandKey}:CarModel ) {
        
      this.getCarBrands()
      this.name = name;
      this.year = year;
      this.carBrandKey = carBrandKey;

      this.form = fb.group({
          name: [name, Validators.required],
          year: [year, Validators.required],
          carBrandKey: [carBrandKey, Validators.required],
      });

  }

  ngOnInit() {
  }

  getCarBrands(){
    this.carBrandService.getCarBrands()
    .subscribe(result => {
  result.forEach(doc=>{
    const name = doc.data().name; 
    const carBrandKey = doc.id; 
    this.carBrands.push({value:carBrandKey,viewValue:name})
    })})
  }
  save() {
      this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
