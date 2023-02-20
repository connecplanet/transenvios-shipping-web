import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IShipmentPerson } from 'app/core/shipments/shipment-order.types';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-shipment-person-info',
  templateUrl: './shipment-person-info.component.html',
  styleUrls: ['./shipment-person-info.component.scss']
})
export class ShipmentPersonInfoComponent implements OnInit, OnDestroy {
  private personSubject = new BehaviorSubject<IShipmentPerson>({} as IShipmentPerson);
  public person = {} as IShipmentPerson;

  @Input()
  set data(currentPerson: IShipmentPerson) {
    this.personSubject.next(currentPerson);
  }

  get data(): IShipmentPerson {
    return this.personSubject.getValue();
  }

  ngOnInit(): void {
    this.personSubject.subscribe(data => { this.person = data; });
  }

  ngOnDestroy(): void {
    this.personSubject?.unsubscribe();
  }
}
