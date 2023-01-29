import { Component, OnInit, ViewEncapsulation, Inject, ChangeDetectorRef, Injector } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { City } from 'app/core/cities/cities.types';
import { Driver, Country } from 'app/core/drivers/drivers.types';
import { Routes } from 'app/core/shipmentOrderRoute/route.types';
import {countries } from 'app/mock-api/apps/users/data';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector     : 'shipment-dialog',
    templateUrl  : './shipment-dialog.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ShipmentDialogComponent implements OnInit
{
    composeForm: UntypedFormGroup;
    isCreate: boolean = false;
    route: Routes;
    countries: Country[];
    cities: City[];

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        public matDialogRef: MatDialogRef<ShipmentDialogComponent>,
        private _formBuilder: UntypedFormBuilder,
        @Inject(MAT_DIALOG_DATA) public dialogData,
    )
    {
        this.route = dialogData['route'];
        this.cities = dialogData['objCities'];
        this.isCreate = (this.route == null)
    }

    ngOnInit(): void
    {
        this.countries = countries;

        this.composeForm = this._formBuilder.group({
            id     : [this.route?.id, []],
            fromCityCode     : [this.route?.fromCityCode, [Validators.required]],
            toCityCode     : [this.route?.toCityCode, [Validators.required]],
            initialKiloPrice     : [this.route?.initialKiloPrice, [Validators.required]],
            additionalKiloPrice     : [this.route?.additionalKiloPrice, [Validators.required]],
            priceCm3     : [this.route?.priceCm3, [Validators.required]],
        });
    }

    discard(): void {
      this.matDialogRef.close();
    }

    save(): void {

        if(this.composeForm.valid)
            this.matDialogRef.close({event: this.isCreate ?'addRoute' :'saveRoute', data: this.composeForm.getRawValue() });
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
