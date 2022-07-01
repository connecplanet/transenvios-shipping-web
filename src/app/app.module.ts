import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { ClientsComponent } from './components/clients/clients.component';
import { UsersComponent } from './components/users/users.component';
import { ShipmentOrdersComponent } from './components/shipment-orders/shipment-orders.component';
import { TransportersComponent } from './components/transporters/transporters.component';
import { RoutesComponent } from './components/routes/routes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientsComponent,
    UsersComponent,
    ShipmentOrdersComponent,
    TransportersComponent,
    RoutesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
