import React, { useState } from 'react'
import AccordionCursoHorarioProfesor from './AccordionCursoHorarioProfesor'
import { useLocation } from 'react-router';
import { Form, useForm } from '../../../components/useForm';
import ContentHeader from '../../../components/AppMain/ContentHeader'
import { Controls } from '../../../components/controls/Controls'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useHistory} from 'react-router-dom'


export default function CargaDocenteCursoHorarios() {
  
  const history = useHistory()
  const location= useLocation()
  const {curso} = location.state

  const [recordForEdit, setRecordForEdit] = useState(curso)

  const handleClick = e =>{
    history.push("/ad/asignacionCarga/Cargadocente")
  }

  return (
      <Form>
        <ContentHeader
          text={`Carga Docente del ciclo | ${curso.codigo} - ${curso.nombre}`}
          cbo={false}
        />
        <Controls.Button
          variant="outlined"
          text="Regresar"
          size="small"
          startIcon={<ArrowBackIcon />}
          onClick={(e) => {handleClick(e)}}
        />
        {/* <div style={{ marginLeft: 3, marginTop: 20, marginBottom: 20 }}>
          <Controls.Input
            label="Curso"
            value={`${curso.codigo} - ${curso.nombre}`}
            disabled
          />
        </div> */}
        <div style={{ marginLeft: 3, marginTop: 20, marginBottom: 20 }}/>
        <AccordionCursoHorarioProfesor recordForEdit = {recordForEdit} setRecordForEdit = {setRecordForEdit}/>
      </Form>
  )
}
