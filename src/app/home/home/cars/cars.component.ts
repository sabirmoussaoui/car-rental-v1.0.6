import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
  styles: [
    `
      .star {
        position: relative;
        display: inline-block;
        font-size: 3rem;
        color: #d3d3d3;
      }
      .full {
        color: red;
      }
      .half {
        position: absolute;
        display: inline-block;
        overflow: hidden;
        color: red;
      }
    `,
  ],
})
export class CarsComponent implements OnInit {
  @Input() car: any;

  constructor() {}

  ngOnInit(): void {}
  getOriginPrice(price) {
    return Number(price) + 10;
  }
}
