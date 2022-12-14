import { UsersAdminService } from './../../../core/user-admin/user-admin.service';
import { Component, ViewEncapsulation, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { UserDialogComponent } from './component/user-dialog.component';
import { User, } from 'app/core/user-admin/users.types';
import { MatPaginator } from '@angular/material/paginator';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FuseAlertService } from '@fuse/components/alert';


@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UsersComponent implements OnInit {
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
        private _userAdminService: UsersAdminService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseAlertService: FuseAlertService
    ) {
    }

    ngOnInit(): void {
        this._userAdminService.get().subscribe((response) => {
            this.dataSource.data = response;
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    editUser(user: User): void {
        const dialogRef = this._matDialog.open(UserDialogComponent, {
            data: {
                user
            }
        });

        dialogRef.afterClosed()
            .subscribe((response) => {
                if (response.event === 'saveUser') {
                    const update = response.data;
                    this._userAdminService.update(update).subscribe((response) => {
                        this.dataSource.data = this.dataSource.data.map((item) => {
                            if (item.id === update.id) {
                                item = update;
                            }
                            return item;
                        });
                    });

                    this.alertConf['type'] = "success";
                    this.alertConf['message'] = "Usuario modificado correctamente";
                    this._fuseAlertService.show('alertBox1')

                    setTimeout(() => this._fuseAlertService.dismiss('alertBox1'), 3000);

                }
            });
    }

    deleteUser(user: User): void {
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
                this._userAdminService.delete(user.id).subscribe(() => {
                    this.dataSource.data = this.dataSource.data.filter(item => item.id !== user.id);
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
