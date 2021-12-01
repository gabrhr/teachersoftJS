import React from 'react';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';

export const MenuInvestigacion = [
    {
        text: 'Repositorio ',
        path: '/ai/repoInvestigaciones',
        icon: <LibraryBooksOutlinedIcon />,
        indice: 0,
    },
    {
        text: 'Estadísticas',
        path: '',
        icon: <InboxOutlinedIcon />,
        indice: 1,
        subNav: [
            {
                text: 'Publicaciones por autor',
                path: '/ai/publicacionesPorAutor',
                indice: 0,
            }
 
        ]
    }
];