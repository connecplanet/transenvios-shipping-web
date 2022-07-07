import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from '../../layout/layout.module';
import { ShipmentOrdersComponent } from './shipment-orders/shipment-orders.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    ShipmentOrdersComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    LayoutModule
  ]
})
export class DashboardModule { }
