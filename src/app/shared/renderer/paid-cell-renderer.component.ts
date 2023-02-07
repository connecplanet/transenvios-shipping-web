import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-paid-renderer',
  template: `
    <b>{{value}}</b>
  `,
  styles: [
    `b {
      color: green
    }`
  ]
})
export class PaidCellRenderer implements ICellRendererAngularComp {

  value: any;

  agInit(params: ICellRendererParams): void {
   this.value = params.value
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}
