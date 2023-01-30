import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
    selector: 'btn-cell-renderer',
    template: ` <button (click)="onButtonClicked($event)">Click me!</button> `,
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

    onButtonClicked(event: any) {
        console.log(this.params.data);
        this.params.clicked(this.params.data.id);
    }
}
