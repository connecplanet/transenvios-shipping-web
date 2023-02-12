import { ClientAdminService } from '../../../core/clients/clients.service';
import { Component, ViewEncapsulation, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { ClientsDialogComponent } from './components/clients-dialog.component';
import { Client } from 'app/core/clients/clients.types';
import { MatPaginator } from '@angular/material/paginator';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FuseAlertService } from '@fuse/components/alert';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'clients',
    templateUrl: './clients.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ClientsComponent implements OnInit {
    dataSource: MatTableDataSource<any> = new MatTableDataSource();
    displayedColumns: string[] = ['documentType', 'documentId', 'firstName', 'lastName', 'phone', 'email', 'actions'];
    filterOptions: string;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    alertConf: {
        type: string,
        title: string,
        message: string
    } = { type: '', title: '', message: '' };
    activeRoute: any;

    constructor(
        private _matDialog: MatDialog,
        private _clientAdminService: ClientAdminService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseAlertService: FuseAlertService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.activeRoute = this.route.data.subscribe(data => {
            this.filterOptions = data.filterOptions;
            this.getAllUsers();
        });
    }

    ngOnDestroy() {
        this.activeRoute.unsubscribe();
      }

    getAllUsers(){
        this._clientAdminService.get(this.filterOptions).subscribe((response) => {
            this.dataSource.data = response;
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    editUser(client: Client): void {
        const dialogRef = this._matDialog.open(ClientsDialogComponent, {
            data: {
                client,
                isClient: (this.filterOptions == 'Clients')
            }
        });

        dialogRef.afterClosed()
            .subscribe((response) => {
                if (response.event === 'saveClient') {
                    const update = response.data;
                    this._clientAdminService.update(update,this.filterOptions).subscribe((response) => {
                        this.dataSource.data = this.dataSource.data.map((item) => {
                            if (item.id === update.id) {
                                item = update;
                            }
                            return item;
                        });

                        this.alertConf['type'] = "success";
                        this.alertConf['message'] = "Usuario modificado correctamente";
                        this._fuseAlertService.show('alertBox1')

                        setTimeout(() => this._fuseAlertService.dismiss('alertBox1'), 3000);

                    });
                }
            });
    }

    deleteUser(client: Client): void {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar Usuario',
            message: 'Estas seguro de eliminar el usuario, esta accion no podra ser revertida una vez completada',
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
                this._clientAdminService.delete(client.id, this.filterOptions).subscribe(() => {
                    this.dataSource.data = this.dataSource.data.filter(item => item.id !== client.id);
                    this.alertConf['type'] = "success";
                    this.alertConf['message'] = "Usuario eliminado correctamente";
                    this._fuseAlertService.show('alertBox1')

                    setTimeout(() => this._fuseAlertService.dismiss('alertBox1'), 3000);
                });
                this._changeDetectorRef.markForCheck();
            }
        });
    }
}
