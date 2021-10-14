import React, {useState} from 'react'
import { Grid , Divider, Stack,Typography, Avatar} from '@mui/material';
import { useForm, Form } from '../../../components/useForm';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTheme } from '@mui/material/styles'
import { Controls } from "../../../components/controls/Controls"
/* fake BackEnd */
import * as employeeService from '../../../services/employeeService';

import { DT } from '../../../components/DreamTeam/DT';
import { Box, Paper, TableBody, TableRow, TableCell,InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useTable from "../../../components/useTable"
import GestionCargaCursos from './GestiónCargaCursos';

const tableHeaders = [
    {
      id: 'clave',
      label: 'Clave',
      numeric: false,
      sortable: true
    },
    {
      id: 'nombre',
      label: 'Nombre',
      numeric: false,
      sortable: true
    },
    {
      id: 'creditos',
      label: 'Créditos',
      numeric: true,
      sortable: true
    },
]

const cursos = [
    {
        clave: 'INF144',
        nombre: 'Técnicas de Programación',
        credito: '3.5',
        horasLec: '5',
        especialidad: 'Ing. Informática',
        horario: '0781'
    },
    {
        clave: 'INF134',
        nombre: 'Técnicas...',
        credito: '2.0',
        horasLec: '5',
        especialidad: 'Ing. Informática',
        horario: '0781'
    },
    {
        clave: 'INF156',
        nombre: 'Técnicas...',
        credito: '3.5',
        horasLec: '5',
        especialidad: 'Ing. Informática',
        horario: '0781'
    }
]

export default function BuscarCurso(props)  {
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [records, setRecords] = useState(cursos)
    const [selected, setSelected] = useState(false)

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records, tableHeaders, filterFn);

    const handleSearch = e => {
        let target = e.target;
        /* React "state object" (useState()) doens't allow functions, only
         * objects.  Thus the function needs to be inside an object. */
        setFilterFn({
          fn: items => {
            if (target.value == "")
              /* no search text */
              return items
            else
              return items.filter(x => x.nombre.toLowerCase()
                  .includes(target.value.toLowerCase()))
          }
        })
      }

    return (
        <>
            <DT.BorderBox marginBottom={2}>
                <Controls.Input
                        label="Buscar Curso por Nombre"
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                        }}
                        sx={{ width: .75 }}
                        onChange={handleSearch}
                        type="search"
                />
                <BoxTbl>
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item => (
                            <TableRow key={item.id} onDoubleClick = {() => {props.getRow(item)}}>
                                <TableCell>{item.clave}</TableCell>
                                <TableCell>{item.nombre}</TableCell>
                                <TableCell>{item.credito}</TableCell>
                            </TableRow>
                            ))
                        }
                        </TableBody>
                    </TblContainer>
                    <TblPagination />
                </BoxTbl>
            </DT.BorderBox>
        </>
    );
}