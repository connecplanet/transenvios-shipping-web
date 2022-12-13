import { UsersAdminService } from './../../../core/user-admin/user-admin.service';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { UserDialogComponent} from './component/user-dialog.component';
import { User, } from 'app/core/user-admin/users.types';


// const USERS_DATA: User[] = [
//     {documentType: 'C.C', documentNumber: '123456', name: 'Carlos', lastName: 'Cano', phone: '3218910831', mail: 'carlos@gmail.com'},
//     {documentType: 'C.C', documentNumber: '123457', name: 'Andres', lastName: 'Cardenas', phone: '3218910831', mail: 'carlos@gmail.com'},
// ];

@Component({
    selector     : 'users',
    templateUrl  : './users.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class UsersComponent implements OnInit
{
    dataSource: MatTableDataSource<any> = new MatTableDataSource();
    displayedColumns: string[] = ['documentType', 'documentNumber', 'name', 'lastName', 'phone', 'mail', 'actions'];

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    showAlert: boolean = false;


    constructor(
        private _matDialog: MatDialog,
        private _userAdminService: UsersAdminService
    )  {}

    ngOnInit(): void
    {
        // this.dataSource.data
        this._userAdminService.get().subscribe((response) => {
            this.dataSource.data = response;
        });
    }

    editUser(user: User): void
    {
        const dialogRef = this._matDialog.open(UserDialogComponent, {
            data: {
              user
            }
          });

        dialogRef.afterClosed()
        .subscribe((response) => {
            if(response.event === 'saveUser'){
                const update = response.data;
                this.dataSource.data = this.dataSource.data.map((item) => {
                        if(item.documentNumber === update.documentNumber) {
                            item = update;
                        }
                        return item;
                });

                this.alert = {
                    type   : 'success',  message: 'Usuario modificado correctamente.'
                };
            }
        });
    }

    deleteUser(user: User): void
    {
        this.dataSource.data = this.dataSource.data.filter(item => item.documentNumber !== user.documentNumber);

        this.alert = {
            type   : 'warning',
            message: 'Usuario eliminado correctamente.'
        };
    }
}
