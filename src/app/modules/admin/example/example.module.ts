import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import { UsersComponent } from 'app/modules/admin/user-admin/users.component';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: ExampleComponent
    },
    {
        path     : 'users',
        component: UsersComponent
    }
];

@NgModule({
    declarations: [
        ExampleComponent
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes)
    ]
})
export class ExampleModule
{
}
