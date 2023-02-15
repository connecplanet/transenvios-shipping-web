import { Component, OnInit, ViewEncapsulation, Inject, ChangeDetectorRef, Injector } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { City } from 'app/core/cities/cities.types';
import { Driver, Country, IDriverCatalog } from 'app/core/drivers/drivers.types';
import { Routes } from 'app/core/shipmentOrderRoute/route.types';
import { ShipmentOrderService } from 'app/core/shipments/shipment-order.service';
import { IShipmentState, IShipmentOrder } from 'app/core/shipments/shipment-order.types';
import { paymentStates, shipmentStates } from 'app/mock-api/apps/shipments/data';
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
    shipmentStates: IShipmentState[];
    paymentStates: IShipmentState[]
    drivers: IDriverCatalog[];

    constructor(
        public matDialogRef: MatDialogRef<ShipmentDialogComponent>,
        private _formBuilder: UntypedFormBuilder,
        @Inject(MAT_DIALOG_DATA) public dialogData,
        private shipmentService: ShipmentOrderService,
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
        this.paymentStates = paymentStates;
        this.createForm();

        this.shipmentService.getDetails(this.shipmentId).subscribe((order) => {
            this.order = order;
            setTimeout(() => this.setNewValues(), 1000);
        });
    }

    private createForm() {
        this.orderForm = this._formBuilder.group({
            id: [this.order?.orderId, []],
            applicationDate: [this.order?.applicationDate, [Validators.required]],
            paymentState: [this.order?.paymentState, [Validators.required]],
            shipmentState: [this.order?.shipmentState, [Validators.required]],
            transporterId: [this.order?.transporterId, [Validators.required]],
            initialKiloPrice: [this.route?.initialKiloPrice, [Validators.required]],
            additionalKiloPrice: [this.route?.additionalKiloPrice, [Validators.required]],
            priceCm3: [this.route?.priceCm3, [Validators.required]],
        });
    }

    private setNewValues(){
        this.orderForm.controls['id'].setValue(this.order?.orderId);
        this.orderForm.controls['applicationDate'].setValue(this.order?.applicationDate);
        this.orderForm.controls['paymentState'].setValue(this.order?.paymentState);
        this.orderForm.controls['shipmentState'].setValue(this.order?.shipmentState);
        this.orderForm.controls['transporterId'].setValue(this.order?.transporterId);
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
