import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CarBrandService } from 'src/app/services/car-brand.service';

@Component({
  selector: 'app-car-brand-logo-dialog',
  templateUrl: './car-brand-logo-dialog.component.html',
  styleUrls: ['./car-brand-logo-dialog.component.scss']
})
export class CarBrandLogoDialogComponent implements OnInit {
  avatars: Array<any> = new Array<any>();
  constructor(
    private carBrandService:CarBrandService,
    public dialogRef: MatDialogRef<CarBrandLogoDialogComponent>,

  ) { }

  ngOnInit(): void {
    this.getData()
  }
  getData(){
    this.carBrandService.getAvatars()
    .subscribe(data => {
      this.avatars = data
    }
      );
  }
  close(avatar){
    this.dialogRef.close(avatar);
  }
}
