import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarBrandService } from 'src/app/services/car-brand.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CarBrand } from 'src/app/models/CarBrand.model';

@Component({
  selector: 'app-auth-client-dialog',
  templateUrl: './auth-client-dialog.component.html',
  styleUrls: ['./auth-client-dialog.component.scss'],
})
export class AuthClientDialogComponent implements OnInit {
  form: FormGroup;
  email: string;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AuthClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) { email }
  ) {
    this.email = email;
    this.form = fb.group({
      email: [this.email, Validators.email],
      password: [
        '',
        [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)],
      ],
    });
  }

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  login() {
    this.dialogRef.close(this.form.value);
  }
}
