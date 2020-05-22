import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarRequest } from 'src/app/models/CarRequest.model';
interface NgbTime {
  hour: number;
  minute: number;
  second: number;
}
@Component({
  selector: 'app-car-request-update-dialog',
  templateUrl: './car-request-update-dialog.component.html',
  styleUrls: ['./car-request-update-dialog.component.scss'],
})
export class CarRequestUpdateDialogComponent implements OnInit {
  pick_up_time: NgbTime;
  drop_off_time: NgbTime;
  minDate: Date;
  maxDate: Date;
  dateFormGroup: FormGroup;
  carRequest: CarRequest;
  constructor(
    private dialogRef: MatDialogRef<CarRequestUpdateDialogComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    { carRequest }
  ) {
    this.carRequest = carRequest;
    const currentYear = new Date().getFullYear();
    const currentMounth = new Date().getMonth();
    const currentDay = new Date().getDay();
    this.minDate = new Date(currentYear, currentMounth, currentDay + 3);
    this.maxDate = new Date(currentYear + 1, currentMounth, currentDay);
  }

  ngOnInit(): void {
    const p_up_time = this.carRequest.pick_up_time.split(':');
    const d_off_time = this.carRequest.drop_off_time.split(':');

    this.dateFormGroup = this._formBuilder.group({
      pick_up: [this.carRequest.pick_up, Validators.required],
      drop_off: [this.carRequest.drop_off, Validators.required],
      pick_up_time: [Validators.required],
      drop_off_time: [Validators.required],
    });
    this.pick_up_time = {
      hour: Number(p_up_time[0]),
      minute: Number(p_up_time[1]),
      second: 0,
    };
    this.drop_off_time = {
      hour: Number(d_off_time[0]),
      minute: Number(d_off_time[1]),
      second: 0,
    };
  }
  save() {
    this.dialogRef.close(this.dateFormGroup.value);
  }

  close() {
    this.dialogRef.close();
  }
}
