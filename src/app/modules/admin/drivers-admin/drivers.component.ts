import { DriverAdminService } from '../../../core/drivers/drivers.service';
import { CitiesService } from '../../../core/cities/cities.service';
import { Component, ViewEncapsulation, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { DriversDialogComponent } from './components/drivers-dialog.component';
import { Driver } from 'app/core/drivers/drivers.types';
import { MatPaginator } from '@angular/material/paginator';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FuseAlertService } from '@fuse/components/alert';
import { City } from 'app/core/cities/cities.types';


@Component({
    selector: 'drivers',
    templateUrl: './drivers.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DriversComponent implements OnInit {
    dataSource: MatTableDataSource<any> = new MatTableDataSource();
    displayedColumns: string[] = ['documentType', 'documentNumber', 'firstName', 'lastName', 'phone', 'email', 'actions'];
    cities: City[];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    alertConf: {
        type: string,
        title: string,
        message: string
    } = { type: '', title: '', message: '' };


    constructor(
        private _matDialog: MatDialog,
        private _driverAdminService: DriverAdminService,
        private _citiesService: CitiesService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseAlertService: FuseAlertService
    ) {
    }

    ngOnInit(): void {
        this.getAllDrivers();

        this._citiesService.get().subscribe((response) => {
            this.cities = response;
        })
    }

    getAllDrivers(){
        this._driverAdminService.get().subscribe((response) => {
            this.dataSource.data = response;
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    editUser(driver: Driver): void {
        const objCities = this.cities;
        const dialogRef = this._matDialog.open(DriversDialogComponent, {
            data: {
                driver,
                objCities
            }
        });

        dialogRef.afterClosed()
            .subscribe((response) => {
                if (response.event === 'saveDriver') {
                    const update = response.data;
                    this._driverAdminService.update(update).subscribe((response) => {
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

    addDriver(): void {
        const objCities = this.cities;
        const dialogRef = this._matDialog.open(DriversDialogComponent, {
            data: {
                objCities
            }
        });

        dialogRef.afterClosed()
            .subscribe((response) => {
                if (response.event === 'addDriver') {
                    let objAdd = response.data;
                    this._driverAdminService.create(objAdd).subscribe((response) => {
                        this.getAllDrivers();
                        this.alertConf['type'] = "success";
                        this.alertConf['message'] = "Conductor creado correctamente";
                        this._fuseAlertService.show('alertBox1')
                        setTimeout(() => this._fuseAlertService.dismiss('alertBox1'), 3000);
                    });
                }
            });
    }

    deleteUser(driver: Driver): void {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar Conductor',
            message: `¿Realmente desea eliminar el conductor ${driver.email}? Esta acción no podra ser revertida una vez completada.`,
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
                this._driverAdminService.delete(driver.id).subscribe(() => {
                    this.dataSource.data = this.dataSource.data.filter(item => item.id !== driver.id);
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
