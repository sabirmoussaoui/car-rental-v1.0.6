import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarBrand } from 'src/app/models/CarBrand.model';
import { CarBrandService } from 'src/app/services/car-brand.service';

@Component({
  selector: 'app-car-brand-update-dialog',
  templateUrl: './car-brand-update-dialog.component.html',
  styleUrls: ['./car-brand-update-dialog.component.scss']
})
export class CarBrandUpdateDialogComponent implements OnInit {

  form: FormGroup;
  name:string;


  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<CarBrandUpdateDialogComponent>,
      @Inject(MAT_DIALOG_DATA) {name,photoUrl}:CarBrand ) {
        
      this.name = name;
      this.form = fb.group({
          name: [name, Validators.required],
      });

  }

  ngOnInit() {

  }



  save() {
      this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
