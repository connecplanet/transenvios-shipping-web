import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  roles: any[] = [
    {value: 'MGR', viewValue: 'Administrador'}, // MANAGER
    {value: 'APL', viewValue: 'Solicitante'},   // APPLICANT
    {value: 'SNR', viewValue: 'Remitente'},     // SENDER
    {value: 'RCP', viewValue: 'Destinatario'},  // RECIPIENT
  ];
  form: FormGroup

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

}
