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
      id: '',
      label: '',
      numeric: false,
      sortable: false
    },
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
      id: 'facultad',
      label: 'Facultad',
      numeric: false,
      sortable: false
    },
    {
      id: 'horario',
      label: 'Horario',
      numeric: false,
      sortable: false
    },
    {
      id: 'tipo',
      label: 'Tipo',
      numeric: false,
      sortable: false
    },
    {
      id: 'horas',
      label: 'Horas',
      numeric: false,
      sortable: false
    }
]

const getSeccionCollection =  async (user) => {
  //{ id: '1', title: 'Todas las Secciones' },
  const ciclo = parseInt(window.localStorage.getItem("ciclo"));
  let dataSecc = await SeccionService.listarPorCursoCiclo(user.persona.departamento.id, ciclo);
  
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
      for(let r of request){
        for( let hor of r ) {
          if(hor.sesiones && hor.curso_ciclo && hor.curso_ciclo.curso.seccion.id === user.persona.seccion.id){
            if(hor.sesiones[0]){
              recordsX.push({
                "Clave": hor.curso_ciclo.curso.codigo,
                "Nombre": hor.curso_ciclo.curso.nombre,
                "Unidad": hor.curso_ciclo.curso.seccion.departamento.unidad.nombre,
                "Creditos": hor.curso_ciclo.curso.creditos,
                "Horario": hor.codigo,
                "Tipo": hor.sesiones[0].secuencia,
                "Horas": hor.sesiones[0].horas,
                "ID_Curso_Ciclo": hor.curso_ciclo.id,
                "ID_Horario": hor.id,
                "ID_Sesion": hor.sesiones[0].id,
                "selected": false
              })
            }
            if(hor.sesiones[1]){
              recordsX.push({
                "Clave": hor.curso_ciclo.curso.codigo,
                "Nombre": hor.curso_ciclo.curso.nombre,
                "Unidad": hor.curso_ciclo.curso.seccion.departamento.unidad.nombre,
                "Creditos": hor.curso_ciclo.curso.creditos,
                "Carga_Horaria": hor.sesiones[1] ? hor.sesiones[0].horas + hor.sesiones[1].horas : hor.sesiones[0].horas,
                "Horario": hor.codigo,
                "Tipo": hor.sesiones[1].secuencia,
                "Horas": hor.sesiones[1].horas,
                "ID_Curso_Ciclo": hor.curso_ciclo.id,
                "ID_Horario": hor.id,
                "ID_Sesion": hor.sesiones[1].id,
                "selected": false
              })
            }
          }
        }
      }
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
      const request = await horarioService.listarPorCursoCiclo(cur.curso.id, parseInt(ciclo));
      if(request.length) horarios.push(request);  //Esquivamos a los que aun no tienen horarios asignados
    }
  }

  const records = transformarHorarios(horarios, user)

  return records;
}


