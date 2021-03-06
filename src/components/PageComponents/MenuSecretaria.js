import React from 'react';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
export const MenuSecretaria = [
    {
        text: 'Mesa de Partes',
        path: '',
        icon: <InboxOutlinedIcon />,
        indice: 0,
        subNav: [
            {
                text: 'Solicitudes generales', //Sujeto a cambio de mejor nombre
                path: '/secretaria/mesaPartes/solicitudesGenerales',
                indice: 0,
            },
            {
                text: 'Tema de Trámites',
                path: '/secretaria/mantenimiento/temaTramite',
                indice: 1,
            }
        ]
    }
];