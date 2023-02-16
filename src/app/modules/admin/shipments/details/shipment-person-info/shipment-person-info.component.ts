import { Component, Input } from '@angular/core';
import { IShipmentPerson } from 'app/core/shipments/shipment-order.types';

@Component({
  selector: 'app-shipment-person-info',
  templateUrl: './shipment-person-info.component.html',
  styleUrls: ['./shipment-person-info.component.scss']
})
export class ShipmentPersonInfoComponent {
    @Input() title!: string;
    @Input() person!: IShipmentPerson;
}
