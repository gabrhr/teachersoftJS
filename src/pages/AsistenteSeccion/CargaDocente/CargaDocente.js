/*
  Dudas o consultas:
  - Gabriela (layout)
  - Mitsuo (data, localService)
 */

import { Alert, Grid, InputAdornment, Paper, TableBody, Typography } from '@mui/material'
import React, { useState } from 'react'
import ContentHeader from '../../../components/AppMain/ContentHeader'
import { Controls } from '../../../components/controls/Controls'
import { StyledTableCell, StyledTableRow } from '../../../components/controls/StyledTable';
import useTable from '../../../components/useTable';
import { useTheme } from '@mui/material/styles'
/* ICONS */
import SearchIcon from '@mui/icons-material/Search';
import * as DTLocalServices from '../../../services/DTLocalServices';
import { Form, useForm } from '../../../components/useForm';
import { Box } from '@mui/system';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import IconButton from '../../../components/controls/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { DT } from '../../../components/DreamTeam/DT'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CargaDocenteHorarios from './CargaDocenteHorarios';

const tableHeaders = [
  // {
  //   id: 'id',
  //   label: 'DepartamentoID',
  //   numeric: true,
  //   sortable: true
  // },
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
  },
  {
    id: 'actions',
    label: '',
    numeric: false,
    sortable: false
  },
  {
    id: 'openrow',
    label: '',
    numeric: false,
    sortable: false
  },
]

/* Form control (Select) */

const initialFieldValues = {
  id: 0,
  title: 'Todos los estados',
}

/* FIXME: Esto debe ser un service? */
const getEstadoCollection = () => ([
  { id: '1', title: 'Todos los estados' },
  { id: '2', title: 'Atendido' },
  { id: '3', title: 'Pendiente' },
])

function GetRow({ ...props }) {
  /*  setOpenPopup(false) */
  const history = useHistory()
  history.push("/as/asignacionCarga/registroCarga/horarios")
  /* setDefValueNombre(`${props.clave} - ${props.nombre}`)
  setDefValueCreditos(`${props.credito}`) */
}


export default function CargaDocente() {
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
  const SubtitulosTable = { display: "flex" }
  const [recordsForEdit, setRecordForEdit] = useState()
  const [records, setRecord] = useState(DTLocalServices.getAllCursos())
  const [horarios, setHorarios] = useState(false)   // Mostrar la tabla horarios
  // en lugar de la de cursos
  const PaperStyle = { borderRadius: '20px', pb: 4, pt: 2, px: 2, color: "primary.light", elevatio: 0 }
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
  const theme = useTheme();

  const openInPopup = item => {
    setRecordForEdit(item)
    setHorarios(true)
  }


  return (
    <Form>
      <ContentHeader
        text="Registro de Carga Docente"
        cbo={horarios ? false : true}
      />
      {horarios ? (
        <>
          <Controls.Button
            variant="outlined"
            text="Regresar"
            size="small"
            startIcon={<ArrowBackIcon />}
            onClick={() => { setHorarios(false) }}
          />
          <div style={{ marginLeft: 3, marginTop: 20, marginBottom: 20 }}>
            <Controls.Input
              label="Curso"
              value={`${recordsForEdit.clave} - ${recordsForEdit.nombre}`}
              disabled
            />
          </div>
        </>
      )
        : (<> </>)
      }
      {/* <Toolbar> */}
      <Grid container sx={{ mb: 3 }} display={horarios ? "none" : "flex"}>
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
        <Grid item xs={.3} />
        <Grid item xs={3} sx={{ marginRight: theme.spacing(3) }}>
          <Box sx={{ width: "200px", align: "right" }}>
            <Controls.Select
              name="title"
              label="Estados"
              value={values.title}
              onChange={handleInputChange}
              options={getEstadoCollection()}
              type="contained"
            // displayNoneOpt
            />
          </Box>
        </Grid>
      </Grid>
      <Paper variant="outlined" sx={PaperStyle}>
        {horarios ?
          (
            <>
              <Typography variant="h4" style={SubtitulosTable}>
                Lista de Horarios
              </Typography>
              <CargaDocenteHorarios />
            </>
          ) 
          : (
          <>
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
                          <DT.Etiqueta type={item.type} text={item.estado} />
                        </StyledTableCell>
                        <StyledTableCell>
                          <IconButton size="small"
                            onClick={() => { openInPopup(item) }}
                          >
                            <ArrowForwardIosIcon fontSize="small" />

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
    </Form>
  )
}