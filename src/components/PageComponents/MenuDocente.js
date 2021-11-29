import React from 'react';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';

export const MenuDocente = [
  {
      text: 'Preferencias',
      path: '/doc/preferenciaDocente',
      icon: <LocalLibraryOutlinedIcon />,
      indice: 0,
  },
  {
    text: 'Solicitud de Descarga',
    path: '/doc/descargas',
    icon: <AccountBoxOutlinedIcon />,
    indice: 1,
},
  {
        text: 'Mesa de Partes',
        path: '',
        icon: <InboxOutlinedIcon />,
        indice: 2,
        subNav: [
            {
                text: 'Mis solicitudes',
                path: '/doc/misSolicitudes',
                indice: 0,
            },
            {
                text: 'Delegadas a mí',
                path: '/doc/misDelegados',
                indice: 1,
            }
        ]
    }
];