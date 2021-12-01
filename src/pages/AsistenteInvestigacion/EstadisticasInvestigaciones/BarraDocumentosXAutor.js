import React from 'react'

import {Bar} from 'react-chartjs-2'
import { Bluetooth } from '@mui/icons-material'

export default function BarraDocumentosXAutor (){
    return (
        <Bar
            data={{
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']
            }}
            height={400}
            width={600}
        />

    );
    
}

 