import { CitiesService } from '../../../core/cities/cities.service';
import {
    Component,
    ViewEncapsulation,
    OnInit,
    ViewChild,
    ChangeDetectorRef,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { MatPaginator } from '@angular/material/paginator';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FuseAlertService } from '@fuse/components/alert';
import { City } from 'app/core/cities/cities.types';
import { ShipmentDialogComponent } from './details/shipment-dialog.component';
import { RouteAdminService } from 'app/core/shipmentOrderRoute/route.service';
import { Routes } from 'app/core/shipmentOrderRoute/route.types';
import { CellClickedEvent, ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { ButtonCellRenderer } from 'app/shared/ag-grid-renders/button-cell-renderer.component';

@Component({
    selector: 'shipment-list',
    templateUrl: './shipment-list.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ShipmentListComponent implements OnInit {
    colDefs: ColDef[] = [
        { field: 'fromCityCode', headerName: 'Origen' },
        { field: 'toCityCode', headerName: 'Destino' },
        { field: 'initialKiloPrice', headerName: 'Precio Kilo Inicial', width: 200 },
        { field: 'additionalKiloPrice', headerName: 'Precio Kilo Adicional', width: 200 },
        { field: 'priceCm3', headerName: 'Precio cm3', width: 150 },
        {
            field: 'actions',
            headerName: 'Acciones',
            cellRenderer: ButtonCellRenderer,
            cellRendererParams: {
                clicked: (itemId: any) => {
                    alert(`${itemId} was clicked`);
                },
            },
        },
    ];

    defaultColDef: ColDef = {
        sortable: true, filter: true
    };

    rowData$!: Observable<any[]>;

    gridOptions: GridOptions = {
        // Add event handlers
        onCellClicked: this.onCellClicked,
    }

    @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

    dataSource: MatTableDataSource<any> = new MatTableDataSource();

    dataSourceCity: MatTableDataSource<any> = new MatTableDataSource();
    displayedColumns: string[] = [
        'fromCityCode',
        'toCityCode',
        'initialKiloPrice',
        'additionalKiloPrice',
        'priceCm3',
        'actions',
    ];
    cities: City[];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    alertConf: {
        type: string;
        title: string;
        message: string;
    } = { type: '', title: '', message: '' };

    constructor(
        private _matDialog: MatDialog,
        private _routeAdminService: RouteAdminService,
        private _citiesService: CitiesService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseAlertService: FuseAlertService
    ) {}

    ngOnInit(): void {
        this.getAllRoutes();

        this._citiesService.get().subscribe((response) => {
            this.cities = response;
        });
    }

    onGridReady(params: GridReadyEvent) {
        this.rowData$ = this._routeAdminService.get();
    }

    onCellClicked(event: CellClickedEvent){
        console.log(event);
    }

    clearSelection() {
        this.agGrid.api.deselectAll();
    }

    getAllRoutes() {
        this._routeAdminService.get().subscribe((response) => {
            this.dataSource.data = response;

            this.dataSource.data.forEach((element) => {
                let city = this.cities.filter(
                    (from) => from.code == element.fromCityCode
                );

                if (city && city.length > 0) {
                    element.fromCityCodeName = city[0].name;
                }

                city = this.cities.filter(
                    (from) => from.code == element.toCityCode
                );
                if (city && city.length > 0) {
                    element.toCityCodeName = city[0].name;
                }
            });
        });
    }

    getAllCities() {
        this._routeAdminService.getCities().subscribe((response) => {
            this.dataSourceCity.data = response;
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    clearInput(inputName: string): void {
        eval(`this.composeForm.patchValue({${inputName}: ''})`);
    }

    editRoute(route: Routes): void {
        const objCities = this.cities;
        const dialogRef = this._matDialog.open(ShipmentDialogComponent, {
            data: {
                route,
                objCities,
            },
        });

        dialogRef.afterClosed().subscribe((response) => {
            if (response.event === 'saveRoute') {
                const update = response.data;
                this._routeAdminService.update(update).subscribe((response) => {
                    this.dataSource.data = this.dataSource.data.map((item) => {
                        if (item.id === update.id) {
                            item = update;
                        }
                        return item;
                    });

                    this.alertConf['type'] = 'success';
                    this.alertConf['message'] = 'Ruta modificada correctamente';
                    this._fuseAlertService.show('alertBox1');

                    setTimeout(
                        () => this._fuseAlertService.dismiss('alertBox1'),
                        3000
                    );
                });
            }
        });
    }

    addRoute(): void {
        const objCities = this.cities;
        const dialogRef = this._matDialog.open(ShipmentDialogComponent, {
            data: {
                objCities,
            },
        });

        dialogRef.afterClosed().subscribe((response) => {
            if (response.event === 'addRoute') {
                let objAdd = response.data;
                this._routeAdminService.create(objAdd).subscribe((response) => {
                    this.getAllRoutes();

                    this.alertConf['type'] = 'success';
                    this.alertConf['message'] = 'Ruta creada correctamente';
                    this._fuseAlertService.show('alertBox1');

                    setTimeout(
                        () => this._fuseAlertService.dismiss('alertBox1'),
                        3000
                    );
                });
            }
        });
    }

    deleteRoute(route: Routes): void {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar ruta',
            message:
                'Estas seguro de eliminar la ruta, esta accion no podra ser revertida una vez completada',
            actions: {
                confirm: {
                    label: 'Eliminar',
                },
                cancel: {
                    label: 'Cancelar',
                },
            },
        });

        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                this._routeAdminService.delete(route.id).subscribe(() => {
                    this.dataSource.data = this.dataSource.data.filter(
                        (item) => item.id !== route.id
                    );
                    this.alertConf['type'] = 'success';
                    this.alertConf['message'] = 'Ruta eliminada correctamente';
                    this._fuseAlertService.show('alertBox1');

                    setTimeout(
                        () => this._fuseAlertService.dismiss('alertBox1'),
                        3000
                    );
                });
                this._changeDetectorRef.markForCheck();
            }
        });
    }
}
