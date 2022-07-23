import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = [
    'email',
    'firstName',
    'lastName',
    'phone',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadUsers() {
    this.users = this.userService.getUsers();
    this.dataSource = new MatTableDataSource(this.users);
  }

  deleteUser(index: number) {
    this.userService.deleteUser(index);
    this.loadUsers();
    this.ngAfterViewInit();

    const durationInSeconds = 1.5;
    this.snackBar.open('El usuario fue eliminado con exito', '', {
      duration: durationInSeconds * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
