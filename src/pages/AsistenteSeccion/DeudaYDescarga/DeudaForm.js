import { Avatar, Grid, InputAdornment, ListItem, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Controls } from '../../../components/controls/Controls'
import useTable from '../../../components/useTable'

/* ICONS */
import SearchIcon from '@mui/icons-material/Search';

const tableHeaders = [
    {
      id: 'docente',
      label: 'Docente',
      numeric: false,
      sortable: true
    },
    {
      id: 'especialidad',
      label: 'Especialidad',
      numeric: false,
      sortable: false
    },
    {
      id: 'carga',
      label: 'Carga Horaria',
      numeric: false,
      sortable: true
    },
    {
      id: 'bono',
      label: 'Bonos',
      numeric: false,
      sortable: false
    }
]
  
function createData(id, nombre, apellido_paterno, apellido_materno, codigo, especialidad, correo, carga,deuda,bono) {
    return {
        id, nombre, apellido_paterno,apellido_materno, codigo, especialidad, correo, carga,deuda,bono
    }
  }
const usuarios2 = [
    createData('0', 'Juan Alberto','Perez', 'Caceres','20005723','Ingeniería Informatica','dep1@pucp.edu.pe', '2', '3', 'Bono de Investigacion'),
    createData('1', 'Juan Alberto','Perez', 'Caceres','20005723','Ingeniería Informatica','dep1@pucp.edu.pe', '2', '3', 'Bono de Investigacion'),
    createData('2', 'Juan Alberto','Perez', 'Caceres','20005723','Ingeniería Informatica','dep1@pucp.edu.pe', '2', '3','Bono de Investigacion'),
]
export default function DeudaForm() {
    const [records, setRecords] = useState(usuarios2)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
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
            <div style={{display: "flex", paddingRight: "5px", marginTop:20}}>
                {/* <Toolbar> */}
                <Controls.Input
                    label="Buscar Docentes por Nombre"
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
            </div>
            <BoxTbl>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                    {
                       recordsAfterPagingAndSorting().map(item => (
                        <TableRow key={item.id}>
                            <TableCell>
                            <Grid container>
                                <Grid item pl={.5}>
                                <Avatar>
                                    <img  src={`/static/images/avatar/1.jpg`} alt=""></img>
                                </Avatar>
                                </Grid>
                                <Grid item sm>
                                    <Typography sx={{paddingLeft:2.5}}>
                                        {`${item.nombre}, ${item.apellido_paterno} ${item.apellido_materno} `}
                                    </Typography>
                                    <div style={{paddingLeft:20}}>
                                        {item.codigo}
                                    </div>
                                </Grid>
                            </Grid>
                            </TableCell>
                            <TableCell>
                                <Typography >
                                    {item.especialidad}
                                </Typography>
                                <div >
                                    {item.correo}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Typography display="inline">
                                    Carga del ciclo: {'\u00A0'}
                                </Typography>
                                <Typography display="inline" sx={{color:"#41B9E4"}}>
                                    {item.carga} horas
                                </Typography>
                                <div style={{color:"red"}}>
                                    Deuda horaria: {item.deuda} horas
                                </div>
                            </TableCell>
                            <TableCell>{item.bono}</TableCell>
                            
                        </TableRow>
                        ))
                    }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </BoxTbl>
        </>
    )
}
