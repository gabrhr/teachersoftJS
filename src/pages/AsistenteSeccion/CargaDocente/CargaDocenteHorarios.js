/* Author: Gabriela
 */

import React from 'react'
import AccordionHorarioProfesor from './AccordionHorarioProfesor'

export default function CargaDocenteHorarios(recordForEdit, setRecordForEdit) {
    return (
        <>
            <AccordionHorarioProfesor recordForEdit = {recordForEdit} setRecordForEdit = {setRecordForEdit}/>
        </>
    )
}
