import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  submit(): void {
    const email = this.form.value.user;
    const password = this.form.value.password;

    if (email === 'ediaze@gmail.com' && password === 'admin123') {
      this.fakeLoading();
    } else {
      this.showError('Correo o contraseña son inválidos', 'Login');
      this.form.reset();
    }
  }

  showError(
    message: string,
    title: string = '',
    durationInSeconds: number = 5
  ) {
    this._snackBar.open(message, title, {
      duration: durationInSeconds * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['dashboard'])
    }, 1500);
  }
}
