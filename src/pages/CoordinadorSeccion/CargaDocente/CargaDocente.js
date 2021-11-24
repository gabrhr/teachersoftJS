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
import CursoService from '../../../services/cursoService';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import Popup from '../../../components/util/Popup';
import ModalValidarYEnviarSolicitud from './ModalValidarYEnviarSolicitud';

import HorarioService from '../../../services/horarioService';

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
  id: 1,
  title: 'Todos los estados',
}

/* Arreglo para manejar los estados - fijos puesto que no habrán más*/
const getEstadoCollection = [
  { id: '1', title: 'Todos los estados' },
  { id: '2', title: 'Atendido' },
  { id: '3', title: 'Pendiente' },
]

//--------------NUEVO
const verificarEstado = (cur) =>{
  let resultado = []  //0 - estado - 1 tipo

  switch (cur.cantidad_horarios) {
    case 0:
      resultado[0] = "Sin horarios"; resultado[1] = "error";
      break;
    case 1:
      resultado[0] = "Pendiente"; resultado[1] = "pendiente";
      break;
    //Caso contrario es 2 - esta todo bien asignado
    default:
      resultado[0] = "Atendido"; resultado[1] = "success";
      break;
  }

  return resultado;
}


// //LLENADO DE LA LISTA DE CURSOS
const fillCursos = async (ciclo) => {
  
  //En este caso la seccion sería unicamente el de ing informática - MUST: Hacerlo dinámico
  if(!ciclo) ciclo = await window.localStorage.getItem("ciclo");
  const seccion = JSON.parse(window.localStorage.getItem("user"));
  let dataCur = await CursoService.listarPorCicloPorSeccion(parseInt(ciclo), seccion.persona.seccion.id);
  if(!dataCur) dataCur = [];

  const cursos = [];
  for(let cur of dataCur) {
    //Hacemos la creación y verificación de los estados
    const resultadoEstados = verificarEstado(cur);
    console.log(resultadoEstados);
    let estado = resultadoEstados[0], tipo= resultadoEstados[1]; 


    cursos.push({
      "id": cur.curso.id,
      "nombre": cur.curso.nombre,
      "codigo": cur.curso.codigo,
      "creditos": cur.curso.creditos,
      "seccion": {
        "id": cur.curso.seccion.id,
        "nombre": cur.curso.seccion.nombre,
        "departamento":{
          "id":cur.curso.seccion.departamento.id,
          "nombre":cur.curso.seccion.departamento.nombre,
        }
      },
      "estado": estado,
      "type": tipo
    })

  }
  console.log(cursos);
  return cursos;
}


export default function CargaDocente() {
  const [ciclo, setCiclo] = useState ();

  const [openConfVal, setOpenConfVal] = useState(false)
  const [asunto, setAsunto] = useState("")
  const [cuerpo, setCuerpo] = useState("")
  const [openValYEnvSolPopup, setOpenValYEnvSolPopup] = useState(false)

  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
  const SubtitulosTable = { display: "flex" }
  const [recordsForEdit, setRecordForEdit] = useState()
  const [records, setRecord] = useState([])
  const [horarios, setHorarios] = useState(false)   // Mostrar la tabla horarios
  const [row, setRow] = useState(false) //Sacamos la linea seleccionada
  
  // en lugar de la de cursos
  const PaperStyle = { borderRadius: '20px', pb: 4, pt: 2, px: 2, color: "primary.light", elevatio: 0 }
  const {
    values,
    // setValues,
    handleInputChange
  } = useForm(getEstadoCollection[0]);

    function getRow({ ...props }) {
        setRow(props)
    }

    console.log(ciclo);
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
    BoxTbl
  } = useTable(records, tableHeaders, filterFn);

    React.useEffect(() => {
      fillCursos(ciclo)
      .then (newCur =>{
        if(newCur)
          setRecord(newCur);
        //console.log(newCur);
      });
    }, [ciclo])

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
  const theme = useTheme();

  const openInPopup = item => {
    setRecordForEdit(item)
    setHorarios(true)
  }


  return (
    <Form>
      <ContentHeader 
          text="Gestión de la carga de horarios"
          cbo= {true}
          records = {ciclo}
          setRecords = {setCiclo}
      />
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
            {/* <Controls.Select
              name="id"
              label="Estados"
              value={values.id}
              onChange={handleInputChange}
              options={getEstadoCollection}
              type="contained"
            // displayNoneOpt
            /> */}
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
                  <colgroup>
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '30%' }} />
                    <col style={{ width: '30%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '20%' }} />
                  </colgroup>
                <TableBody>
                  {
                    recordsAfterPagingAndSorting().map(item => (
                      <StyledTableRow key={item.id}>
                        <StyledTableCell>{item.codigo}</StyledTableCell>
                        <StyledTableCell>{item.nombre}</StyledTableCell>
                        <StyledTableCell>{item.seccion ? item.seccion.departamento.nombre : ""}</StyledTableCell>
                        <StyledTableCell>{item.creditos}</StyledTableCell>  
                        <StyledTableCell>
                          <DT.Etiqueta type={item.type} text={item.estado} />
                        </StyledTableCell>

                        {item.estado !== "Sin horarios" ?
                          <StyledTableCell>
                            <Link to ={{
                                pathname:`/as/asignacionCarga/registroCarga/horarios`,
                                state:{
                                    curso: item
                                }
                            }}  style={{ textDecoration: 'none' }}>
                              <IconButton size="small"
                                onClick={() => { getRow(item) }}
                              >
                                <ArrowForwardIosIcon fontSize="small" />

                              </IconButton>
                            </Link>
                          </StyledTableCell>
                        : <StyledTableCell></StyledTableCell>  }
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

      <Fab color="primary" aria-label="add" variant = "extended" 
            sx={{position:'fixed',
	          height:'40px',
	          bottom:'20px',
	          right:'40px',
	          textAlign: 'center'}} onClick = {()=>{setOpenValYEnvSolPopup(true)}}>
        Validar y enviar
        <CheckIcon />
      </Fab>
      <Popup
                openPopup={openValYEnvSolPopup}
                setOpenPopup={setOpenValYEnvSolPopup}
                title="Validar y enviar solicitud a la facultad"
            >
               <ModalValidarYEnviarSolicitud /*solicitud = {solicitud}*/asunto={asunto} cuerpo={cuerpo} setAsunto={setAsunto}
                                            setCuerpo={setCuerpo} setOpenValYEnvSolPopup = {setOpenValYEnvSolPopup}
                                            openValYEnvSolPopup = {openValYEnvSolPopup} openConfVal={openConfVal}
                                            setOpenConfVal={setOpenConfVal}/>
      </Popup>


    </Form>
  )
}
