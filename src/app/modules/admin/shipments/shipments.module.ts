import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FuseAlertModule } from '@fuse/components/alert';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
    MatFormFieldModule,
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import {
    MatSelectModule,
    MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
} from '@angular/material/select';

import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY } from '@angular/material/autocomplete';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ShipmentListComponent } from './shipment-list.component';
import { ShipmentDialogComponent } from './details/shipment-dialog.component';
import { AgGridModule } from 'ag-grid-angular';
import { ShipmentPersonInfoComponent } from './details/shipment-person-info/shipment-person-info.component';
import { FuseHighlightModule } from '@fuse/components/highlight';
import { SharedModule } from 'app/shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { ShipmentTotalComponent } from './details/shipment-total/shipment-total.component';
import { ShipmentPackageListComponent } from './details/shipment-package-list/shipment-package-list.component';

@NgModule({
    declarations: [
            ShipmentListComponent,
            ShipmentDialogComponent,
            ShipmentPersonInfoComponent,
            ShipmentTotalComponent,
            ShipmentPackageListComponent
        ],
    imports: [
        FuseAlertModule,
        FuseFindByKeyPipeModule,
        FuseHighlightModule,
        ScrollingModule,
        CommonModule,
        AgGridModule,
        SharedModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatIconModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatMenuModule,
        MatGridListModule,
        MatCheckboxModule,
    ],
    providers: [
        {
            provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY,
            useValue: MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
        }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShipmentsModule { }
