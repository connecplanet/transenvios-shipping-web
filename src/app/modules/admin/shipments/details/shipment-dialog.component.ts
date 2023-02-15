import { Component, OnInit, ViewEncapsulation, Inject, ChangeDetectorRef, Injector } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { City } from 'app/core/cities/cities.types';
import { Driver, Country, IDriverCatalog } from 'app/core/drivers/drivers.types';
import { Routes } from 'app/core/shipmentOrderRoute/route.types';
import { ICatalog, IShipmentOrder } from 'app/core/shipments/shipment-order.types';
import { shipmentStates } from 'app/mock-api/apps/shipments/data';
import {countries } from 'app/mock-api/apps/users/data';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector     : 'shipment-dialog',
    templateUrl  : './shipment-dialog.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./shipment-dialog.component.scss']
})
export class ShipmentDialogComponent implements OnInit
{
    shipmentId: number;
    order: IShipmentOrder;

    orderForm: UntypedFormGroup;
    isCreate: boolean = false;
    route: Routes;
    shipmentStates: ICatalog[];
    drivers: IDriverCatalog[];

    constructor(
        public matDialogRef: MatDialogRef<ShipmentDialogComponent>,
        private _formBuilder: UntypedFormBuilder,
        @Inject(MAT_DIALOG_DATA) public dialogData,
    )
    {
        this.route = dialogData['route'];
        this.shipmentId = dialogData['id'];
        this.drivers = dialogData['drivers'];

        this.isCreate = (this.route == null)
    }

    ngOnInit(): void
    {
        this.shipmentStates = shipmentStates;

        this.orderForm = this._formBuilder.group({
            id: [this.order?.orderId, []],
            shipmentState: [this.order?.shipmentState, [Validators.required]],
            toCityCode: [this.route?.toCityCode, [Validators.required]],
            initialKiloPrice: [this.route?.initialKiloPrice, [Validators.required]],
            additionalKiloPrice: [this.route?.additionalKiloPrice, [Validators.required]],
            priceCm3     : [this.route?.priceCm3, [Validators.required]],
        });
    }

    discard(): void {
      this.matDialogRef.close();
    }

    save(): void {

        if(this.orderForm.valid)
            this.matDialogRef.close({event: this.isCreate ?'addRoute' :'saveRoute', data: this.orderForm.getRawValue() });
    }

    clearInput(inputName: string): void {
        eval(`this.orderForm.patchValue({${inputName}: ''})`);
    }
/*
     getCountryByCode(): Country
     {
        const iso  = this.orderForm.get('country').value;
        return this.shipmentStates.find(country => country.iso === iso);
     }
     */
}
