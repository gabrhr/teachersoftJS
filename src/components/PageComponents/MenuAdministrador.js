import React from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

import CloseIcon from '@mui/icons-material/Close';
import ConstructionIcon from '@mui/icons-material/Construction';

export const MenuAdministrador = [
    {
        text: 'Mantenimientos',
        path: '',
        icon: <LibraryBooksIcon />,
        indice: 0,
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
            },
            {
            text: 'Ciclos',
            path: '/admin/mantenimiento/ciclo',
            indice:3,
            },
            {
            text: 'Facultades',
            path: '/admin/mantenimiento/uni',
            indice: 4,
            }
        ]
    }

];
