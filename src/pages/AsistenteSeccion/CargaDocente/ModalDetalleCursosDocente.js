import { StyledTableCell, StyledTableRow } from '../../../components/controls/StyledTable';
import ContentHeader from '../../../components/AppMain/ContentHeader'
import useTable from '../../../components/useTable';
import React, { useState } from 'react'
import { Alert, Grid, InputAdornment, Paper, TableBody, Typography } from '@mui/material'
import TablaPreferenciaDocente from './TablaPreferenciaDocente'

const historico = [
    {
        clave: 'INF',
        nombre: 'Mate',
        carga: 2,
        horario: '0881',
        puntaje: 54.7
    },
    {
        clave: 'INF',
        nombre: 'Mate1',
        carga: 2,
        horario: '0881',
        puntaje: 54.7
    },
    {
        clave: 'INF',
        nombre: 'Mate2',
        carga: 2,
        horario: '0881',
        puntaje: 54.7
    }
]

const preferencia = [
    {
        clave: 'INF',
        nombre: 'Comu',
        carga: 2,
        horario: '0881',
        puntaje: 54.7
    },
    {
        clave: 'INF',
        nombre: 'Lengua',
        carga: 2,
        horario: '0881',
        puntaje: 54.7
    },
    {
        clave: 'INF',
        nombre: 'Lengua2',
        carga: 2,
        horario: '0881',
        puntaje: 54.7
    }
]

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

export default function ModalDetalleCursosDocente({docente}){
  const [records, setRecord] = useState(historico)
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    

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
                    {
                    recordsAfterPagingAndSorting().map(item => (
                    <StyledTableRow>
                        <StyledTableCell align="right">{item.clave}</StyledTableCell>
                        <StyledTableCell>{item.nombre}</StyledTableCell>
                        <StyledTableCell        align="center">{item.carga}</StyledTableCell>
                        <StyledTableCell        align="center">{item.horario}</StyledTableCell>
                        <StyledTableCell        align="center">{item.puntaje}</StyledTableCell>
                    </StyledTableRow>
                    ))
                    }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </BoxTbl>
            <Grid cointainer align="right" mt={2.5} />   
            <hr color = "#636e9a"/> 
            <Grid cointainer align="right" mt={2.5} />

            <TablaPreferenciaDocente preferencia = {preferencia}/>
        </>
    )
}