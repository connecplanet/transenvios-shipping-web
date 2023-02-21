import {
    Component,
    ViewEncapsulation,
    OnInit,
    ViewChild,
    ChangeDetectorRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FuseAlertService } from '@fuse/components/alert';
import { CellClickedEvent, ColDef, GridOptions, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { ButtonCellRenderer, IButtonCellParams } from 'app/shared/renderer/button-cell-renderer.component';
import { ShipmentOrderService } from 'app/core/shipments/shipment-order.service';
import { IShipmentListItem } from 'app/core/shipments/shipment-order.types';
import { UnPaidCellRenderer } from 'app/shared/renderer/unpaid-cell-renderer.component';
import { PaidCellRenderer } from 'app/shared/renderer/paid-cell-renderer.component';
import { ShipmentDialogComponent } from './details/shipment-dialog.component';
import { DriverAdminService } from 'app/core/drivers/drivers.service';
import { IDriverCatalog } from 'app/core/drivers/drivers.types';

@Component({
    selector: 'shipment-list',
    templateUrl: './shipment-list.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ShipmentListComponent implements OnInit {
    filterLabel: string;
    filterDays: number;
    rowData$!: Observable<IShipmentListItem[]>;
    drivers: IDriverCatalog[];
    gridOptions: GridOptions = {
        columnDefs: this.createColumnDefs(),
        defaultColDef: this.createDefaultColDef(),
    }

    @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

    alertConf: {
        type: string;
        title: string;
        message: string;
    } = { type: '', title: '', message: '' };

    constructor(
        private shipmentService: ShipmentOrderService,
        private matDialog: MatDialog,
        private fuseConfirmationService: FuseConfirmationService,
        private changeDetectorRef: ChangeDetectorRef,
        private fuseAlertService: FuseAlertService,
        private driverService: DriverAdminService
    ) {
    }

    ngOnInit(): void {
        if (localStorage.getItem('filterDays')){
            this.filterLabel = localStorage.getItem('filterLabel');
            this.filterDays = +localStorage.getItem('filterDays');
        }
        else {
            this.updateFilterDays('30 días', 30);
        }
        this.driverService.getCatalog().subscribe((response) => {
            this.drivers = response;
        });
    }

    onGridReady(params: GridReadyEvent) {
        this.fetchData();
    }

    private createColumnDefs()
    {
        const colDefs: ColDef[] = [
            { field: 'id', headerName: 'ID', maxWidth: 70 },
            { field: 'applicationDate', headerName: 'Fecha', maxWidth: 110 },
            { field: 'customerName', headerName: 'Nombre Cliente', maxWidth: 180 },
            { field: 'phone', headerName: 'Teléfono', maxWidth: 111 },
            { field: 'fromCity', headerName: 'Origen', maxWidth: 110 },
            { field: 'toCity', headerName: 'Destino', maxWidth: 110 },
            {
                field: 'paymentState',
                headerName: 'Pago',
                maxWidth: 100,
                cellRendererSelector: (params: ICellRendererParams) => {
                    if(params.value === 'Sin Pagar') {
                        return { component: UnPaidCellRenderer, params: {} };
                    }
                    return { component: PaidCellRenderer, params: {} };
                }
            },
            { field: 'transporterName', headerName: 'Transportador', maxWidth: 150 },
            { field: 'shipmentState', headerName: 'Estado Envío', maxWidth: 130 },
            {
                field: 'shipmentPrice',
                headerName: 'Costo Envío',
                maxWidth: 130,
                cellStyle: { "text-align": "center" },
                cellRenderer: (params: ICellRendererParams) => {
                    return `$ ${params.value}`;
                }
            },
            {
                field: 'actions',
                headerName: 'Acciones',
                maxWidth: 120,
                cellRenderer: ButtonCellRenderer,
                cellRendererParams: {
                    onDelete: this.onDeleteClicked.bind(this),
                    onEdit: this.onEditClicked.bind(this),
                } as IButtonCellParams,
            }
        ];
        return colDefs;
    }

    private createDefaultColDef(){
        const defaultColDef: ColDef = {
            sortable: true,
            filter: true,
            resizable: true
        };
        return defaultColDef;
    }

    private updateFilterDays(filterLabel: string, filterDays: number) {
        this.filterLabel = filterLabel;
        this.filterDays = filterDays;
        localStorage.setItem('filterLabel', `${this.filterLabel}`);
        localStorage.setItem('filterDays', `${this.filterDays}`);
    }

    onCellClicked(event: CellClickedEvent){
        console.log(event);
    }

    clearSelection() {
        this.agGrid.api.deselectAll();
    }

    private fetchData() {
        if (!localStorage.getItem('filterDays')){
            this.filterLabel = '30 días';
            this.filterDays = 30;
            localStorage.setItem('filterLabel', `${this.filterLabel}`);
            localStorage.setItem('filterDays', `${this.filterDays}`);
        }
        this.rowData$ = this.shipmentService.get(this.filterDays);
    }

    onEditClicked(params: any) {
        const dialogRef = this.matDialog.open(ShipmentDialogComponent, {
            data: {
                id: params.rowData.id,
                drivers: this.drivers
            }
        });

        dialogRef.afterClosed()
            .subscribe((response) => {
                const userId = localStorage.getItem('userId');
                if (response.event === 'saveOrder' && userId) {
                    const update = response.data;
                    update['employeeId'] = userId;
                    this.shipmentService.update(update).subscribe((response) => {
                        this.fetchData();
                        this.showAlertPanel('success', 'Solicitud modificada correctamente!');
                    });
                }
            });
    }

    onDeleteClicked(params: any) {
        const confirmation = this.fuseConfirmationService.open({
            title: 'Eliminar Solicitud',
            message: `¿Realmente desea eliminar la solicitud ${params.rowData.id}? Esta acción no podrá ser revertida una vez completada.`,
            actions: { confirm: { label: 'Eliminar' }, cancel: { label: 'Cancelar' } }
        });

        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                this.shipmentService.delete(params.rowData.id).subscribe(() => {
                    this.fetchData();
                    this.showAlertPanel('success', 'Solicitud eliminada correctamente!');
                });
                this.changeDetectorRef.markForCheck();
            }
        });
    }

    onFilterChange(label: string, days: number) {
        this.updateFilterDays(label, days);
        this.fetchData();
    }

    showAlertPanel(type: string, message: string): void {
        this.alertConf['type'] = type;
        this.alertConf['message'] = message;
        this.fuseAlertService.show('alertPanel');
        setTimeout(() => this.fuseAlertService.dismiss('alertPanel'), 3000);
    }
}
