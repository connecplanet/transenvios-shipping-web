import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin.component';
import { LayoutModule } from '../../layout/layout.module';
import { ClientsComponent } from './clients/clients.component';
import { RoutesComponent } from './routes/routes.component';
import { TransportersComponent } from './transporters/transporters.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    UsersComponent,
    AdminComponent,
    ClientsComponent,
    RoutesComponent,
    TransportersComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    SharedModule
  ]
})
export class AdminModule { }
