import React from 'react';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';

export const MenuAsistenteDepartamento = [
    {
        text: 'Carga del Ciclo',
        path: '/ad/asignacionCarga/Cargadocente',
        icon: <CalendarTodayOutlinedIcon />,
        indice: 0,
    },
    
    // {
    //     text: 'Docentes',
    //     path: '/ad/docentes',
    //     icon: <AccountBoxOutlinedIcon />,
    //     indice: 1,
    // },
    // {
    //     text: 'Panel de Indicadores',
    //     path: '/ad/panelIndicadores',
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
                path: '/ad/mesaPartes/misSolicitudes',
                indice: 0,
            },
            {
                text: 'Solicitudes delegadas a mí',
                path: '/ad/mesaPartes/misDelegados',
                indice: 1,
            }
        ]
    },
    {
        text: 'Estadisticas',
        path: '',
        icon: <ShowChartOutlinedIcon />,
        indice: 4,
        subNav: [
            {
                text: 'Docentes',
                path: '/ad/estadisticas/docentes',
                indice: 0,
            },
            {
                text: 'Deuda Docente',
                path: '/ad/estadisticas/deuda',
                indice: 1,
            },
            {
                text: 'Sobrecarga Docente',
                path: '/ad/estadisticas/sobrecarga',
                indice: 2,
            },
            {
                text: 'Profesores con mayor Deuda',
                path: '/ad/estadisticas/mayorDeuda',
                indice: 3,
			}
        ]
    },
 
];
