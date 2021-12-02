import React, { useState } from 'react'
import {Document, Page, Text, View, Image} from '@react-pdf/renderer'
import logoPUCP from '../../../assets/images/LogoPUCP.png'

const Docentes = ({sesion_docentes}) => {
  //   switch (docente.tipo_docente){
  //   case 1:
  //     tipoDoc = "TC"
  //     break;  //Se pasa a otro mapeo - ya que no corresponde como profesor
  //   case 2:
  //     tipoDoc = "TPC"
  //     break;
  //   case 3:
  //     tipoDoc = "TPA"
  //     break;
  //   default:
  //     tipoDoc = "No asignado";
  //     break;  //Se pasa a otro mapeo - ya que no corresponde como profesor
  // }

  return(
    sesion_docentes.map((sesion)=>
      <>
        {/* {`${sesion.docente.foto_URL}`} */}
        {/* <Image 
          src = {sesion.docente.foto_URL}
          // src = {"https://eros.pucp.edu.pe/pucp/general/gewpealu/gewpealu?accion=MostrarFoto&codigo=20181817&misdatos=1"}
          // src = {"https://picsum.photos/600/400"}
          alt = "random image"
          style = {{maxWidth: '240px', maxHeight: '280'}}
        /> */}
        <View style={{flexDirection: 'row', paddingLeft:'9%', paddingTop:'1%'}} wrap={false}>
          <View style={{width: '250px'}}>
            <Text style={{fontSize: '14px'}}>
              {`${sesion.docente.apellidos}, ${sesion.docente.nombres}`}
            </Text>
            <Text style={{fontSize: '12px'}}>
              {`${sesion.docente.numero_documento}`}
            </Text> 
          </View>
          <View>
            <Text style={{fontSize: '12px'}}>
              {`${sesion.docente.seccion.nombre}`}
            </Text>
            <Text style={{fontSize: '12px'}}>
              {sesion.docente.tipo_docente === 1 ? "TC" : sesion.docente.tipo_docente === 2 ? "TPC" :
               sesion.docente.tipo_docente === 1 ? "TPA" : "No asignado"}
            </Text>
          </View>
          <View style={{paddingLeft:'2%'}}>
            <Text style={{fontSize: '12px'}}>
              {`Carga del ciclo: ${sesion.docente.cargaDocente}`}
            </Text> 
            <Text style={{fontSize: '12px'}}>
              {`Deuda horaria: ${sesion.docente.deuda_docente}`}
            </Text>
          </View>
        </View>
      </>
    )
  )
}

const ImprimirDocentes = ({sesiones, cantDocClase}) => {
  const clase = sesiones.filter((ses)=>ses.secuencia===0)
  const laboratorio = sesiones.filter((ses)=>ses.secuencia===1)
  // const cant = clase[0].sesion_docentes.length

  return(
    <>
      {console.log("cLASE: ", clase.sesion_docentes)}
       { clase.length ?
            <View wrap={false}>
              <Text style={{paddingLeft: '8%', fontSize: '13.5px'}}>
                  {clase[0].sesion_docentes.length ? "\nLista de Docentes de Clases: " : ""}
              </Text>
              <Docentes sesion_docentes = {clase[0].sesion_docentes}/>
            </View>
            : <></>
        }
        { laboratorio.length ?
              <View wrap={false}>
                {console.log(laboratorio[0])}
                <Text style={{paddingLeft: '8%', fontSize: '13.5px'}}>
                    {laboratorio[0].sesion_docentes.length ? "\nLista de Docentes de Laboratorios: " : ""}
                </Text>
                <Docentes sesion_docentes = {laboratorio[0].sesion_docentes}/>
              </View>
            : <></>
        }
    </>
  )
}

const ChompDocentes = ({sesiones}) => {
  const clase = sesiones.filter((ses)=>ses.secuencia===0)
  const laboratorio = sesiones.filter((ses)=>ses.secuencia===1)
    return (
        <>
        <View style={{paddingTop: '3px', paddingLeft: '49px'}}>
            { clase.length ?
              <>
                <Text style={{fontSize: '10px'}}>
                    {`Docentes en Clase: ${clase[0].sesion_docentes ? clase[0].sesion_docentes.length : 0}\n`}
                </Text>
              </>
              : <></>
            }
            { laboratorio.length ?
                <>
                  <Text style={{fontSize: '10px'}}>
                    {`Docentes en Laboratorio: ${laboratorio[0].sesion_docentes ? laboratorio[0].sesion_docentes.length : 0}\n`}
                  </Text>
                </>
              : <></>
            }
          </View>
        </>
    )
}

