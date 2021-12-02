import React from 'react';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import InboxIcon from '@mui/icons-material/Inbox';
import CloseIcon from '@mui/icons-material/Close';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';

export const MenuAsistenteSeccion = [
    {
        text: 'Asignación de Carga',
        path: '/as/asignacionCarga',
        icon: <CalendarTodayOutlinedIcon />,
        indice: 0,
        subNav: [
            {
                text: 'Registro de Horarios',
                path: '/as/asignacionCarga/registroHorarios',
                indice: 0,
            },
            {
                text: 'Preferencias',
                path: '/as/asignacionCarga/preferencia',
                indice: 1,
            },
            {
                text: 'Carga Docente',
                path: '/as/asignacionCarga/registroCarga',
                indice: 1,
            },
            {
                text: 'Deudas',
                path: '/as/asignacionCarga/deudaYDescarga',
                indice: 2,
            }
        ]
    },

    {
        text: 'Docentes',
        path: '/as/docentes',
        icon: <AccountBoxOutlinedIcon />,
        indice: 1,
    },
    {
        text: 'Cursos',
        path: '/as/cursos',
        icon: <LocalLibraryOutlinedIcon />,
        indice: 1,
    },
    /* TIENE PROBLEMAS NO SE PORQUE */
    // {
    //     text: 'Mesa de Partes',
    //     path: '',
    //     icon: <InboxOutlinedIcon />,
    //     indice: 2,
    //     subNav: [
    //         {
    //             text: 'Mis solicitudes',
    //             path: '/as/mesaPartes/misSolicitudes', 
    //             indice: 0,
    //         },
    //         {
    //             text: 'Solicitudes delegadas a mí',
    //             path: '/as/mesaPartes/misDelegados',
    //             indice: 1,
    //         }
    //     ]
    // }
];
