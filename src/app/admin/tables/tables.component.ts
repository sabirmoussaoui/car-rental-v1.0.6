import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html', 
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
 lists :any[] = [{price:233},{price:234}]

  constructor() { }
  ngOnInit() {
   
 
}}
