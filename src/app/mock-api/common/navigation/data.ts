/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'admin',
        title: 'ADMINISTRACION',
        subtitle: 'Gestion de tablas maestras',
        type : 'group',
        link : '/admin',
        children: [
            {
                id   : 'admin.clients',
                title: 'Clientes',
                type : 'basic',
                icon : 'heroicons_outline:user',
                link : '/admin/clients'
            },
            {
                id   : 'admin.drivers',
                title: 'Conductores',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/admin/drivers'
            }
            ,
            {
                id   : 'admin.route',
                title: 'Rutas',
                type : 'basic',
                icon : 'heroicons_outline:map',
                link : '/admin/route'
            }
            
        ]
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'admin',
        title: 'Administradores',
        type : 'group',
        icon : 'heroicons_outline:chart-pie',
        link : '/admin'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'admin',
        title: 'Administradores',
        type : 'group',
        icon : 'heroicons_outline:chart-pie',
        link : '/admin'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'admin',
        title: 'Administradores',
        type : 'group',
        icon : 'heroicons_outline:chart-pie',
        link : '/admin'
    }
];

