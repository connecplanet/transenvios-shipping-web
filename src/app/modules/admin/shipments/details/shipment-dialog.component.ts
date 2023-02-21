import { Component, OnInit, ViewEncapsulation, Inject, ChangeDetectorRef, Injector } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDriverCatalog } from 'app/core/drivers/drivers.types';
import { ShipmentOrderService } from 'app/core/shipments/shipment-order.service';
import { IShipmentState, IShipmentOrder } from 'app/core/shipments/shipment-order.types';
import { paymentStates, shipmentStates } from 'app/mock-api/apps/shipments/data';

@Component({
    selector: 'shipment-dialog',
    templateUrl: './shipment-dialog.component.html',
    styleUrls: ['./shipment-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ShipmentDialogComponent implements OnInit
{
    shipmentId: number;
    orderForm: UntypedFormGroup;
    shipmentStates: IShipmentState[];
    paymentStates: IShipmentState[];
    drivers: IDriverCatalog[];
    order: IShipmentOrder = {};

    constructor(
        public matDialogRef: MatDialogRef<ShipmentDialogComponent>,
        private _formBuilder: UntypedFormBuilder,
        @Inject(MAT_DIALOG_DATA) public dialogData,
        private shipmentService: ShipmentOrderService,
    )
    {
        this.shipmentId = dialogData['id'];
        this.drivers = dialogData['drivers'];
    }

    ngOnInit(): void
    {
        this.shipmentStates = shipmentStates;
        this.paymentStates = paymentStates;
        this.createForm();

        this.shipmentService.getDetails(this.shipmentId).subscribe((order) => {
            this.order = order;
            setTimeout(() => this.setNewValues(), 100);
        });
    }

    private createForm() {
        this.orderForm = this._formBuilder.group({
            id: [this.order?.orderId, [Validators.nullValidator]],
            applicationDate: [this.order?.applicationDate, [Validators.nullValidator]],
            paymentState: [this.order?.paymentState, [Validators.required]],
            shipmentState: [this.order?.shipmentState, [Validators.required]],
            transporterId: [this.order?.transporterId, [Validators.required]],
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

        if(this.orderForm.valid) {
            this.matDialogRef.close({
                event: 'saveOrder',
                data: this.orderForm.getRawValue()
            });
        }
    }

    clearInput(inputName: string): void {
        eval(`this.orderForm.patchValue({${inputName}: ''})`);
    }
}
