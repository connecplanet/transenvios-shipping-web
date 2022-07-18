import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';

const USERS: User[] = [
  {firstName: 'Juan', lastName: 'Valdez', email: 'ndi91049@jeoce.com', phone: '202-555-0139'}
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'actions'];
  dataSource = USERS;
  
  constructor() { }

  ngOnInit(): void {
  }

}
