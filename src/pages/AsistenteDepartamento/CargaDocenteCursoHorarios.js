import React from 'react'
import AccordionCursoHorarioProfesor from './AccordionCursoHorarioProfesor'

export default function CargaDocenteCursoHorarios(recordForEdit, setRecordForEdit) {
  return (
      <>
          <AccordionCursoHorarioProfesor recordForEdit = {recordForEdit.recordForEdit} setRecordForEdit = {recordForEdit.setRecordForEdit}/>
      </>
  )
}