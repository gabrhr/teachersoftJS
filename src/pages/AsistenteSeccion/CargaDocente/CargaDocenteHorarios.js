/* Author: Gabriela
 */

import React from 'react'
import AccordionHorarioProfesor from './AccordionHorarioProfesor'

export default function CargaDocenteHorarios(recordForEdit, setRecordForEdit) {
  return (
      <>
          <AccordionHorarioProfesor recordForEdit = {recordForEdit.recordForEdit} setRecordForEdit = {recordForEdit.setRecordForEdit}/>
      </>
  )
}
