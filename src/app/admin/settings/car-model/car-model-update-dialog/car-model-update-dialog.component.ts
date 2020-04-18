import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarModel } from 'src/app/models/CarModel.model';

@Component({
  selector: 'app-car-model-update-dialog',
  templateUrl: './car-model-update-dialog.component.html',
  styleUrls: ['./car-model-update-dialog.component.scss']
})
export class CarModelUpdateDialogComponent implements OnInit {

  form: FormGroup;
  name:string;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<CarModelUpdateDialogComponent>,
      @Inject(MAT_DIALOG_DATA) {name}:CarModel ) {
        
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
