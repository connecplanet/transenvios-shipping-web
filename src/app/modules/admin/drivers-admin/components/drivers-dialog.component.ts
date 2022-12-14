import { Component, OnInit, ViewEncapsulation, Inject, ChangeDetectorRef, Injector } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    driver: Driver;
    countries: Country[];

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        public matDialogRef: MatDialogRef<DriversDialogComponent>,
        private _formBuilder: UntypedFormBuilder,
        @Inject(MAT_DIALOG_DATA) public dialogData,
    )
    {
        this.driver = dialogData['driver'];
    }

    ngOnInit(): void
    {
        this.countries = countries;

        this.composeForm = this._formBuilder.group({
            id     : [this.driver.id, []],
            // documentType     : [this.driver.documentType, [Validators.required]],
            // documentNumber     : [this.driver.documentNumber, [Validators.required]],
            documentType     : [this.driver.documentType, []],
            documentNumber     : [this.driver.documentNumber, []],
            firstName     : [this.driver.firstName, [Validators.required]],
            lastName     : [this.driver.lastName, [Validators.required]],
            phone     : [this.driver.phone, [Validators.required]],
            email     : [this.driver.email, [Validators.required, Validators.email]],
            country: ['co', [Validators.required]],
        });
    }

    discard(): void {
      this.matDialogRef.close();
    }

    save(): void {
        this.matDialogRef.close({event: 'saveDriver', data: this.composeForm.getRawValue() });
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