const Horarios = ({horarios}) => {
  return(
    horarios.map(horario=>
      <>
      {/* {console.log("POR FAVOR: ", horarios)} */}
        <View style={{flexDirection: 'row'}} wrap={false}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <View><Text style={{paddingTop: '12px', paddingLeft: '49px', fontSize: '16px'}}>{`Horario ${horario.codigo}`}</Text></View>
              <View style = {{paddingTop: '14px', paddingLeft: '10px'}}>
                <Text style={horario.estado==='Horas Asignadas'?
                            {fontSize: '12px', color: 'green'}:
                            {fontSize: '12px', color: 'red'}}>
                  {`(${horario.estado})`}
                </Text>
              </View>
            </View>
            
            <ChompDocentes sesiones = {horario.sesiones}/>
          </View>
          
          <View style={{paddingTop: '16px', paddingLeft: '140px'}}>
            <Text style={{fontSize: '10px'}}>
              {`${horario.detalle}`}
            </Text>
          </View>
        </View>
        
          {/* const clase = sesiones.filter((ses)=>ses.secuencia===0)
          const laboratorio = sesiones.filter((ses)=>ses.secuencia===1) */}
        
        <ImprimirDocentes sesiones = {horario.sesiones} 
                          cantDocClase = {horario.sesiones.filter((ses)=>ses.secuencia===0)[0]}/>
      </>
    )
  )
}

export default function ReporteCargaHorarios({cursos}) {

  return (
    <Document>
      <Page size="A4" wrap>
            <View style={{width:'100%', height: '51.22px', backgroundColor: '#042354'}} fixed >
              <Image src = {logoPUCP} style={{position: "relative", height: "38px", width: '113.16px', top: '6px', left: '470px'}}></Image>
            </View>
            <View>
                <Text variant="h4" style={{fontSize: '24px', paddingTop: '20px', paddingLeft: '25%'}} >
                Carga Docente por Cursos
                </Text>
                <Text style={{fontWeight: '100', paddingTop: '14px', paddingLeft: '2%', fontSize: '16px'}}>
                  Lista de cursos:
                </Text>
                {cursos.map((curso)=>
                  <>
                    <View wrap={false}>
                      <Text style={{paddingTop: '20px', paddingLeft: '4%'}}>
                          {`${curso.curso.codigo} | ${curso.curso.nombre}`} 
                      </Text>
                      <Text style={{paddingTop: '2px', paddingLeft: '4%', fontSize:'11px'}}>
                        {`${curso.curso.seccion.departamento.nombre}`}
                      </Text>
                      <Text style={{paddingLeft: '4%', fontSize:'11px'}}>
                        Créditos: {`${curso.curso.creditos}`}
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{paddingLeft: '4%', fontSize:'11px'}}>
                          {"Estado: "}
                        </Text>
                        <Text style={curso.curso.estado === 'Sin horarios'? {fontSize:'11px', color: 'red'}:
                              (curso.curso.estado === 'Atendido'?{fontSize:'11px', color: 'green'}:
                              {fontSize:'11px', color: 'orange'})}>
                          {`${curso.curso.estado}`}
                        </Text>
                      </View>
                    </View>
                    {curso.horarios.length !== 0 ? (
                      <View wrap = {false}>
                        <View style={{paddingTop: '10px', width: '100%', alignItems: 'center'}}>
                          <View style={{width:'533px', height: '0.6px', backgroundColor: 'black'}}/>
                        </View>
                        <Text style={{paddingTop: '8px', paddingLeft: '6%', fontSize: '14px'}}>
                          Lista de horarios del curso:
                        </Text>
                        <Horarios horarios = {curso.horarios}/>
                      </View>
                    ) : <></>}
                    
                  </>
                )}
            </View>
            {console.log("cantidad en reporte : ", cursos)}
            <View style={{width:'100%', height: '50px'}} fixed/>
        </Page>      
    </Document>
  )
}