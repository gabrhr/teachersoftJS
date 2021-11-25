import React, { useState } from 'react'
import {Document, Page, Text, View, Image} from '@react-pdf/renderer'

const Docentes = ({sesion_docentes}) => {
  return(
    sesion_docentes.map((sesion)=>
      <>
        <Image src = {`${sesion.docente.foto_URL}`}/>
        <Text>
          {`${sesion.docente.apellidos}, ${sesion.docente.nombres} ${sesion.docente.numero_documento} 
            ${sesion.docente.seccion.nombre} Carga del ciclo: ${sesion.docente.cargaDocente} 
              Deuda horaria: ${sesion.docente.deuda_docente}`}
        </Text> 
      </>
    )
  )
}

const ChompDocentes = ({sesiones}) => {
  const clase = sesiones.filter((ses)=>ses.secuencia===0)
    const laboratorio = sesiones.filter((ses)=>ses.secuencia===1)
    return (
        <>
          { clase.length ?
            <>
              <Text display="inline" whiteSpace="pre">
                  {"Docentes en Clase: "}
              </Text>
              <Text display="inline" whiteSpace="pre" color="blue" fontWeight={600}>
                  {clase[0].sesion_docentes ? clase[0].sesion_docentes.length : 0} {"\n"}
              </Text>
            </>
            : <></>
          }
          { laboratorio.length ?
              <>
                <Text display="inline" whiteSpace="pre">
                    {"Docentes en Lab: "}
                </Text>
                <Text display="inline" whiteSpace="pre" color="blue" fontWeight={600}>
                    {laboratorio[0].sesion_docentes ? laboratorio[0].sesion_docentes.length : 0}
                </Text>
              </>
            : <></>
          }

          { clase.length ?
            <>
              <Text display="inline" whiteSpace="pre">
                  {"Lista de Docentes de Clases: "}
              </Text>
              <Docentes sesion_docentes = {clase[0].sesion_docentes}/>
            </>
            : <></>
          }
          { laboratorio.length ?
              <>
                <Text display="inline" whiteSpace="pre">
                    {"Lista de Docentes de Laboratorios: "}
                </Text>
                <Docentes sesion_docentes = {laboratorio[0].sesion_docentes}/>
              </>
            : <></>
          }
        </>
    )
}

const Horarios = ({horarios}) => {
  return(
    horarios.map(horario=>
      <>
        <Text>
          {`${horario.codigo} ${horario.detalle} ${horario.estado}`}
        </Text>
        <ChompDocentes sesiones = {horario.sesiones}/>
      </>
    )
  )
}

export default function ReporteCargaHorarios({cursos}) {
  const SubtitulosTable = { display: "flex" }


  return (
    <Document>
      <Page>
            <View>
                <Text variant="h4" style={SubtitulosTable}>
                Carga Docente por Cursos
                </Text>
                {cursos.map((curso)=>
                  <>
                    <Text>
                        {`${curso.curso.codigo} ${curso.curso.nombre} ${curso.curso.seccion.departamento.nombre} 
                          ${curso.curso.creditos} ${curso.curso.estado}`} 
                    </Text>
                    <Horarios horarios = {curso.horarios}/>
                  </>
                )}
            </View>
            {console.log("cantidad en reporte : ", cursos)}
        </Page>      
    </Document>
  )
}