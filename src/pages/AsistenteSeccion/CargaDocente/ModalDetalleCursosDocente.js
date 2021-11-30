import { StyledTableCell, StyledTableRow } from '../../../components/controls/StyledTable';
import ContentHeader from '../../../components/AppMain/ContentHeader'
import useTable from '../../../components/useTable';
import React, { useState } from 'react'
import { Alert, Grid, InputAdornment, Paper, TableBody, Typography } from '@mui/material'
import TablaPreferenciaDocente from './TablaPreferenciaDocente'

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
      label: 'Carga',
      numeric: true,
      sortable: true
    },
    {
      id: 'horario',
      label: 'Horario',
      numeric: false,
      sortable: true
    },
    {
      id: 'puntaje',
      label: 'Puntaje',
      numeric: true,
      sortable: true
    }
  ]

const getHistoricoCiclos = async (docente) => {
  //FALTA IMPLEMENTAR - REQUEST DEL BACK QUE ME DE EL HISTORICO DE UN PROFESOR
  // - ID_DOCENTE - EN UN CICLO - ID_CICLO 
}


export default function ModalDetalleCursosDocente({docente}){
  const [records, setRecords] = useState([])
  const [ciclo, setCiclo] = useState()
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    
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
                        <StyledTableCell align="right">{item.clave}</StyledTableCell>
                        <StyledTableCell>{item.nombre}</StyledTableCell>
                        <StyledTableCell        align="center">{item.carga}</StyledTableCell>
                        <StyledTableCell        align="center">{item.horario}</StyledTableCell>
                        <StyledTableCell        align="center">{item.horas}</StyledTableCell>
                    </StyledTableRow>)
                    ))
                  }
                  </TableBody>
                </TblContainer>
                {records.length ? <> </> : 
                <><Typography color = "secondary" align = "center">  
                  El docente no tiene cursos dictados en ciclos anteriores.  
                </Typography></>}
                <TblPagination />
            </BoxTbl>
            <Grid cointainer align="right" mt={2.5} />   
            <hr color = "#636e9a"/> 
            <Grid cointainer align="right" mt={2.5} />

            <TablaPreferenciaDocente docente = {docente}/>
        </>
    )
}