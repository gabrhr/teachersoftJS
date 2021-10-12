import React from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox' 
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

import CloseIcon from '@mui/icons-material/Close';

export const MenuAdministrador = [
    {
        text: 'Asignar Roles',
        path: '/admin/asignaru',
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
        text: 'Showcase of Components',
        path: '/admin/showcase',
        icon: <CloseIcon />,
        indice: 2,
    },
    {
        text: 'Index',
        path: '/admin/index',
        icon: <CloseIcon />,
        indice: 3,
    }
];
