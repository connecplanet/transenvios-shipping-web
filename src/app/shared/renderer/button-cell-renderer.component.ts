import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
    selector: 'app-button-renderer',
    template: `
    <button (click)="onEditClicked($event)">Edit</button>&nbsp;
    <button (click)="onDeleteClicked($event)">Delete</button> `,
})
export class ButtonCellRenderer implements ICellRendererAngularComp {
    private params: any;

    refresh(params: ICellRendererParams<any, any>): boolean {
        this.params = params;
        return true;
    }

    agInit(params: ICellRendererParams): void {
        this.params = params;
    }

    onEditClicked(event: any) {
        this.params.editClicked(this.params.data.id);
    }

    onDeleteClicked(event: any) {
        this.params.deleteClicked(this.params.data.id);
    }
}
