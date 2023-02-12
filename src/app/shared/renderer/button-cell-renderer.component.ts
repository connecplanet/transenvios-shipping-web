// https://ag-grid.com/angular-data-grid/cell-rendering/
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

export interface IButtonCellParams {
    buttonText?: string;
    buttonClass?: string;
    buttonIcon?: string;
}

@Component({
    selector: 'app-button-renderer',
    template: `
    <button mat-icon-button type="button" matSuffix (click)="onEdit($event)">
      <mat-icon class="icon-size-5 text-primary-400" [svgIcon]="'heroicons_solid:eye'"></mat-icon>&nbsp;
    </button>
    <button mat-icon-button type="button" matSuffix (click)="onDelete($event)">
      <mat-icon class="icon-size-5 text-warn-400" [svgIcon]="'heroicons_solid:trash'"></mat-icon>&nbsp;
    </button>
    `,
})
export class ButtonCellRenderer implements ICellRendererAngularComp {
    public params: any;
    public buttonText: string = '';
    public buttonClass: string = '';
    public buttonIcon!: string;

    agInit(params: ICellRendererParams & IButtonCellParams): void {
        this.params = params;
        this.buttonText = params.buttonText || '';
        this.buttonClass = params.buttonClass || null;
        this.buttonIcon = params.buttonIcon || '';
    }

    refresh(params: ICellRendererParams<any, any> & IButtonCellParams): boolean {
        this.params = params;
        return true;
    }

    onEdit($event: any) {
        if (this.params.onEdit instanceof Function) {
            const value = {
                event: $event,
                rowData: this.params.node.data
            }
            this.params.onEdit(value);
        }
    }

    onDelete($event: any) {
        if (this.params.onDelete instanceof Function) {
            const value = {
                event: $event,
                rowData: this.params.node.data
            }
            this.params.onDelete(value);
        }
    }
}
