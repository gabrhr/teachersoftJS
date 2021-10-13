import React from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox' 
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

import CloseIcon from '@mui/icons-material/Close';
import ConstructionIcon from '@mui/icons-material/Construction';

export const MenuAdministrador = [
    {
        text: 'Asignar Roles',
        path: '/admin/asignarRoles',
        icon: <PeopleAltOutlinedIcon />,
        indice: 0,
    },
    {
        text: 'Mantenimientos',
        path: '/admin/mantenimiento',
        icon: <LibraryBooksIcon />,
        indice: 1,
        subNav: [
            {
            text: 'Usuario',
            path: '/admin/mantenimiento/usr',
            indice: 0,
            },
            {
            text: 'Departamento',
            path: '/admin/mantenimiento/dep',
            indice: 1,
            },
            {
            text: 'Sección',
            path: '/admin/mantenimiento/sec',
            indice: 2,
            }]
    },
    {
        text: 'Employees',
        path: '/admin/employees',
        icon: <ConstructionIcon />,
        indice: 2,
    },
    {
        text: 'Showcase of Components',
        path: '/admin/showcase',
        icon: <ConstructionIcon />,
        indice: 3,
    },
    {
        text: 'Index',
        path: '/admin/index',
        icon: <ConstructionIcon />,
        indice: 4,
    }
];
