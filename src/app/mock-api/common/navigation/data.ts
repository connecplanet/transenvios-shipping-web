/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'apps.shipments',
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
        id   : 'admin.users',
        title: 'Administradores',
        type : 'basic',
        icon : 'heroicons_outline:user-circle',
        link : '/admin/users'
    },
    {
        id   : 'admin.drivers',
        title: 'Transportadores',
        type : 'basic',
        icon : 'heroicons_outline:truck',
        link : '/admin/drivers'
    },
    {
        id   : 'admin.route',
        title: 'Rutas',
        type : 'basic',
        icon : 'heroicons_outline:map',
        link : '/admin/route'
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

