import React from 'react';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';


export const MenuDocente = [
  {
      text: 'Preferencias',
      path: '/doc/preferenciaDocente',
      icon: <LocalLibraryOutlinedIcon />,
      indice: 1,
  },
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
                text: 'Delegadas a mí',
                path: '/doc/misDelegados',
                indice: 1,
            }
        ]
    }
];