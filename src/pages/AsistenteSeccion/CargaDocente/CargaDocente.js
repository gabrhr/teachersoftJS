import { Alert, Grid, InputAdornment, Paper, TableBody, Typography } from '@mui/material'
import React, { useState } from 'react'
import ContentHeader from '../../../components/AppMain/ContentHeader'
import { Controls } from '../../../components/controls/Controls'
import { StyledTableCell, StyledTableRow } from '../../../components/controls/StyledTable';
import useTable from '../../../components/useTable';
import { useTheme } from '@mui/material/styles'
/* ICONS */
import SearchIcon from '@mui/icons-material/Search';
import * as employeeService from '../../../services/employeeService';
import { useForm } from '../../../components/useForm';
import { Box } from '@mui/system';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import IconButton from '../../../components/controls/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CargaDocenteHorarios from './CargaDocenteHorarios';

const tableHeaders = [
    {
      id: 'id',
      label: 'DepartamentoID',
      numeric: true,
      sortable: true
    },
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
      id: 'facultad',
      label: 'Facultad',
      numeric: false,
      sortable: true
    },
    {
      id: 'creditos',
      label: 'Créditos',
      numeric: false,
      sortable: true
    },
    {
      id: 'estado',
      label: 'Estado',
      numeric: false,
      sortable: true
    }
]

function createData(id, clave, nombre, facultad, creditos) {
    return {
        id, clave, nombre, facultad, creditos
    }
  }
  
const table = [
    createData('0', 'INF123', 'Curso A', 'Ciencias e Ingenieria', '3.5'),
    createData('1', 'INF123', 'Curso B', 'Ciencias e Ingenieria', '3.5' ),
]

const initialFieldValues = {
    departmentID: 'Todos los estados',
}


export default function CargaDocente() {
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const SubtitulosTable={display:"flex"}
    const [recordsForEdit, setRecordForEdit] = useState()
    const [records, setRecord] = useState(table)
    const [horarios,setHorarios] = useState(false)
    const PaperStyle={ borderRadius: '20px', pb:4,pt:2, px:2,color:"primary.light", elevatio:0}
    const {
        values,
        // setValues,
        handleInputChange
    } = useForm(initialFieldValues);

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
    const theme= useTheme();

    const openInPopup = item => {
        setRecordForEdit(item)
        setHorarios(true)
    }
    

    return (
        <>
           <ContentHeader
                text="Registro de Carga Docente"
                cbo={horarios? false:true}
                
            />
            {horarios? 
                (   <>
                        <Controls.Button
                        variant="outlined"
                        text="Regresar"
                        size="small"
                        startIcon={<ArrowBackIcon/>}
                        onClick={() => {setHorarios(false)}}
                        />
                        <div style={{marginLeft:3,marginTop:20, marginBottom:20}}>
                        <Controls.Input 
                            label="Curso"  
                            value = {`${recordsForEdit.clave} - ${recordsForEdit.nombre}`}
                            disabled
                        />
                        </div>
                    </>
                )
                :(<> </>)
            }
            {/* <Toolbar> */}
            <Grid container sx={{mb:3}} display={horarios? "none": "unset"}>
                <Grid item xs={8} >
                    <Controls.Input
                        label="Buscar Cursos por Nombre o Clave"
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                        }}
                        sx={{ width: .3 }}
                        onChange={handleSearch}
                        type="search"
                    />
                </Grid>
                <Grid item xs={.3}/>
                <Grid item xs ={3}sx={{marginRight: theme.spacing(3)}}>
                    <Box  sx={{width: "10vw", align: "Right"}}> 
                        <Controls.Select
                            name="cicloId"
                            label="Estados"
                            value={values.departmentId}
                            onChange={handleInputChange}
                            options={employeeService.getDepartmentCollection()}
                            type="contained"
                            displayNoneOpt
                        />
                    </Box>
                </Grid>
            </Grid>
            <Paper variant="outlined" sx={PaperStyle}>
                {horarios? (<>
                        <Typography variant="h4" style={SubtitulosTable}>
                            Lista de Horarios
                        </Typography>
                        <CargaDocenteHorarios/>
                    </>):
                    (   <>

                    <Typography variant="h4" style={SubtitulosTable}>
                    Carga Docente por Cursos
                    </Typography>
                    <BoxTbl>
                        <TblContainer>
                            <TblHead />
                            <TableBody>
                            {
                                recordsAfterPagingAndSorting().map(item => (
                                    <StyledTableRow key={item.id}>
                                        <StyledTableCell
                                        align="right"
                                        >
                                        {item.id}
                                        </StyledTableCell>
                                        <StyledTableCell>{item.clave}</StyledTableCell>
                                        <StyledTableCell>{item.nombre}</StyledTableCell>
                                        <StyledTableCell>{item.facultad}</StyledTableCell>
                                        <StyledTableCell>{item.creditos}</StyledTableCell>
                                        <StyledTableCell>
                                            <Alert severity="info">Pendiente</Alert>
                                        
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <IconButton size="small"
                                                onClick={ () => {openInPopup(item)}}
                                            >
                                                <ArrowForwardIosIcon fontSize="small"/>
                                                
                                            </IconButton>
                                        </StyledTableCell>
                            
                                    </StyledTableRow>
                                ))
                            }
                            </TableBody>
                        </TblContainer>
                        <TblPagination />
                    </BoxTbl>
                    </>
                    )
                }
            </Paper>
        </>
    )
}
