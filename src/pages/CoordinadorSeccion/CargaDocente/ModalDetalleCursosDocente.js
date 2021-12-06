import { StyledTableCell, StyledTableRow } from '../../../components/controls/StyledTable';
import ContentHeader from '../../../components/AppMain/ContentHeader'
import ResumenDocente from '../../../components/DreamTeam/ResumenDocente'
import useTable from '../../../components/useTable';
import React, { useState } from 'react'
import { Alert, Grid, InputAdornment, Paper, TableBody, Typography } from '@mui/material'
import TablaPreferenciaDocente from './TablaPreferenciaDocente'

import PersonaService from '../../../services/personaService';
import HorarioService from '../../../services/horarioService';

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
      id: 'creditos',
      label: 'Creditos',
      numeric: false,
      sortable: true
    },
    {
      id: 'horario',
      label: 'Horario',
      numeric: false,
      sortable: true
    },
    {
      id: 'horas',
      label: 'Horas',
      numeric: false,
      sortable: true
    }
  ]

const getHistoricoCiclos = async (ciclo, docente) => {
  let cicloRep = ciclo
  if(!cicloRep)  cicloRep = window.localStorage.getItem("ciclo");
  let dataHist = await HorarioService.listarPorDocenteCiclo(docente.id, cicloRep); //comentarle al back que sea por ciclo
  
  if(!dataHist) dataHist = [];

  console.log(dataHist);

  const historico = [];
  for(let hor of dataHist) {
    //vamos a tener que buscar la posicion del docente en la lista - filter
    let horasDic;
    const cantHorasDic = [];
    for(let ses of hor.sesiones){
      horasDic = ses.sesion_docentes.filter(x => x.docente.id === docente.id)
      if(horasDic.length) cantHorasDic.push(horasDic[0].horas_dictado_docente_sesion);
    }
    
    historico.push ({
      "clave": hor.curso_ciclo.curso.codigo,
      "nombre": hor.curso_ciclo.curso.nombre,
      "creditos": hor.curso_ciclo.curso.creditos,
      "horario": hor.codigo,
      "horas": cantHorasDic.length ? cantHorasDic[0] : 0,
    })
    if(cantHorasDic.length > 1){  //Por si tambien se considera en el laboratorio del curso
    historico.push ({
      "clave": hor.curso_ciclo.curso.codigo,
      "nombre": hor.curso_ciclo.curso.nombre,
      "creditos": hor.curso_ciclo.curso.creditos,
      "horario": hor.codigo,
      "horas": cantHorasDic.length ? cantHorasDic[1] : 0,
    })
    }
  }
  return historico;
}


export default function ModalDetalleCursosDocente({docente}){
  const [records, setRecords] = useState([])
  const [ciclo, setCiclo] = useState()
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
  console.log(docente)
  let docenteResumen = {  
    "persona" : docente
  };
  React.useEffect(() => {
    getHistoricoCiclos(ciclo, docente)
    .then (newDoc =>{
      if(newDoc){
        setRecords(newDoc)
      }

    });
  }, [ciclo])


    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
      } = useTable(records, tableHeaders, filterFn);

    return(
        <>
          <Grid container >
            <Grid item xs = {8}>
              <ContentHeader
                  text="Histórico de cursos dictados"
                  cbo={true}
                  records ={ciclo}
                  setRecords = {setCiclo}
                  />
              <BoxTbl>
                  <TblContainer>
                  <TblHead />
                      <colgroup>
                          <col style={{ width: '10%' }} />
                          <col style={{ width: '70%' }} />
                          <col style={{ width: '10%' }} />
                          <col style={{ width: '5%' }} />
                          <col style={{ width: '5%' }} />
                      </colgroup>
                      <TableBody>
                      {(recordsAfterPagingAndSorting().map(item => (
                      <StyledTableRow>
                          <StyledTableCell>{item.clave}</StyledTableCell>
                          <StyledTableCell>{item.nombre}</StyledTableCell>
                          <StyledTableCell        align="center">{item.creditos}</StyledTableCell>
                          <StyledTableCell        align="center">{item.horario}</StyledTableCell>
                          <StyledTableCell        align="center">{item.horas}</StyledTableCell>
                      </StyledTableRow>)
                      ))
                    }
                    </TableBody>
                  </TblContainer>
                  {records.length ? <> </> : 
                  <><Typography color = "secondary" align = "center">  
                    El docente no tiene cursos dictados en el ciclo.  
                  </Typography></>}
                  <TblPagination />
              </BoxTbl>
              <Grid cointainer align="right" mt={2.5} />   
              <hr color = "#636e9a"/> 
              <Grid cointainer align="right" mt={2.5} />

              <TablaPreferenciaDocente docente = {docente}/>
            </Grid>
            <Grid item xs = {4}>
              <ResumenDocente docente = {docenteResumen}/>
            </Grid>
          </Grid>
        </>
    )
}