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
import cursoService from '../../../services/cursoService';
import GestionCargaCursos from './GestiónCargaCursos';
import CursoService from '../../../services/cursoService';
import { StyledTableRow, StyledTableCell } from '../../../components/controls/StyledTable';

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

const fillCursos = async () => {
  let dataCur = await CursoService.getCursoCicloxCicloxCodigoNombre(window.localStorage.getItem("ciclo"),"");
  console.log(dataCur) 
  //dataSecc → id, nombre,  fechaFundacion, fechaModificacion,nombreDepartamento
  if(!dataCur) dataCur = []
  const cursos = [];
  dataCur.map(cur => (
    cursos.push({
      id: cur.curso.id.toString(),
      nombre: cur.curso.nombre,
      codigo: cur.curso.codigo,
      creditos: cur.curso.creditos,
      seccion: cur.curso.seccion,
      selected: false
    })
  ));
  //dataSecc → id, nombre,  fechaFundacion, fechaModificacion,nombreDepartamento

  return cursos;
}

export default function BuscarCurso(props)  {
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [records, setRecords] = useState([])
    const [selected, setSelected] = useState(false)
    const [selectedRow, setSelectedRow] = useState(50) //Se tiene que cambiar

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records, tableHeaders, filterFn);

   React.useEffect(() => {
      fillCursos()
      .then (newCurs =>{
        setRecords(prevRecords => prevRecords.concat(newCurs));
        //console.log(newSeccion);
        
        //console.log(records);
      });
    }, [])

    
    const handleSearch = e => {
        let target = e.target;
        /* React "state object" (useState()) doens't allow functions, only
         * objects.  Thus the function needs to be inside an object. */
        setFilterFn({
          fn: items => {
            if (target.value === "")
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
                            <StyledTableRow key={item.id} backCl = {(selectedRow === records.indexOf(item))?'#DEEEFF':'#E9ECF8' } 
                              sx={(selectedRow === records.indexOf(item))?{backgroundColor: '#DEEEFF', '&:hover': {
                                backgroundColor: '#DEEEFF',}}:{'&:hover': {backgroundColor: '#DEEEFF',}}}
                              onDoubleClick = {() => {props.getRow(item)}}>
                                <StyledTableCell>{item.codigo}</StyledTableCell>
                                <StyledTableCell>{item.nombre}</StyledTableCell>
                                <StyledTableCell align= "right">{item.creditos}</StyledTableCell>
                            </StyledTableRow>
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
