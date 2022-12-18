/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'admin',
        title: 'ADMINISTRACION',
        subtitle: 'Gestión de modulos del sistema',
        type : 'group',
        link : '/admin',
        children: [
            {
                id   : 'admin.solicitudes',
                title: 'Solicitudes',
                type : 'basic',
                icon : 'heroicons_outline:calendar',
                link : '/admin/shipments'
            },
            {
                id   : 'admin.clients',
                title: 'Clientes',
                type : 'basic',
                icon : 'heroicons_outline:users',
                link : '/admin/clients'
            },
            {
                id   : 'admin.clients',
                title: 'Administradores',
                type : 'basic',
                icon : 'heroicons_outline:user-circle',
                link : '/admin/clients'
            },
            {
                id   : 'admin.drivers',
                title: 'Transportadores',
                type : 'basic',
                icon : 'heroicons_outline:truck',
                link : '/admin/drivers'
            },
            {
                id   : 'admin.drivers',
                title: 'Rutas',
                type : 'basic',
                icon : 'heroicons_outline:map',
                link : '/admin/drivers'
            },
            {
                id   : 'admin.drivers',
                title: 'Ciudades',
                type : 'basic',
                icon : 'heroicons_outline:location-marker',
                link : '/admin/drivers'
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
