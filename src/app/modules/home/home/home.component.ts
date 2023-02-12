import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector     : 'home',
    templateUrl  : './home.component.html',
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit
{
    constructor()
    {
    }

    ngOnInit() {
        if (!localStorage.getItem('refresh')) {
          localStorage.setItem('refresh', 'no reload');
          location.reload();
        } else {
          localStorage.removeItem('refresh');
        }
      }
}
