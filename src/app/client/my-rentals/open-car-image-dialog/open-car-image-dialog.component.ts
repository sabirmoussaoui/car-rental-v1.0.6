import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarBrandService } from 'src/app/services/car-brand.service';

@Component({
  selector: 'app-open-car-image-dialog',
  templateUrl: './open-car-image-dialog.component.html',
  styleUrls: ['./open-car-image-dialog.component.scss'],
})
export class OpenCarImageDialogComponent implements OnInit {
  // avatars: Array<any> = new Array<any>();
  photoUrl: string;
  constructor(
    private carBrandService: CarBrandService,
    public dialogRef: MatDialogRef<OpenCarImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) { photoUrl, status }
  ) {
    this.photoUrl = photoUrl;
  }

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }
}
