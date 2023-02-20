import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shipment-total',
  templateUrl: './shipment-total.component.html',
  styleUrls: ['./shipment-total.component.scss']
})
export class ShipmentTotalComponent {
    @Input() initialPrice = '';
    @Input() taxes = '';
    @Input() totalPrice = '';
}
