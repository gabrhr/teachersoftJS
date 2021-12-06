import React from 'react';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';

export const MenuCoordinadorSeccion = [
    {
        text: 'Asignación de Carga',
        path: '',
        icon: <CalendarTodayOutlinedIcon />,
        indice: 0,
        subNav: [
            {
                text: 'Registro de Cursos',
                path: '/cord/asignacionCarga/registroHorarios',
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
                path: '/cord/mesaPartes/misSolicitudes',
                indice: 0,
            },
            {
                text: 'Solicitudes delegadas a mí',
                path: '/cord/mesaPartes/misDelegados',
                indice: 1,
            }
        ]
    },
    {
        text: 'Estadisticas',
        path: '',
        icon: <ShowChartOutlinedIcon />,
        indice: 3,
        subNav: [
            {
                text: 'Docentes',
                path: '/cord/estadisticas/docentes',
                indice: 0,
            },
            {
                text: 'Deuda Docente',
                path: '/cord/estadisticas/deuda',
                indice: 1,
            },
            {
                text: 'Sobrecarga Docente',
                path: '/cord/estadisticas/sobrecarga',
                indice: 2,
            },
            {
                text: 'Profesores con más Deuda',
                path: '/cord/estadisticas/mayorDeuda',
                indice: 3,
            }
        ]
    },
 
];