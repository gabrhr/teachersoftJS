import React from 'react';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
export const MenuDocente = [
    {
        text: 'Mesa de Partes',
        path: '',
        icon: <InboxOutlinedIcon />,
        indice: 0,
        subNav: [
            {
                text: 'Mis solicitudes',
                path: '/doc/misSolicitudes',
                indice: 0,
            },
            {
                text: 'Solicitudes delegadas a mí',
                path: '/doc/misDelegados',
                indice: 1,
            }
        ]
    }
];