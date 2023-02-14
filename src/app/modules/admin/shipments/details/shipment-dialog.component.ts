import {
    Component,
    OnInit,
    ViewEncapsulation,
    Inject,
    ChangeDetectorRef,
    Injector,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { City } from 'app/core/cities/cities.types';
import {
    Driver,
    Country,
    IDriverCatalog,
} from 'app/core/drivers/drivers.types';
import { Routes } from 'app/core/shipmentOrderRoute/route.types';
import { ShipmentOrderService } from 'app/core/shipments/shipment-order.service';
import {
    IShipmentListItem,
    IShipmentOrder,
} from 'app/core/shipments/shipment-order.types';
import { countries } from 'app/mock-api/apps/users/data';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'shipment-dialog',
    templateUrl: './shipment-dialog.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ShipmentDialogComponent implements OnInit {
    shipmentOrder: IShipmentOrder;
    drivers: IDriverCatalog[];
    shipmentId: number;
    orderForm: FormGroup;
    constructor(
        public matDialogRef: MatDialogRef<ShipmentDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogParams,
        private shipmentService: ShipmentOrderService,
        private formBuilder: FormBuilder
    ) {
        this.shipmentId = dialogParams['id'];
        this.drivers = dialogParams['drivers'];
    }

    ngOnInit(): void {
        this.shipmentService.getDetails(this.shipmentId).subscribe((order) => {
            this.shipmentOrder = order;
            this.createForm(this.shipmentOrder);
        });
    }

    private createForm(order: IShipmentOrder) {
        this.orderForm = this.formBuilder.group({
            'orderId': [order?.orderId, ],
            'applicationDate': [order?.applicationDate, ],
            'paymentState': [null, ],
            'shipmentState': [null, ],
            'transporterId': [null, ],
            'customerDocumentType': [null, ],
            'customerDocumentId': [null, ],
            'customerFirstName': [null, ],
            'customerLastName': [null, ],
            'customerPhone': [null, ],
            'customerEmail': [null, ],
            'senderDocumentType': [null, ],
            'senderDocumentId': [null, ],
            'senderFirstName': [null, ],
            'senderLastName': [null, ],
            'senderCityName': [null, ],
            'senderAddress': [null, ],
            'senderPhone': [null, ],
            'senderEmail': [null, ],
            'recipientDocumentType': [null, ],
            'recipientDocumentId': [null, ],
            'recipientFirstName': [null, ],
            'recipientLastName': [null, ],
            'recipientCityName': [null, ],
            'recipientAddress': [null, ],
            'recipientPhone': [null, ],
            'recipientEmail': [null, ],
            'initialPrice': [null, ],
            'taxes': [null, ],
            'totalPrice': [null, ],
        });
    }

    discard(): void {
        this.matDialogRef.close();
    }

    save(): void {
        if (this.orderForm.valid)
            this.matDialogRef.close({
                event: 'save',
                data: this.orderForm.getRawValue(),
            });
    }

    clearInput(inputName: string): void {
        eval(`this.orderForm.patchValue({${inputName}: ''})`);
    }
}
