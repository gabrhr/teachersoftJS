import React from 'react';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import InboxIcon from '@mui/icons-material/Inbox';
import CloseIcon from '@mui/icons-material/Close';

export const MenuAsistenteSeccion = [
    {
        text: 'Asignación de Carga',
        path: '/as/asignacionCarga',
        icon: <CalendarTodayOutlinedIcon />,
        indice: 0,
        subNav: [
            {
                text: 'Registro de Cursos',
                path: '/as/asignacionCarga/registroCursos',
                indice: 0,
            },
            {
                text: 'Registrar Carga',
                path: '/as/asignacionCarga/registroCarga',
                indice: 1,
            },
            {
                text: 'Deudas y Descarga',
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
        text: 'Mesa de Partes',
        path: '/as/mesaPartes',
        icon: <InboxOutlinedIcon />,
        indice: 2,
    }
];
