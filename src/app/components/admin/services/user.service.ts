import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [
    {firstName: 'Cameron', lastName: 'Cuffe', email: 'ndi91049@jeoce.com', phone: '202-555-0139', role: 'MGR'},
    {firstName: 'Wallis', lastName: 'Day', email: 'saq48807@xcoxc.com', phone: '202-555-0152', role: 'MGR'},
    {firstName: 'Shaun', lastName: 'Sips', email: 'gtx64550@cdfaq.com', phone: '202-555-0165', role: 'MGR'},
    {firstName: 'Georgina', lastName: 'Campbell', email: 'pit12702@cdfaq.com', phone: '202-555-0156', role: 'MGR'},
    {firstName: 'Ann', lastName: 'Ogbomo', email: 'spe72515@jeoce.com', phone: '202-555-0123', role: 'MGR'},
    {firstName: 'Blake', lastName: 'Ritson', email: 'amk18149@xcoxc.com', phone: '202-555-0154', role: 'MGR'},
    {firstName: 'Aaron', lastName: 'Pierre', email: 'kbi65138@cdfaq.com', phone: '202-555-0119', role: 'MGR'},
    {firstName: 'Hannah', lastName: 'Waddingham', email: 'kjb04820@xcoxc.com', phone: '202-555-0109', role: 'MGR'},
    {firstName: 'Emmett', lastName: 'Scanlan', email: 'gna38961@cdfaq.com', phone: '202-555-0157', role: 'MGR'},
    {firstName: 'Ian', lastName: 'McElhinney', email: 'ijw09156@cdfaq.com', phone: '202-555-0170', role: 'MGR'},
    {firstName: 'Rasmus', lastName: 'Hardiker', email: 'ogs93268@jeoce.com', phone: '202-555-0173', role: 'MGR'},
    {firstName: 'Elliot', lastName: 'Cowan', email: 'lyn05510@cdfaq.com', phone: '202-555-0106', role: 'MGR'},
    {firstName: 'Colin', lastName: 'Salmon', email: 'mno78593@jeoce.com', phone: '202-555-0187', role: 'MGR'},
    {firstName: 'Sonita', lastName: 'Henry', email: 'yva43496@cdfaq.com', phone: '202-555-0144', role: 'MGR'}
  ];

  constructor() { }

  getUsers() {
    return this.users.slice();
  }

  deleteUser(index: number){
    this.users.splice(index, 1);
  }

  addUser(user: User) {
    this.users.unshift(user);
  }
}
