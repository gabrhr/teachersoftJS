/* Author: Gabs
 *
 * Si no hay proceso activo, permite crear uno.
 *
 */
import React from 'react'
import { Controls } from '../../../../components/controls/Controls'
import { Box } from '@mui/material'

export default function ItemProcesoActualVacio(props) {
    const { setOpenPopup, addOrEdit } = props
    return (
        <Box border="solid 1px">
            <Controls.AddButton
                title="Agregar Nuevo Proceso"
                variant="iconoTexto"
                onClick={() => { setOpenPopup(true); }}
            />
        </Box>
    )
}
