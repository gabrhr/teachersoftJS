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
    {
        text: 'Mesa de Partes',
        path: '',
        icon: <InboxOutlinedIcon />,
        indice: 2,
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
        path: '',
        icon: <ShowChartOutlinedIcon />,
        indice: 3,
        subNav: [
            {
                text: 'Docentes',
                path: '/jd/estadisticas/docentes',
                indice: 0,
            },
            {
                text: 'Deuda Docente',
                path: '/jd/estadisticas/deuda',
                indice: 1,
            },
            {
                text: 'Sobrecarga Docente',
                path: '/jd/estadisticas/sobrecarga',
                indice: 2,
            },
            {
                text: 'Profesores con mayor Deuda',
                path: '/jd/estadisticas/mayorDeuda',
                indice: 3,
			}
        ]
    },
];
