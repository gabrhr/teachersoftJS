import { Avatar, Grid, InputAdornment, ListItem, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import React, {useState, useEffect, useContext} from 'react'
import { Controls } from '../../../components/controls/Controls'
import Popup from '../../../components/util/Popup'
import useTable from "../../../components/useTable"
import ContentHeader from '../../../components/AppMain/ContentHeader';
import { Input, Stack, Paper} from '@mui/material';
import * as XLSX from 'xlsx'
import horarioService from '../../../services/horarioService';
import CursoService from '../../../services/cursoService';

import { useForm, Form } from '../../../components/useForm';
import { useTheme } from '@mui/material/styles'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { set } from 'date-fns';
import personaService from '../../../services/personaService';
import SeccionService from '../../../services/seccionService';
import { Box } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {UserContext} from '../../../constants/UserContext';

const tableHeaders = [
    {
      id: 'seleccionar',
      label: 'Seleccionar',
      numeric: false,
      sortable: true
    },
    {
      id: 'clave',
      label: 'Clave',
      numeric: false,
      sortable: false
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
      numeric: false,
      sortable: true
    },
    {
      id: 'horario',
      label: 'Horario',
      numeric: false,
      sortable: true
    }
]

const getSeccionCollection =  async (user) => {
  //{ id: '1', title: 'Todas las Secciones' },
  let dataSecc = await SeccionService.getSeccionxDepartamento(user.persona.departamento.id);
  
  if(!dataSecc) dataSecc = [];

  const secciones = [];

  secciones.push({
    "id": 0,
    "nombre": "Todas las secciones",
  })
  for(let sec of dataSecc) {
    //Hacemos la creación y verificación de los estados
    secciones.push({
      "id": sec.id,
      "nombre": sec.nombre,
    })
  }

  return secciones;
}

const transformarHorarios = (request, user) => {
    const recordsX = []
    
    if(request){
        request.map(hor => {
            if(hor.sesiones && hor.curso_ciclo && hor.curso_ciclo.curso.seccion.id === user.persona.seccion.id){
                if(hor.sesiones[0].sesion_docentes.length === 0){
                    recordsX.push({
                        "Clave": hor.curso_ciclo.curso.codigo,
                        "Nombre": hor.curso_ciclo.curso.nombre,
                        "Unidad": hor.curso_ciclo.curso.seccion.departamento.unidad.nombre,
                        "Creditos": hor.curso_ciclo.curso.creditos,
                        "Carga_Horaria": hor.sesiones[1] ? hor.sesiones[0].horas + hor.sesiones[1].horas : hor.sesiones[0].horas,
                        "Horario": hor.codigo,
                        "Tipo": hor.sesiones[0].secuencia ? "Laboratorio" : "Clase",
                        "Horas": hor.sesiones[0].horas,
                        "ID_Curso_Ciclo": hor.curso_ciclo.id,
                        "ID_Horario": hor.id,
                        "ID_Sesion": hor.sesiones[0].id,
                        "selected": false
                    })
                }
                if(hor.sesiones[1] && hor.sesiones[1].sesion_docentes.length === 0){
                    recordsX.push({
                        "Clave": hor.curso_ciclo.curso.codigo,
                        "Nombre": hor.curso_ciclo.curso.nombre,
                        "Unidad": hor.curso_ciclo.curso.seccion.departamento.unidad.nombre,
                        "Creditos": hor.curso_ciclo.curso.creditos,
                        "Carga_Horaria": hor.sesiones[1] ? hor.sesiones[0].horas + hor.sesiones[1].horas : hor.sesiones[0].horas,
                        "Horario": hor.codigo,
                        "Tipo": hor.sesiones[1].secuencia ? "Laboratorio" : "Clase",
                        "Horas": hor.sesiones[1].horas,
                        "ID_Curso_Ciclo": hor.curso_ciclo.id,
                        "ID_Horario": hor.id,
                        "ID_Sesion": hor.sesiones[1].id,
                        "selected": false
                    })
                }
            }
      })
    }
    return recordsX;
}

const getHorario = async (seccion, secciones, user) => {

  const ciclo = await window.localStorage.getItem("ciclo");
  if(!seccion) seccion = 0;
  let dataCur = [];

  if(seccion === 0){
    for(let s of secciones){
      const curSeccion = await CursoService.listarPorCicloPorSeccion(parseInt(ciclo), s.id);
      if(curSeccion.length) dataCur.push(curSeccion);
    }
  }
  else{
    const curSeccion = await CursoService.listarPorCicloPorSeccion(parseInt(ciclo), seccion);
    if(curSeccion.length) dataCur.push(curSeccion);
  }
  
  if(!dataCur) dataCur = [];
  
  const horarios = [];
  for(let itemcur of dataCur){
    for(let cur of itemcur) {
      const request = await horarioService.listarPorCursoCiclo(cur.curso.id, ciclo.id);
      if(request.length) horarios.push(request);
    }
  }
    const recordsX = transformarHorarios(horarios, user)
    console.log(recordsX)
}


export default function AgregarPreferenciaDocente({openPopupAdd, setOpenPopUp}) {
    const [recordsX, setRecordsX] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [secciones, setSecciones] = useState([])
    const [seccion, setSeccion] = useState()
    let records = []
    const {user, setUser, rol, setRol, setToken} = useContext(UserContext)
    const SubtitulosTable={display:"flex"}
    const PaperStyle={ borderRadius: '20px', pb:4,pt:2, px:2, 
    color:"primary.light", elevatio:0, marginTop: 3}
    
    const [open, setOpen] = useState(false);
    
    const theme = useTheme();

    const initialFieldValues = {
        id: '',
        nombre: ''
    }

    const {
        values,
        setValues,
        handleInputChange
      // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useForm(initialFieldValues);

    React.useEffect(() => {
      getSeccionCollection(user)
      .then (newSecc =>{
        if(newSecc){
          setSecciones(newSecc);
          setValues(newSecc[0]);  //Para que se coja predeterminado dicho valor
        }
      });
    }, [] )//Solo al inicio para la carga de secciones


    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(recordsX, tableHeaders, filterFn);
    
  React.useEffect(() => {
    getHorario(seccion, secciones, user)
    .then (newHor =>{
      if(newHor)
        setRecordsX(newHor);

    });
  }, [seccion])

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
              return items.filter(x => x.apellidos.toLowerCase()
                  .includes(target.value.toLowerCase()))
          }
        })
    }

    const onInputClick = (event) => {
        event.target.value = ''
    }

    const agregarHorarios = () =>{
        recordsX.map(hor =>{
            if(hor.selected){
                const preferencia = {
                    "docente":{
                       "id": user.persona.id,
                    },
                    "cursoCiclos":[
                       {
                       "id": hor.ID_Curso_Ciclo,
                       }
                    ],
                    "horarios":[
                       {
                       "id": hor.ID_Horario,
                       }
                    ],
                    "sesiones":[
                       {
                       "id": hor.ID_Sesion
                       }
                    ]
                }
                const resultado = personaService.registerPreferencia(preferencia);
                console.log(resultado)
            }
        })
        setOpenPopUp(false)
    }

    const handleSubmit = () => {
        console.log("Se agregan los horarios")   
    }

    const addCursoBorrar = (item) => {
        item.selected = !item.selected
        if(item.selected){
            console.log("Se agrega un horario")
            //setSelected(numSelected + 1)
        }else{
            console.log("Se quita un horario")
            //setSelected(numSelected - 1)
        }
    }

    return (
      <Form onSubmit={handleSubmit}>
            <Grid container sx={{ mb: 3 }} display="flex">
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
                        name="especialidad"
                        label="Especialidad"
                        defaultValue={0}
                        onChange = {(e)=>{
                            setSeccion(e.target.value)
                        }}
                        options = {secciones}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Paper variant="outlined" sx={PaperStyle}>
              <Typography variant="h4"
                  color="primary.light" style={SubtitulosTable}
              >
                  Cursos
              </Typography>
              <BoxTbl>
              <TblContainer>
                    <TblHead />
                    <TableBody>
                    {
                       recordsAfterPagingAndSorting().map(item => (
                        <TableRow key={item.id} >
                            <TableCell>
                                <Controls.RowCheckBox onClick = {()=>{addCursoBorrar(item)}}>
                                    {/*<EditOutlinedIcon fontSize="small" />*/}
                                </Controls.RowCheckBox>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {`${item.Clave}`}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography >
                                    {item.Nombre}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography >
                                    {item.Creditos}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography >
                                    {item.Horario}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        ))
                    }
                    </TableBody>
                </TblContainer>
                <TblPagination />
              </BoxTbl>
          </Paper>
          <Grid cointainer align="right" mt={5}>
              <div>
                  <Controls.Button
                      // disabled={true}
                      variant="disabled"
                      text="Cancelar"
                      onClick={()=>{setOpenPopUp(false)}}
                      />
                  <Controls.Button
                      // variant="contained"
                      // color="primary"
                      // size="large"
                      text="Aceptar"
                      /* type="submit" */
                      onClick={agregarHorarios}
                  />
                  
              </div>
          </Grid>
          <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
          >
              <CircularProgress color="inherit" />
          </Backdrop>
      </Form>
  )
}
