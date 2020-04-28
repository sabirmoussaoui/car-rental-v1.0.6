import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CarModelService } from 'src/app/services/car-model.service';
import { CarModel } from 'src/app/models/CarModel.model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { CarModelUpdateDialogComponent } from './car-model-update-dialog/car-model-update-dialog.component';
import { CarBrandService } from 'src/app/services/car-brand.service';
import { CarBrand } from 'src/app/models/CarBrand.model';
import { MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { BrandModel } from 'src/app/interfaces/brandModel';
import { BrandModelService } from 'src/app/services/brand-model.service';
interface CarBrandSelect {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-car-model',
  templateUrl: './car-model.component.html',
  styleUrls: ['./car-model.component.scss'],
  providers: [
    
  ],
})
export class CarModelComponent implements OnInit {
carBrands : CarBrandSelect[] = []

 compt=0
//carModels
carModelForm : FormGroup; 

carBrandModels   : BrandModel[]; 

  constructor(
    private carModelService : CarModelService,
    private formBuilder : FormBuilder,
    private dialog: MatDialog,
    private carBrandService: CarBrandService,
    private brandModelService : BrandModelService
  ) { }

  ngOnInit(): void {
    this.initCarModelForm(); 
    this.getCarModels()
    this.getCarBrands(); 
  }

openDialog(carModelKey,name,year,carBrandKey) {
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
 
  dialogConfig.data = {
      name: name,
      year: year , 
      carBrandKey :carBrandKey
  };
  
  const dialogRef = this.dialog.open(CarModelUpdateDialogComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(
      data =>{ 
        if(data!=undefined){
        console.log("Dialog output:", data.name +data.carBrandKey+data.carBrand+ carModelKey)  ;  
        this.onUpdateCarModel(carModelKey,data);
      }
      }
  );   }
//  Setting CarModels
initCarModelForm(){
  this.carModelForm = this.formBuilder.group(
    {
      'name'  :  ['',Validators.required],
      'year'  :  ['',Validators.required],
      'carBrandKey' : ['',Validators.required],

  },
)}


getCarModels(){
  this.brandModelService.sellectAllCarModelssWithCarBrands() 
  .subscribe(carBrandModels => {
    this.carBrandModels = carBrandModels;
  })
  }

onSaveCarModel(){
    const name = this.carModelForm.get("name").value
    const year = this.carModelForm.get("year").value
    const carBrandKey = this.carModelForm.get("carBrandKey").value
    const carModel =new CarModel(name,year,carBrandKey) ; 
    console.log(carModel)
    this.carModelService.createCarModel(carModel)
}


onUpdateCarModel(carModelKey,data){
   const carModelUpdate =new CarModel(
     data.name,
     data.year,
     data.carBrandKey
     ) ;

   this.carModelService.updateCarModel(carModelKey,carModelUpdate); 

}



onDeleteCarModel(carModelKey){
  console.log(carModelKey)
  this.carModelService.deleteCarModel(carModelKey)
  .then(
    res => {
     console.log("safi tmsseh")
    },
    err => {
      console.log(err);
    }
  )
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
}
