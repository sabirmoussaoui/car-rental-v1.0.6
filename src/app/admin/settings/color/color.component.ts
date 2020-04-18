import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ColorService } from 'src/app/services/color.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ColorUpdateDialogComponent } from './color-update-dialog/color-update-dialog.component';
import { Color } from 'src/app/models/Color.model';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {
  colors: Array<any>;
  colorForm: FormGroup;
  constructor(
    private colorService: ColorService, private formBuilder: FormBuilder, private dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.initColorForm();
    this.getColors();
  }
    //Dialod
    openDialog(colorKey, name) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        name: name
      };
      const dialogRef = this.dialog.open(ColorUpdateDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => {
        if (data != undefined) {
          console.log("Dialog output:", data.name + colorKey);
          this.onUpdateColor(colorKey, data);
        }
      });
    }
    //  Setting Colors
    initColorForm() {
      this.colorForm = this.formBuilder.group({ 'name': ['', Validators.required] });
    }

    getColors() {
      this.colorService.getColorsSnapshot()
        .subscribe(result => {
          this.colors = result;
        });
    }
    onSaveColor() {
      const color = new Color(this.colorForm.get("name").value);
      this.colorService.createColor(color);
    }
    onUpdateColor(colorKey, data) {
      const colorUpdate = new Color(data.name);
      this.colorService.updateColor(colorKey, colorUpdate);
    }

    onDeleteColor(colorKey) {
      console.log(colorKey);
      this.colorService.deleteColor(colorKey)
        .then(res => {
          console.log("safi tmsseh");
        }, err => {
          console.log(err);
        });
    }

}
