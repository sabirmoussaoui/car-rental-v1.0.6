import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { City } from 'src/app/models/City.model';

@Component({
  selector: 'app-city-update-dialog',
  templateUrl: './city-update-dialog.component.html',
  styleUrls: ['./city-update-dialog.component.scss']
})
export class CityUpdateDialogComponent implements OnInit {
  form: FormGroup;
  name:string;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<CityUpdateDialogComponent>,
      @Inject(MAT_DIALOG_DATA) {name}:City ) {
        
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
