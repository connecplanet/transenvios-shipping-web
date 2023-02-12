import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SettingsComponent } from 'app/modules/admin/settings/settings.component';
import { ClientsComponent } from 'app/modules/admin/clients-admin/clients.component';
import { DriversComponent } from 'app/modules/admin/drivers-admin/drivers.component';
import { RouteComponent } from '../route-admin/route.component';
import { ShipmentListComponent } from '../shipments/shipment-list.component';

const exampleRoutes: Route[] = [
    { path: '',          component: SettingsComponent },
    { path: 'clients',   component: ClientsComponent, data: { filterOptions : 'Clients' } },
    { path: 'users',     component: ClientsComponent, data: { filterOptions : 'Users' } },
    { path: 'drivers',   component: DriversComponent },
    { path: 'route',     component: RouteComponent },
    { path: 'shipments', component: ShipmentListComponent }
];

@NgModule({
    declarations: [
        SettingsComponent
    ],
    imports: [
        RouterModule.forChild(exampleRoutes)
    ]
})
export class SettingsModule
{
}
