import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CarModelService } from 'src/app/services/car-model.service';
import { CarModel } from 'src/app/models/CarModel.model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { CarModelUpdateDialogComponent } from './car-model-update-dialog/car-model-update-dialog.component';
import { CarBrandService } from 'src/app/services/car-brand.service';
interface CarBrand {
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
carBrands : CarBrand[] = []
//carModels
carModels: Array<any> ;
carModelForm : FormGroup; 
  constructor(
    private carModelService : CarModelService,
    private formBuilder : FormBuilder,
    private dialog: MatDialog,
    private carBrandService: CarBrandService
  ) { }

  ngOnInit(): void {
    this.initCarModelForm(); 
    this.getCarModels()
    this.getCarBrands(); 
  }

openDialog(carModelKey,name,year,carBrand,carBrandKey) {
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
 
  dialogConfig.data = {
      name: name,
      year: year , 
      carBrand: carBrand , 
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
      'carBrand' : ['',Validators.required],

  },
)}


getCarModels(){
     this.carModelService.getCarModelsSnapshot()
    .subscribe(result => {
      this.carModels = result;
    })
  }

onSplit(data){const result  =data.split("@"); return result}
onSaveCarModel(){
    const name = this.carModelForm.get("name").value
    const year = this.carModelForm.get("year").value
    const carBrandwithKey = this.carModelForm.get("carBrand").value
    const result  =this.onSplit(carBrandwithKey)
    const carModel =new CarModel(name,year,result[0],result[1]) ; 
    this.carModelService.createCarModel(carModel)
}


onUpdateCarModel(carModelKey,data){
   const result= this.onSplit(data.carBrand) ; 
   data.carBrandKey  = result[1]
   data.carBrand= result[0]
   console.log(data.carBrand + "key"+data.carBrandKey)
   const carModelUpdate =new CarModel(
     data.name,
     data.year,
     data.carBrand,
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
    this.carBrands.push({value:name+'@'+carBrandKey,viewValue:name})
    })})
  }
}
