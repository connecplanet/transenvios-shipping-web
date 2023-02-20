import { Component, Input } from '@angular/core';
import { IShipmentPackage } from 'app/core/shipments/shipment-order.types';

@Component({
  selector: 'app-shipment-package-list',
  templateUrl: './shipment-package-list.component.html',
  styleUrls: ['./shipment-package-list.component.scss']
})
export class ShipmentPackageListComponent {
    @Input() items: IShipmentPackage[];
}
