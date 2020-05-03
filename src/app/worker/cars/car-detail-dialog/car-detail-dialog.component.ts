import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarBrandService } from 'src/app/services/car-brand.service';
import { CarModel } from 'src/app/models/CarModel.model';
import { CarBrand } from 'src/app/models/CarBrand.model';
import { Car } from 'src/app/models/Car.model';

@Component({
  selector: 'app-car-detail-dialog',
  templateUrl: './car-detail-dialog.component.html',
  styleUrls: ['./car-detail-dialog.component.scss'],
})
export class CarDetailDialogComponent implements OnInit {
  car: Car;
  constructor(
    private carBrandService: CarBrandService,
    public dialogRef: MatDialogRef<CarDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) { car }
  ) {
    this.car = car;
  }

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }
}
