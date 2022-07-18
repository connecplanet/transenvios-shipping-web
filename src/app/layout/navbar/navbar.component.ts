import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/models/menu.model';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menu: Menu[] = [];

  constructor(private router: Router, private menuService: MenuService) { }

  ngOnInit(): void {
    this.loadMenu();
  }

  navigate(path: string) {
    console.log('path: ', path);
    this.router.navigate([path]);
  }

  loadMenu() {
    this.menuService.getMenu().subscribe(data => {
      this.menu = data;
    })
  }

}
