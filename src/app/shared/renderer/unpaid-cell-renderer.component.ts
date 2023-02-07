import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-unpaid-renderer',
  template: `
    <b>{{value}}</b>
  `,
  styles: [
    `b {
      color: red
    }`
  ]
})
export class UnPaidCellRenderer implements ICellRendererAngularComp {
  value: any;

  agInit(params: ICellRendererParams): void {
   this.value = params.value
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}
