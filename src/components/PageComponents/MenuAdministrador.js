import React from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox' 

export const MenuAdministrador = [
    {
    text: 'Dev',
    path: '/este/path/no/se/usa/creo',
    icon: <InboxIcon />,
    iconClosed: <InboxIcon />,
    iconOpened: <InboxIcon />,
    subNav: [
        {
        text: 'Index',
        path: '/',
        },
        {
        text: 'Formulario de prueba',
        path: '/employee',
        },
        {
        text: 'Showcase',
        path: '/showcase',
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
