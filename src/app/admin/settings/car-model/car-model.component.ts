import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CarModelService } from 'src/app/services/car-model.service';
import { CarModel } from 'src/app/models/CarModel.model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { CarModelUpdateDialogComponent } from './car-model-update-dialog/car-model-update-dialog.component';

@Component({
  selector: 'app-car-model',
  templateUrl: './car-model.component.html',
  styleUrls: ['./car-model.component.scss'],
  providers: [
    
  ],
})
export class CarModelComponent implements OnInit {

//carModels
carModels: Array<any> ;
carModelForm : FormGroup; 
  constructor(
    private carModelService : CarModelService,
    private formBuilder : FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initCarModelForm(); 
    this.getCarModels()

  }

openDialog(carModelKey,name) {
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
 
  dialogConfig.data = {
      name: name
  };
  
  const dialogRef = this.dialog.open(CarModelUpdateDialogComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(
      data =>{ 
        if(data!=undefined){
        console.log("Dialog output:", data.name + carModelKey)    
        this.onUpdateCarModel(carModelKey,data)}
      }
  );   }
//  Setting CarModels
initCarModelForm(){
  this.carModelForm = this.formBuilder.group(
    {
      'name'  :  ['',Validators.required],
      'year'  :  ['',Validators.required],
  },
)}


getCarModels(){
     this.carModelService.getCarModelsSnapshot()
    .subscribe(result => {
      this.carModels = result;
    })
  }


onSaveCarModel(){
  const name = this.carModelForm.get("name").value
  const year = this.carModelForm.get("year").value
    const carModel =new CarModel(name,year) ; 
    this.carModelService.createCarModel(carModel)
}


onUpdateCarModel(carModelKey,data){
   const carModelUpdate =new CarModel(data.name,2019) ; 
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
}
