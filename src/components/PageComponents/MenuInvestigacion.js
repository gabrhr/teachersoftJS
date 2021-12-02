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
        icon: <ShowChartOutlinedIcon />,
        indice: 1,
        subNav: [
            {
                text: 'Publicaciones por autor',
                path: '/ai/publicacionesPorAutor',
                indice: 0,
            },
            {
                text: 'Publicaciones por pais',
                path: '/ai/publicacionesPorPais',
                indice: 0,
            },
            {
                text: 'Publicaciones por idioma',
                path: '/ai/publicacionesPorIdioma',
                indice: 0,
            },
            {
                text: 'Publicaciones por calidad',
                path: '/ai/publicacionesPorCalidad',
                indice: 0,
            }
 
        ]
    }
];

//link: http://localhost:3000/ai/publicacionesPorPais