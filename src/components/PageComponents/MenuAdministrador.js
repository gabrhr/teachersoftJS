import React from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox' 

export const MenuAdministrador = [
    {
    text: 'Mantenimientos',
    path: '/administrador/mantenimiento',
    icon: <InboxIcon />,
    iconClosed: <InboxIcon />,
    iconOpened: <InboxIcon />,
    subNav: [
        {
        text: 'Prueba',
        path: '/administrador/mantenimiento/employee',
        },
        {
        text: 'Departamento',
        path: '/administrador/mantenimiento/departamento',
        },
        {
        text: 'Seccion',
        path: '/administrador/mantenimiento/seccion',
        }
        ]
    },
    {
        text: 'Prueba 1',
        path: '/administrador/prueba',
        icon: <InboxIcon />,
        iconClosed: <InboxIcon />,
        iconOpened: <InboxIcon />
    },
    {
        text: 'Showcase of Components',
        path: '/administrador/mantenimiento/showcase',
        icon: <InboxIcon />,
        iconClosed: <InboxIcon />,
        iconOpened: <InboxIcon />
    }
];
