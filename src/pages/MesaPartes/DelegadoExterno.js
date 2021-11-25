import React from 'react'
import { Typography } from '@mui/material'
import { useParams } from "react-router";

import * as MesaPartesService from '../../services/mesaPartesService'

export default function DelegadoExterno() {
    let {detalle} = useParams()

    let params = MesaPartesService._(detalle).split('&')

    let soli = parseInt(params[0])
    let email = params[1]

    return (
        <div>
            {detalle}
            <Typography children={MesaPartesService._(detalle)} />
            <Typography children={soli} />
            <Typography children={email} />
        </div>
    )
}
