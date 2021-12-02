import React from 'react';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';

export const MenuJefeDepartamento = [
    {
        text: 'Carga del Ciclo',
        path: '/jd/asignacionCarga/Cargadocente',
        icon: <CalendarTodayOutlinedIcon />,
        indice: 0,
    },
    {
        text: 'Deudas y Descargas',
        path: '/jd/asignacionCarga/deudaYDescarga',
        icon: <AccountBoxOutlinedIcon />,
        indice: 1,
    },
    // {
    //     text: 'Panel de Indicadores',
    //     path: '/jd/panelIndicadores',
    //     icon: <ShowChartOutlinedIcon />,
    //     indice: 2,
    // },
    {
        text: 'Mesa de Partes',
        path: '',
        icon: <InboxOutlinedIcon />,
        indice: 3,
        subNav: [
            {
                text: 'Mis solicitudes',
                path: '/jd/mesaPartes/misSolicitudes',
                indice: 0,
            },
            {
                text: 'Solicitudes delegadas a mí',
                path: '/jd/mesaPartes/misDelegados',
                indice: 1,
            }
        ]
    },
    {
        text: 'Estadisticas',
        path: '/jd/estadisticas',
        icon: <ShowChartOutlinedIcon />,
        indice: 1,
    }
];
