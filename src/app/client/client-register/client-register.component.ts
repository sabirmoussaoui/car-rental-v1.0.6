import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { City } from 'src/app/models/City.model';
import { CityService } from 'src/app/services/city.service';
import { AuthService } from 'src/app/services/auth.service';
import { RoleService } from 'src/app/services/role.service';
import { Client } from 'src/app/models/Client.model';
import * as firebase from 'firebase';
import { ClientService } from 'src/app/services/client.service';
interface CitySelect {
  value: City;
  viewValue: string;
}
@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.scss'],
})
export class ClientRegisterComponent implements OnInit {
  clientForm: FormGroup;
  cities: CitySelect[] = [];
  client: Client;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private authService: AuthService,
    private roleservice: RoleService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.getCities();
    this.initForm();
  }
  onSubmit() {
    // return this.router.navigate(['/client/dashbord'])
    const firstname = this.clientForm.get('firstname').value;
    const lastname = this.clientForm.get('lastname').value;
    const email = this.clientForm.get('email').value;
    const phone = this.clientForm.get('phone').value;
    const password = this.clientForm.get('password').value;
    const confirmPassword = this.clientForm.get('confirmPassword').value;
    const city = this.clientForm.get('city').value;
    const adresse = this.clientForm.get('adresse').value;
    if (password === confirmPassword) {
      const client = new Client(
        firstname,
        lastname,
        phone,
        city,
        adresse,
        email,
        new Date(),
        new Date()
      );
      console.log(client);
      this.authService.createUser(client, password).then(
        (clientkey) => {
          this.clientService.createClient(clientkey, client).then(
            () => {
              this.roleservice.addRole(clientkey, 'client');
              this.router.navigate(['/client/dashboard']);
            },
            (err) => {
              console.log('clinet not register');
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      console.log('not ok');
    }
    // console.log(city);
    // return this.router.navigate(['/client/dashboard']);
  }
  initForm() {
    this.clientForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.email],
      phone: ['', Validators.required],
      password: [
        '',
        [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)],
      ],
      confirmPassword: [
        '',
        [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)],
      ],

      city: ['', Validators.required],
      adresse: ['', Validators.required],
    });
  }
  getCities() {
    this.cityService.getCities().subscribe((result) => {
      result.forEach((doc) => {
        const city = new City(doc.data().name);
        city.cityKey = doc.id;
        this.cities.push({ value: city, viewValue: city.name });
      });
    });
  }

  singUpwithGoogle() {
    this.authService
      .singUpwithGoogle()
      .then((result) => {
        return this.createClient(result.user);
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log(error);
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }
  createClient(user) {
    var fullname = user.displayName;
    var splitfullname = fullname.split(' ');
    const city = new City('');
    city.cityKey = '';
    this.client = new Client(
      splitfullname[1],
      splitfullname[0],
      '',
      city,
      '',
      user.email,
      new Date(),
      new Date()
    );
    this.client.profil = user.photoURL ? user.photoURL : '';
    this.client.clientKey = user.uid;
    this.clientService.createClient(this.client.clientKey, this.client).then(
      () => {
        this.roleservice.addRole(this.client.clientKey, 'client').then(() => {
          this.router.navigate(['/client/dashboard']);
        });
      },
      (err) => {
        console.log('clinet not register');
      }
    );
  }
}
