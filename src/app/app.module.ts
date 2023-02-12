import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { MatSelectModule } from '@angular/material/select';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonCellRenderer } from './shared/renderer/button-cell-renderer.component';
import { MatIconModule } from '@angular/material/icon';
import { PaidCellRenderer } from './shared/renderer/paid-cell-renderer.component';
import { UnPaidCellRenderer } from './shared/renderer/unpaid-cell-renderer.component';
import { MatButtonModule } from '@angular/material/button';

const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Other modules
        AgGridModule,

        // Layout module of your application
        LayoutModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
    ],
    declarations: [
        AppComponent, ButtonCellRenderer, PaidCellRenderer, UnPaidCellRenderer
    ],
    bootstrap   : [
        AppComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule
{
}
