import { Component, OnInit, ViewEncapsulation, Inject, ChangeDetectorRef, Injector } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client, Country } from 'app/core/clients/clients.types';
import {countries } from 'app/mock-api/apps/users/data';
import { Subject, takeUntil } from 'rxjs';



@Component({
    selector     : 'clients-dialog',
    templateUrl  : './clients-dialog.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ClientsDialogComponent implements OnInit
{
    composeForm: UntypedFormGroup;
    client: Client;
    countries: Country[];

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    isClient: boolean = false;

    constructor(
        public matDialogRef: MatDialogRef<ClientsDialogComponent>,
        private _formBuilder: UntypedFormBuilder,
        @Inject(MAT_DIALOG_DATA) public dialogData,
    )
    {
        this.client = dialogData['client'];
        this.isClient = dialogData['isClient'];
    }

    ngOnInit(): void
    {
        this.countries = countries;

        this.composeForm = this._formBuilder.group({
            id     : [this.client.id, []],
            // documentType     : [this.client.documentType, [Validators.required]],
            // documentNumber     : [this.client.documentNumber, [Validators.required]],
            documentType     : [this.client.documentType, []],
            documentId     : [this.client.documentId, []],
            firstName     : [this.client.firstName, [Validators.required]],
            lastName     : [this.client.lastName, [Validators.required]],
            phone     : [this.client.phone, [Validators.required]],
            email     : [this.client.email, [Validators.required, Validators.email]],
            country: ['co', [Validators.required]],
        });
    }

    discard(): void {
      this.matDialogRef.close();
    }

    save(): void {
        
        this.matDialogRef.close({event: 'saveClient', data: this.composeForm.getRawValue() });
    }

    clearInput(inputName: string): void {
        eval(`this.composeForm.patchValue({${inputName}: ''})`);
    }

     getCountryByCode(): Country
     {
        const iso  = this.composeForm.get('country').value;
        return this.countries.find(country => country.iso === iso);
     }
}
