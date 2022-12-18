import { Component, OnInit, ViewEncapsulation, Inject, ChangeDetectorRef, Injector } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { City } from 'app/core/cities/cities.types';
import { Driver, Country } from 'app/core/drivers/drivers.types';
import {countries } from 'app/mock-api/apps/users/data';
import { Subject, takeUntil } from 'rxjs';



@Component({
    selector     : 'drivers-dialog',
    templateUrl  : './drivers-dialog.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DriversDialogComponent implements OnInit
{
    composeForm: UntypedFormGroup;
    isCreate: boolean = false;
    driver: Driver;
    countries: Country[];
    cities: City[];

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        public matDialogRef: MatDialogRef<DriversDialogComponent>,
        private _formBuilder: UntypedFormBuilder,
        @Inject(MAT_DIALOG_DATA) public dialogData,
    )
    {
        this.driver = dialogData['driver'];
        this.cities = dialogData['objCities'];
        
        this.isCreate = (this.driver == null)
    }

    ngOnInit(): void
    {
        this.countries = countries;

        this.composeForm = this._formBuilder.group({
            id     : [this.driver?.id, []],
            documentType     : [this.driver?.documentType, [Validators.required]],
            documentId     : [this.driver?.documentId, [Validators.required]],
            firstName     : [this.driver?.firstName, [Validators.required]],
            lastName     : [this.driver?.lastName, [Validators.required]],
            phone     : [this.driver?.phone, [Validators.required]],
            email     : [this.driver?.email, [Validators.required, Validators.email]],
            country: ['co', [Validators.required]],
            pickUpCityId: [this.driver?.pickUpCityId, [Validators.required]],
            pickUpAddress: [this.driver?.pickUpAddress, [Validators.required]],
        });
    }

    discard(): void {
      this.matDialogRef.close();
    }

    save(): void {
        if(this.composeForm.valid)
            this.matDialogRef.close({event: this.isCreate ?'addDriver' :'saveDriver', data: this.composeForm.getRawValue() });
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
