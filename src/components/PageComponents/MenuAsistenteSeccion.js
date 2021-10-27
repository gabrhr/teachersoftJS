import React from 'react';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';

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
            }
        ]
    },
    {
        text: 'Solicitud de Docencia',
        path: '/as/solicitudDocencia',
        icon: < PeopleAltOutlinedIcon/>,
        indice: 1,
    },
    {
        text: 'Docentes',
        path: '/as/docentes',
        icon: <CloseIcon />,
        indice: 2,
    },
    {
        text: 'Mesa de Partes',
        path: '/as/mesaPartes',
        icon: <AccountBoxOutlinedIcon />,
        indice: 3,
    }
];
