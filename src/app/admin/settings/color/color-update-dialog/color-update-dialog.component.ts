import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Color } from 'src/app/models/Color.model';

@Component({
  selector: 'app-color-update-dialog',
  templateUrl: './color-update-dialog.component.html',
  styleUrls: ['./color-update-dialog.component.scss']
})
export class ColorUpdateDialogComponent implements OnInit {
  form: FormGroup;
  name:string;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<ColorUpdateDialogComponent>,
      @Inject(MAT_DIALOG_DATA) {name}:Color ) {
        
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
