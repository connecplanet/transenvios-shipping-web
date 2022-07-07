import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentOrdersComponent } from './shipment-orders.component';

describe('ShipmentOrdersComponent', () => {
  let component: ShipmentOrdersComponent;
  let fixture: ComponentFixture<ShipmentOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
