import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentPackageListComponent } from './shipment-package-list.component';

describe('ShipmentPackageListComponent', () => {
  let component: ShipmentPackageListComponent;
  let fixture: ComponentFixture<ShipmentPackageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentPackageListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentPackageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
