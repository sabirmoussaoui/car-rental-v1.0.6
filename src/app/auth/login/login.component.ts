import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RoleService } from 'src/app/services/role.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private roleService: RoleService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initForm();
  }
  ngOnDestroy() {}

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: [
        '',
        [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)],
      ],
    });
  }
  singUpwithGoogle() {
    this.authService
      .singUpwithGoogle()
      .then((result) => {
        return this.getCurrentuser(result.user.uid);
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
  onLogin() {
    this.spinner.show();
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    console.log(email + 'pssw' + password);
    this.authService.signInUser(email, password).then(
      () => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.getCurrentuser(user.uid);
          }
        });
      },
      (error) => {
        this.spinner.hide();
        console.log(error);
        if (error.code === 'auth/user-not-found') {
          this.openSnackBar(error.message, 'error');
        } else {
          this.openSnackBar(error.message, 'error');
        }
      }
    );
  }
  getCurrentuser(userKey) {
    this.roleService.getRole(userKey).subscribe((user) => {
      this.spinner.hide();
      if (user.data().role === 'worker') {
        this.router.navigate(['/' + user.data().role + '/dashboard']);
      } else {
        this.router.navigate(['home']);
      }
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8000,
    });
  }
}
