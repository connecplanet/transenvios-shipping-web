import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
    constructor() {}

    ngOnInit() {
        if (!localStorage.getItem('doRefresh')) {
            localStorage.setItem('doRefresh', 'no reload');
            location.reload();
        } else {
            localStorage.removeItem('doRefresh');
        }
    }
}
