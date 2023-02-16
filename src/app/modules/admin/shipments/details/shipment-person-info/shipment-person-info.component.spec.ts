import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentPersonInfoComponent } from './shipment-person-info.component';

describe('ShipmentPersonInfoComponent', () => {
  let component: ShipmentPersonInfoComponent;
  let fixture: ComponentFixture<ShipmentPersonInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentPersonInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentPersonInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
