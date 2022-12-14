import { ClientAdminService } from '../../../core/clients/clients.service';
import { Component, ViewEncapsulation, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { DriversDialogComponent } from './components/drivers-dialog.component';
import { Driver } from 'app/core/drivers/drivers.types';
import { MatPaginator } from '@angular/material/paginator';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FuseAlertService } from '@fuse/components/alert';


@Component({
    selector: 'drivers',
    templateUrl: './drivers.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DriversComponent implements OnInit {
    dataSource: MatTableDataSource<any> = new MatTableDataSource();
    displayedColumns: string[] = ['documentType', 'documentNumber', 'firstName', 'lastName', 'phone', 'email', 'actions'];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    alertConf: {
        type: string,
        title: string,
        message: string
    } = { type: '', title: '', message: '' };


    constructor(
        private _matDialog: MatDialog,
        private _clientAdminService: ClientAdminService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseAlertService: FuseAlertService
    ) {
    }

    ngOnInit(): void {
        this._clientAdminService.get().subscribe((response) => {
            this.dataSource.data = response;
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    editUser(driver: Driver): void {
        const dialogRef = this._matDialog.open(DriversDialogComponent, {
            data: {
                driver
            }
        });

        dialogRef.afterClosed()
            .subscribe((response) => {
                if (response.event === 'saveDriver') {
                    const update = response.data;
                    this._clientAdminService.update(update).subscribe((response) => {
                        this.dataSource.data = this.dataSource.data.map((item) => {
                            if (item.id === update.id) {
                                item = update;
                            }
                            return item;
                        });

                        this.alertConf['type'] = "success";
                        this.alertConf['message'] = "Conductor modificado correctamente";
                        this._fuseAlertService.show('alertBox1')

                        setTimeout(() => this._fuseAlertService.dismiss('alertBox1'), 3000);

                    });     
                }
            });
    }

    deleteUser(client: Driver): void {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar Conductor',
            message: 'Estas seguro de eliminar el conductor, esta accion no podra ser revertida una vez completada',
            actions: {
                confirm: {
                    label: 'Eliminar'
                },
                cancel: {
                    label: 'Cancelar'
                }
            }
        });

        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                this._clientAdminService.delete(client.id).subscribe(() => {
                    this.dataSource.data = this.dataSource.data.filter(item => item.id !== client.id);
                    this.alertConf['type'] = "success";
                    this.alertConf['message'] = "Conductor eliminado correctamente";
                    this._fuseAlertService.show('alertBox1')

                    setTimeout(() => this._fuseAlertService.dismiss('alertBox1'), 3000);
                });
                this._changeDetectorRef.markForCheck();
            }
        });

    }
}
