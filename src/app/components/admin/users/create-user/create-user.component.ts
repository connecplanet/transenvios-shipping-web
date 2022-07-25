import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  roles: any[] = [
    { value: 'MGR', viewValue: 'Administrador' }, // MANAGER
    { value: 'APL', viewValue: 'Solicitante' }, // APPLICANT
    { value: 'SNR', viewValue: 'Remitente' }, // SENDER
    { value: 'RCP', viewValue: 'Destinatario' }, // RECIPIENT
  ];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      role: ['MGR', Validators.required],
    });
  }

  ngOnInit(): void {}

  AddUser() {
    const user: User = {
      email: this.form.value.email,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      phone: this.form.value.phone,
      role: this.form.value.role,
    };
    this.userService.addUser(user);
    this.router.navigate(['/admin/users']);

    this.snackBar.open(
      'El usuario fue adicionado con exito', '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
