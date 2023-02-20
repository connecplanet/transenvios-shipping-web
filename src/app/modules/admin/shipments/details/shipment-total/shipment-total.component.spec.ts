import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentTotalComponent } from './shipment-total.component';

describe('ShipmentTotalComponent', () => {
  let component: ShipmentTotalComponent;
  let fixture: ComponentFixture<ShipmentTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentTotalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
