import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import { ClientsComponent } from 'app/modules/admin/clients-admin/clients.component';
import { DriversComponent } from 'app/modules/admin/drivers-admin/drivers.component';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: ExampleComponent
    },
    {
        path     : 'clients',
        component: ClientsComponent
    },
    {
        path     : 'drivers',
        component: DriversComponent
    }
];

@NgModule({
    declarations: [
        ExampleComponent
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes)
    ]
})
export class ExampleModule
{
}
