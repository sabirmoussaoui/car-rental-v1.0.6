import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.scss']
})
export class ClientRegisterComponent implements OnInit {

  constructor(
    private router : Router
    ) { }

  ngOnInit(): void {
  }
  onSubmit(){
    return this.router.navigate(['/client/dashbord'])
  }
}
