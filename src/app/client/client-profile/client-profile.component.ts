import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Client } from '../../models/Client.model';
import * as firebase from 'firebase';
import { City } from 'src/app/models/City.model';
import { CityService } from 'src/app/services/city.service';
interface CitySelect {
  value: City;
  viewValue: string;
}

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss'],
})
export class ClientProfileComponent implements OnInit {
  user: firebase.User;
  cities: CitySelect[] = [];
  client: Client;
  isAuth: boolean;
  clientForm: FormGroup;
  clientkey: String;
  mainImageIsUploading: boolean;
  imageUrl: string;
  imageUploaded: boolean;
  progress: { percentage: number } = { percentage: 0 };
  passwordForm: FormGroup;
  constructor(
    private clientService: ClientService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cityService: CityService
  ) {}

  ngOnInit() {
    this.getCities();
    this.initForm();
    firebase.auth().onAuthStateChanged((client) => {
      this.user = client;
      this.clientkey = client.uid;
      this.getCurrentWorker(client.uid);
    });
    this.passwordForm = this.formBuilder.group({
      newpassword: ['', Validators.pattern(/[0-9a-zA-Z]{6,}/)],
      confirmpassword: ['', Validators.pattern(/[0-9a-zA-Z]{6,}/)],
    });
  }
  getCurrentWorker(clientkey) {
    this.clientService.getClient(clientkey).subscribe((data) => {
      this.client = data as Client;
      const getCity = new City(this.client.city.name);
      getCity.cityKey = this.client.city.cityKey;
      // this.city.value.cityKey= getCity.cityKey
      // this.city.value.name= getCity.name
      // this.city.viewValue=this.worker.city.name
      // this.city.push({value:getCity,viewValue})

      this.clientForm.setValue({
        firstname: this.client.firstname,
        lastname: this.client.lastname,
        email: this.client.email,
        adresse: this.client.adresse,
        phone: this.client.phone,
        city: this.client.city,
        newpassword: '',
        confirmpassword: '',
      });
      console.log(this.client);
    });
  }
  initForm() {
    this.clientForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.email],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      adresse: ['', Validators.required],
      newpassword: ['', Validators.pattern(/[0-9a-zA-Z]{6,}/)],
      confirmpassword: ['', Validators.pattern(/[0-9a-zA-Z]{6,}/)],
    });
  }
  onUpdateCLient() {
    const firstname = this.clientForm.get('firstname').value;
    const lastname = this.clientForm.get('lastname').value;
    const email = this.clientForm.get('email').value;
    const phone = this.clientForm.get('phone').value;
    const city = this.clientForm.get('city').value;
    const adresse = this.clientForm.get('adresse').value;

    const clientupdated = new Client(
      firstname,
      lastname,
      phone,
      city,
      adresse,
      email,
      new Date(),
      new Date()
    );
    this.clientService.updateClient(clientupdated, this.clientkey);
  }
  onChangePassword() {
    const newpassword = this.passwordForm.get('newpassword').value;
    const confirmpassword = this.passwordForm.get('confirmpassword').value;
    if (newpassword === confirmpassword && newpassword != '') {
      // this.authService.passwordChangeUser(newpassword,this.user);
      this.user.updatePassword(newpassword).then(() => {
        console.log('all done');
      });
    }
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
  detectMainImage(event) {
    this.onUploadMainImage(event.target.files[0]);
  }
  onUploadMainImage(file: File) {
    console.log(file);
    this.mainImageIsUploading = true;
    this.clientService
      .uploadMainImage(file, this.progress)
      .then((url: string) => {
        this.imageUrl = url;
        console.log('Url =>' + url);
        this.mainImageIsUploading = false;
        this.imageUploaded = true;
      })
      .then(() => {
        this.clientService.updateProfil(
          this.imageUrl,
          this.clientkey,
          this.client
        );
      });
  }
}
