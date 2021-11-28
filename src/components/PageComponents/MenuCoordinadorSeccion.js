import React from 'react';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';

export const MenuCoordinadorSeccion = [
    {
        text: 'Asignación de Carga',
        path: '',
        icon: <CalendarTodayOutlinedIcon />,
        indice: 0,
        subNav: [
            {
                text: 'Registro de Cursos',
                path: '/cord/asignacionCarga/registroCursos',
                indice: 0,
            },
            {
                text: 'Preferencias',
                path: '/cord/asignacionCarga/preferencia',
                indice: 1,
            },
            {
                text: 'Registrar Carga',
                path: '/cord/asignacionCarga/registroCarga',
                indice: 1,
            },
            {
                text: 'Deudas y Descarga',
                path: '/cord/asignacionCarga/deudaYDescarga',
                indice: 2,
            }
        ]
    },
    {
        text: 'Docentes',
        path: '/cord/docentes',
        icon: <AccountBoxOutlinedIcon />,
        indice: 1,
    },
    {
        text: 'Cursos',
        path: '/cord/cursos',
        icon: <LocalLibraryOutlinedIcon />,
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
                path: '/cord/misSolicitudes',
                indice: 0,
            },
            {
                text: 'Solicitudes delegadas a mí',
                path: '/cord/misDelegados',
                indice: 1,
            }
        ]
    }
];