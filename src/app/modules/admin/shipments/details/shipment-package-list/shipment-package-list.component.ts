import { Component, Input } from '@angular/core';
import { IShipmentPackage } from 'app/core/shipments/shipment-order.types';

@Component({
  selector: 'app-shipment-package-list',
  templateUrl: './shipment-package-list.component.html',
  styleUrls: ['./shipment-package-list.component.scss']
})
export class ShipmentPackageListComponent {
    packages: IShipmentPackage[]
    index: number = 0;
    @Input() set items(value: IShipmentPackage[]) {
      if(value){
        for(var index = 0; index < value.length; index++){
            value[index].lineId = index + 1;
        }
      }
      this.packages = value;
    }
}
