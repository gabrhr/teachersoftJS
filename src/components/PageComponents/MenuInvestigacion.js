import React from 'react';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';

export const MenuInvestigacion = [
    {
        text: 'Respositorio',
        path: '/ai/repoInvestigaciones',
        icon: <InboxOutlinedIcon />,
        indice: 0,
    },
    {
        text: 'Estadísticas',
        path: '/ai/estadisticas',
        icon: <ShowChartOutlinedIcon />,
        indice: 1,
    }
];