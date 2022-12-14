import { Component, OnInit, ViewEncapsulation, Inject, ChangeDetectorRef, Injector } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User, Country } from 'app/core/user-admin/users.types';
import {countries } from 'app/mock-api/apps/users/data';
import { Subject, takeUntil } from 'rxjs';



@Component({
    selector     : 'users-dialog',
    templateUrl  : './users-dialog.component.html',
    encapsulation: ViewEncapsulation.None
})
export class UserDialogComponent implements OnInit
{
    composeForm: UntypedFormGroup;
    user: User;
    countries: Country[];

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        public matDialogRef: MatDialogRef<UserDialogComponent>,
        private _formBuilder: UntypedFormBuilder,
        @Inject(MAT_DIALOG_DATA) public dialogData,
    )
    {
        this.user = dialogData['user'];
    }

    ngOnInit(): void
    {
        this.countries = countries;

        this.composeForm = this._formBuilder.group({
            id     : [this.user.id, []],
            // documentType     : [this.user.documentType, [Validators.required]],
            // documentNumber     : [this.user.documentNumber, [Validators.required]],
            documentType     : [this.user.documentType, []],
            documentNumber     : [this.user.documentNumber, []],
            firstName     : [this.user.firstName, [Validators.required]],
            lastName     : [this.user.lastName, [Validators.required]],
            phone     : [this.user.phone, [Validators.required]],
            email     : [this.user.email, [Validators.required, Validators.email]],
            country: ['co', [Validators.required]],
        });
    }

    discard(): void {
      this.matDialogRef.close();
    }

    save(): void {
        debugger;
        this.matDialogRef.close({event: 'saveUser', data: this.composeForm.getRawValue() });
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
