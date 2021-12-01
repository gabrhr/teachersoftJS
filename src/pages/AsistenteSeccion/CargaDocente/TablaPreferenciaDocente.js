import { StyledTableCell, StyledTableRow } from '../../../components/controls/StyledTable';
import ContentHeader from '../../../components/AppMain/ContentHeader'
import useTable from '../../../components/useTable';
import React, { useState } from 'react'
import { Alert, Grid, InputAdornment, Paper, TableBody, Typography } from '@mui/material'

import PersonaService from '../../../services/personaService';


const tableHeaders = [
    {
      id: 'clave',
      label: 'Clave',
      numeric: false,
      sortable: true
    },
    {
      id: 'nombre',
      label: 'Nombre del Curso',
      numeric: false,
      sortable: true
    },
    {
      id: 'carga',
      label: 'Créditos',
      numeric: false,
      sortable: false
    },
    {
      id: 'horario',
      label: 'Horario',
      numeric: false,
      sortable: false
    },
    {
      id: 'sesion',
      label: 'Sesion',
      numeric: false,
      sortable: false
    },
    {
      id: 'horas',
      label: 'Horas',
      numeric: true,
      sortable: false
    }
]


const getPreferencias =  async (docente) => {
  //{ id: '1', title: 'Todas las Secciones' },
  //const seccion = JSON.parse(window.localStorage.getItem("user"));
  const ciclo = parseInt(window.localStorage.getItem("ciclo"));
  let dataPref = await PersonaService.listarPorDocente(docente.id, ciclo); //comentarle al back que sea por ciclo
  
  if(!dataPref) dataPref = [];

  console.log(dataPref);

  const preferencias = [];
  for(let doc of dataPref) {

    for(let i = 0; i < doc.sesiones.length; i++){
      //Hacemos la verificacion de si es un curso repetido o no
      const newHor = await doc.horarios.filter(hor => hor.sesiones.some(ses => ses.id === doc.sesiones[i].id));
      
      //Encontramos las horas de dictado del docente
      //const horDict = await doc.sesiones[i].sesion_docentes.filter(ses => ses.docente.id === docente.id)
      //console.log(horDict);
      preferencias.push ({
        "clave": newHor[0].curso_ciclo.curso.codigo,
        "nombre": newHor[0].curso_ciclo.curso.nombre,
        "carga": newHor[0].curso_ciclo.curso.creditos,
        "horario": newHor[0].codigo,
        "horas": doc.sesiones[i].horas,
        "Sesion": doc.sesiones[i],
        //"Horario": newHor[0],
      })
    }
  }
  return preferencias;
}


export default function ModalDetalleCursosDocente({docente}){
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
      
    React.useEffect(() => {
      getPreferencias(docente)
      .then (newPref =>{
        if(newPref){
          setRecords(newPref)
        }
      });
    }, [])
      const {
          TblContainer,
          TblHead,
          TblPagination,
          recordsAfterPagingAndSorting,
          BoxTbl
        } = useTable(records, tableHeaders, filterFn);
      
      return(
          <>
              <ContentHeader
                  text="Preferencia del docente"
                  cbo={false}
              />
              <BoxTbl>
                  <TblContainer>
                  <TblHead />
                      <colgroup>
                          <col style={{ width: '5%' }} />
                          <col style={{ width: '50%' }} />
                          <col style={{ width: '5%' }} />
                          <col style={{ width: '5%' }} />
                          <col style={{ width: '15%' }} />
                          <col style={{ width: '5%' }} />
                      </colgroup>
                      <TableBody>
                      {
                      recordsAfterPagingAndSorting().map(item => (
                      <StyledTableRow>
                          <StyledTableCell >{item.clave}</StyledTableCell>
                          <StyledTableCell >{item.nombre}</StyledTableCell>
                          <StyledTableCell        align="center">{item.carga}</StyledTableCell>
                          <StyledTableCell        align="center">{item.horario}</StyledTableCell>
                          <StyledTableCell >{item.Sesion.secuencia ? "Laboratorio" : "Clase"}</StyledTableCell>
                          <StyledTableCell        align="center">{item.horas}</StyledTableCell>
                      </StyledTableRow>
                      ))
                      }
                      </TableBody>
                  </TblContainer>
                  {records.length ? <> </> : 
                  <><Typography color = "secondary" align = "center">  
                    El docente no registro sus preferencias.  
                  </Typography></>}
                  <TblPagination />
              </BoxTbl>
          </>
      )
  }