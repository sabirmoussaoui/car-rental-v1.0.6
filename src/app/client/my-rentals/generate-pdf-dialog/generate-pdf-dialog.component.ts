import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarRequest } from 'src/app/models/CarRequest.model';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-generate-pdf-dialog',
  templateUrl: './generate-pdf-dialog.component.html',
  styleUrls: ['./generate-pdf-dialog.component.scss'],
})
export class GeneratePdfDialogComponent implements OnInit {
  carRequest: CarRequest;
  days: number = 1;
  constructor(
    public dialogRef: MatDialogRef<GeneratePdfDialogComponent>,
    @Inject(MAT_DIALOG_DATA) { carRequest }
  ) {
    this.carRequest = carRequest;
  }
  ngOnInit(): void {}
  // this generates single page
  convertToPdf() {
    var data = document.getElementById('pdfTable');
    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);

      pdf.save('report.pdf'); // Generated PDF
    });
  }

  close() {
    this.dialogRef.close();
  }
}