export default function AgregarPreferenciaDocente({openPopupAdd, setOpenPopUp, records, setRecords}) {
    const [recordsX, setRecordsX] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [secciones, setSecciones] = useState([])
    const [seccion, setSeccion] = useState()
    const [idDelRecords, setidDelRecords]  = useState([])
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
      if(newHor){
        //console.log("Horario: ", newHor ,"Records: ", records)
        //Filtramos la lista de Horarios con la de records - para que no se enlisten los que ya están previamente en records
        if(records){
          const clase = newHor.filter(ses => !records.some(record => (record.Horario.id === ses.ID_Horario) && (record.Sesion.secuencia === ses.Tipo)));
          setRecordsX(clase);
        }
        else  setRecordsX(newHor);
      }

    });
  }, [seccion, secciones])

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
              return items.filter(x => x.Nombre.toLowerCase()
                  .includes(target.value.toLowerCase()))
          }
        })
    }

    const onInputClick = (event) => {
        event.target.value = ''
    }

    const agregarHorarios = async () =>{
      let resultado;  //Para los cambios y verificar que todo paso
      const horarios = [], sesiones = [], cursoCiclos = []; //Para registrar todas las nuevas sesiones
      //Primeero hacemos el llenado de la lista de los nuevos items que se actualizarán
      console.log("recordsX:", idDelRecords, "\n records:", records)
      if(records.length){
        //Si es cero - entonces no hay mapeo previo de horarios
        for(let i = 0; i < records.length; i++){
          cursoCiclos.push({
            "id": records[i].Curso_Ciclo.id,
          })
          horarios.push({
            "id": records[i].Horario.id,
          })
          sesiones.push({
            "id": records[i].Sesion.id,
          })
        }
      }
      //Ahora le agregamos los nuevos horarios-sesiones
      for(let hor of idDelRecords){
        cursoCiclos.push({
          "id": hor.ID_Curso_Ciclo,
        })
        horarios.push({
          "id": hor.ID_Horario,
        })
        sesiones.push({
          "id": hor.ID_Sesion,
        })
      }
      if(records.length){
        //ES UN UPDATE A UNA PREFERENCIA DOCENTE EXISTENTE
        let preferencia = {
          "id": records[0].ID,
          "docente": {
            "id": records[0].ID_Docente
          },
          "ciclo":{
            "id": records[0].ID_Ciclo
          },
          "cursoCiclos": cursoCiclos,
          "horarios": horarios,
          "sesiones": sesiones
        }
        console.log(preferencia);
        resultado = await personaService.updatePreferencia(preferencia);
      }
      else{
        const request = await personaService.listarPorDocente(user.persona.id, parseInt(window.localStorage.getItem("ciclo")))
        console.log(request);
        //ES UN REGISTER- PRIMERA VEZ QUE SE CREA EN ESTE CASO
        let preferencia = {
          ...(request.length && {"id": request[0].id}),
          "docente": {
            "id": user.persona.id
          },
          "ciclo":{
            "id": parseInt(window.localStorage.getItem("ciclo"))
          },
          "cursoCiclos": cursoCiclos,
          "horarios": horarios,
          "sesiones": sesiones
        }

        if(request.length)  resultado = await personaService.updatePreferencia(preferencia);
        // else  resultado = await personaService.registerPreferencia(preferencia);
        // resultado = personaService.registerPreferencia(preferencia);
        console.log(preferencia);
      }
      console.log(resultado);
      if(resultado && idDelRecords.length){
        const newRecords = [];
        for(let i = 0; i < resultado.sesiones.length; i++){
            //Hacemos la verificacion de si es un curso repetido o no
            const newHor = await resultado.horarios.filter(hor => hor.sesiones.some(ses => ses.id === resultado.sesiones[i].id));
            console.log(newHor);
            newRecords.push ({
              "ID": resultado.id,
              "ID_Docente": resultado.docente.id,
              "ID_Ciclo": resultado.ciclo.id,
              "Curso_Ciclo": newHor[0].curso_ciclo,
              "Horario": newHor[0],
              "Sesion": resultado.sesiones[i]
            })
          }
          setRecords(newRecords);
      }
      //ACA VERIFICAR QUE SE INGRESO O NO CON NOTIFY
      setOpenPopUp(false)
    }

    const handleSubmit = () => {
        console.log("Se agregan los horarios")   
    }

    const addCursoBorrar = (item) => {
      item.selected = !item.selected
      let idRecords = idDelRecords; 
      if(item.selected){
        console.log("Se agrega un horario")
        idRecords.push(item)
      }else{
        console.log("Se quita un horario")
        for(let i = 0; i < idRecords.length; i++){
          if(idRecords[i] === item){
            idRecords.splice(i, 1)
            return;
          }
        }
      }
      setidDelRecords(idRecords);
    } 

    return (
      <Form onSubmit={handleSubmit}>
            <Grid container sx={{ mb: 3 }} display="flex">
                <Grid item xs={6} >
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
                <Grid item xs={2} />
                <Grid item xs={4} >
                  <Controls.Select
                  name="secciones"
                  label="Secciones"
                  defaultValue={0}
                  onChange = {(e)=>{
                      setSeccion(e.target.value)
                  }}
                  options = {secciones}
                  />
                </Grid>
            </Grid>
            <Paper variant="outlined" sx={PaperStyle}>
              <Typography variant="h4"
                  color="primary.light" style={SubtitulosTable}
              >
                  Lista de Horarios
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
                                    {item.Unidad}
                                </Typography>
                            </TableCell>
                            <TableCell align = "center">
                                <Typography >
                                    {item.Horario}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography >
                                    {item.Tipo ? "Laboratorio" : "Clase"}
                                </Typography>
                            </TableCell>
                            <TableCell align = "center">
                                <Typography >
                                    {item.Horas}
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
