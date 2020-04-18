import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CarBrandService } from 'src/app/services/car-brand.service';
import { CarBrand } from 'src/app/models/CarBrand.model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { CarBrandUpdateDialogComponent } from './car-brand-update-dialog/car-brand-update-dialog.component';

@Component({
  selector: 'app-car-brand',
  templateUrl: './car-brand.component.html',
  styleUrls: ['./car-brand.component.scss']
})
export class CarBrandComponent implements OnInit {
//carBrands
carBrands: Array<any> ;
carBrandForm : FormGroup; 
//upload image 
imageIsUploading = false ; 
imageUploaded = false; 
imageUrl : string ; 

  constructor(
    private carBrandService : CarBrandService,
    private formBuilder : FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initCarBrandForm(); 
    this.getCarBrands()

  }
//Dialod

openDialog(carBrandKey,name) {
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
 
  dialogConfig.data = {
      name: name
  };
  
  const dialogRef = this.dialog.open(CarBrandUpdateDialogComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(
      data =>{ 
        if(data!=undefined){
        console.log("Dialog output:", data.name + carBrandKey)    
        this.onUpdateCarBrand(carBrandKey,data)}
      }
  );   }
//  Setting carBrands
initCarBrandForm(){
  this.carBrandForm = this.formBuilder.group(
    {'name' : ['',Validators.required]},
)}


getCarBrands(){
     this.carBrandService.getCarBrandsSnapshot()
    .subscribe(result => {
      this.carBrands = result;
    })
  }


  //Upload Imagde 
  detectImage(event){
    this.onUploadImage(event.target.files[0]); 
  }
  onUploadImage(file:File){
    console.log(file)
    this.imageIsUploading = true; 
    this.carBrandService.uploadImage(file).then(
      (url:string)=>{
        this.imageUrl = url ;
        console.log('Url =>'+url);
         
        this.imageIsUploading = false; 
        this.imageUploaded=true; 
      }
    )
  }


onSaveCarBrand(){
    const carBrand =new CarBrand(this.carBrandForm.get("name").value) ; 
    if(this.imageUrl && this.imageUrl !== ''){
      carBrand.photo = this.imageUrl ; 
    }
    this.carBrandService.createCarBrand(carBrand)
}


onUpdateCarBrand(carBrandKey,data){
   const carBrandUpdate =new CarBrand(data.name) ; 
   this.carBrandService.updateCarBrand(carBrandKey,carBrandUpdate); 

}



onDeleteCarBrand(carBrandKey){
  console.log(carBrandKey)
  this.carBrandService.deleteCarBrand(carBrandKey)
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
