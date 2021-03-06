import React, {useState, useContext} from 'react'
import { Grid, Stack, Typography } from '@mui/material';
import { DT } from '../../../components/DreamTeam/DT'
import HorarioService from '../../../services/horarioService';
import { formatHorario, formatHorarioCursos } from '../../../components/auxFunctions';
import { Controls } from '../../../components/controls/Controls'
import { useForm, Form } from '../../../components/useForm';
import Popup from '../../../components/util/Popup'
import useTable from "../../../components/useTable"
import ContentHeader from '../../../components/AppMain/ContentHeader';
import { useHistory } from 'react-router-dom'
import { Box, Paper, TableBody, TableRow, TableCell,InputAdornment } from '@mui/material';
/* ICONS */
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EliminarUnCurso from './EliminarUnCurso'
import EliminarTodosLosCursos from './EliminarTodosLosCursos'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditarHorarioCurso from './EditarHorarioCurso'
import { UserContext } from '../../../constants/UserContext';
import LinearProgress from '@mui/material/LinearProgress';
import cursoService from '../../../services/cursoService';
import horarioService from '../../../services/horarioService';

const initialFieldValues = {
    searchText: ''
}

const tableHeaders = [
    /*{
      id: 'id',
      label: 'SeccionID',
      numeric: true,
      sortable: true
    },*/
    {
      id: 'claveCurso',
      label: 'Clave',
      numeric: false,
      sortable: true
    },
    {
      id: 'nombreCurso',
      label: 'Nombre',
      numeric: false,
      sortable: true
    },
    {
      id: 'Facultad',
      label: 'Facultad',
      numeric: false,
      sortable: false
    },
    {
      id: 'creditos',
      label: 'Créditos',
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
        id: 'tipoSesion',
        label: 'Tipo',
        numeric: false,
        sortable: false
     },
     {
        id: 'horaSesion',
        label: 'Horas',
        numeric: false,
        sortable: false
     },
     {
      id: 'actions',
      label: 'Acción',
      numeric: false,
      sortable: false
    }
]

const fillHorarios = async (ciclo) => {
  if(!ciclo) ciclo = await window.localStorage.getItem("ciclo");
  const dataHor = await HorarioService.buscarPorCiclo(ciclo);
  //dataSecc → id, nombre,  fechaFundacion, fechaModificacion,nombreDepartamento
  const horarios = [];
  if(!dataHor)  {
    console.error("No se puede traer la data del servidor de los horarios")
    return [];
  }
  for (let hor of dataHor){
    //console.log(hor.id);
    //console.log(hor.sesiones[0].secuencia);
    //const sesion1 = await HorarioService.convertSesiontoString(hor.sesiones[0].dia_semana, hor.sesiones[0].hora_inicio, hor.sesiones[0].media_hora_inicio,  hor.sesiones[0].hora_fin, hor.sesiones[0].media_hora_fin);
    //console.log(sesion1);
    if(hor.curso_ciclo){
      horarios.push({
        "id": hor.id,
        "codigo": hor.codigo,
        "tipo": hor.sesiones[0].secuencia,
        "horas_semanales": hor.sesiones[1] ? hor.sesiones[0].horas + hor.sesiones[1].horas: hor.sesiones[0].horas, 
        "curso_ciclo":{
          "id": hor.curso_ciclo.id,
          ciclo:{
            "id": hor.curso_ciclo.ciclo.id,
          },
          curso:{
            "id": hor.curso_ciclo.curso.id,
            "codigo": hor.curso_ciclo.curso.codigo,
            "nombre": hor.curso_ciclo.curso.nombre,
            "creditos": hor.curso_ciclo.curso.creditos,
            "unidad": hor.curso_ciclo.curso.unidad,
            "facultad": (hor.curso_ciclo.curso.seccion.departamento.unidad) ? hor.curso_ciclo.curso.seccion.departamento.unidad.nombre : '-',
          },
        },
        sesiones:{
          "secuencia": hor.sesiones[0].secuencia,
          "sesiones_dictado": [],
          "hora_sesion": hor.sesiones[0].horas,
        },
      })
      //Si existe un segundo horario - lo vamos a meter - no pueden haber más de 2 horarios.
      if(hor.sesiones[1]){
        //const sesion2 = await HorarioService.convertSesiontoString(hor.sesiones[1].dia_semana,  hor.sesiones[1].hora_inicio, hor.sesiones[1].media_hora_inicio,  hor.sesiones[1].hora_fin, hor.sesiones[1].media_hora_fin);
        //console.log(sesion2);
        horarios.push({
          "id": hor.id,
          "codigo": hor.codigo,
          "tipo": hor.sesiones[0].secuencia,
          "horas_semanales": hor.sesiones[1] ? hor.sesiones[0].horas + hor.sesiones[1].horas: hor.sesiones[0].horas, 
          "curso_ciclo":{
            "id": hor.curso_ciclo.id,
            ciclo:{
              "id": hor.curso_ciclo.ciclo.id,
            },
            curso:{
              "id": hor.curso_ciclo.curso.id,
              "codigo": hor.curso_ciclo.curso.codigo,
              "nombre": hor.curso_ciclo.curso.nombre,
              "creditos": hor.curso_ciclo.curso.creditos,
              "unidad": hor.curso_ciclo.curso.unidad,
              "facultad": (hor.curso_ciclo.curso.seccion.departamento.unidad) ? hor.curso_ciclo.curso.seccion.departamento.unidad.nombre : '-',
            },
          },
          sesiones:{
            "secuencia": hor.sesiones[1].secuencia,
            "sesiones_dictado": [],
            "hora_sesion": hor.sesiones[1].horas,
          },
        })
      }
    }//FIN DE LA VERIFICACION
  }
  console.log("Horarios del ciclo", horarios);
  return horarios;

}

const actualizarCursoCiclo = async (curso_ciclo)=> {
  if(curso_ciclo.estado_curso !== 0){
    const horarios = await horarioService.listarPorCursoCiclo(curso_ciclo.curso.id, curso_ciclo.ciclo.id) 
    if(!horarios.length){
      const newCC = {
        "id": curso_ciclo.id,
        "ciclo": {
          "id": curso_ciclo.ciclo.id,
        },
        "curso": {
          "id": curso_ciclo.curso.id,
        },
        "estado_curso": 0, //Se actualiza al nuevo estado - con horarios
        "cantidad_horarios": 0, //Como se eliminaron los horarios - se queda en cero
        "estado_tracking": curso_ciclo.estado_tracking,
      }
      const request = await cursoService.updateCursoCiclo(newCC);
    }else{
      const newCC = {
        "id": curso_ciclo.id,
        "ciclo": {
          "id": curso_ciclo.ciclo.id,
        },
        "curso": {
          "id": curso_ciclo.curso.id,
        },
        "estado_curso": 1, //Se actualiza al nuevo estado - con horarios
        "cantidad_horarios": curso_ciclo.cantidad_horarios -1, //Como se eliminaron los horarios - se queda en cero
        "estado_tracking": curso_ciclo.estado_tracking,
      }
      const request = await cursoService.updateCursoCiclo(newCC);
    }
    
  }
}

export default function HorarioCursos({records, setRecords, setCargaH, cargaH, ciclo, setCiclo, cicloActual}) {
  console.log(ciclo);

    //let hors = (window.localStorage.getItem('listHorario'))
    //const {getHorario, horario, setHorario, isNewFile } = props
    //const [openPopup, setOpenPopup] = useState(false);
    //const [recordsX, setRecordsX] = useState([]); //Se debe colocar el ID
    //const [columns, setColumns] = useState([]);
    //const [data, setData] = useState([]);
    //const [open, setOpen] = React.useState(false);
    const {user, setUser, rol, setRol, setToken} = useContext(UserContext)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openOnePopup, setOpenOnePopup] = useState(false)
    const [openAllPopup, setOpenAllPopup] = useState(false)
    const [indexDelete, setIndexDelete] = useState(0)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [openPopupEdit, setOpenPopupEdit] = useState(false)
    const history = useHistory()
    const SubtitulosTable={display:"flex"}
    const PaperStyle={ borderRadius: '20px', pb:4,pt:2, px:2, 
    color:"primary.light", elevatio:0}
    const [horariosCargados, setHorariosCargados] = useState(false)

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records, tableHeaders, filterFn);
    const {
        // values,
        // setValues,
        handleInputChange
    } = useForm(initialFieldValues);

    //Le pasamos los horarios

    React.useEffect(() => {
      setHorariosCargados(false);
      //Obtenemos las secciones
      fillHorarios(ciclo)
      .then (newHorarios =>{
        //setRecordsX(newHorarios); //Se quiere actualizar todo
        setRecords(newHorarios);
        setCargaH(records);
        setHorariosCargados(true);
      });
    }, [openPopupEdit, ciclo])
  
    //console.log(records);
    //console.log(indexDelete);

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
              return items.filter(x => x.curso_ciclo.curso.nombre.toLowerCase()
                  .includes(target.value.toLowerCase()))
          }
        })
      }
    const handleClick = (e) => {
      if(rol === 3){
        history.push("/cord/asignacionCarga/agregarHorario");
      }else{
        // history.push("/as/asignacionCarga/cursos");    // este era de Sergio
        history.push("/as/asignacionCarga/agregarHorario");   // queda el de Lucas
      }
        
    };

    const guardarIndex = item => {
      setIndexDelete(item)
      setOpenOnePopup(true)
    }

    const eliminarCursos = () =>{
      records.map(item => {
        HorarioService.deleteHorario(item.id);
      })
      setRecords([])
      setOpenAllPopup(false)
    }

    const handleEdit = async item => {
      console.log(item)
      const request = await HorarioService.getHorario(item.id)
      console.log(request)
      setRecordForEdit(request)
      setOpenPopupEdit(true)
    }

    const eliminarCurso = async () =>{
      //Funcion para elimianr el Curso seleccionado
      let pos = records.map(function(e) { return e.id; }).indexOf(indexDelete.id);
      records.splice(pos,1);
      pos = 0;
      //pos = records.map(function(e) { return e.id; }).indexOf(indexDelete);
      //records.splice(pos,1);
      //setRecords(); 

      //Hacemos una verificacion de que se debe de hacer con el horario
      const hor = await HorarioService.getHorario(indexDelete.id);
      if(hor.sesiones.length > 1){
        //Se actualiza
        const updtHor ={
          "id": hor.id,
          "codigo": hor.codigo,
          "curso_ciclo":{
            "id": hor.curso_ciclo.id,
          },
          sesiones: [{
            "id": indexDelete.sesiones.secuencia ? hor.sesiones[1].id : hor.sesiones[0].id,
            "secuencia": indexDelete.sesiones.secuencia ? hor.sesiones[1].secuencia: hor.sesiones[0].secuencia,
            "sesion_docentes": indexDelete.sesiones.secuencia ? hor.sesiones[1].sesion_docentes: hor.sesiones[0].sesion_docentes,
            "horas": indexDelete.sesiones.secuencia ? hor.sesiones[1].horas: hor.sesiones[0].horas,
            "tipo_dictado": indexDelete.sesiones.secuencia ? hor.sesiones[1].tipo_dictado: hor.sesiones[0].tipo_dictado
          }],
        }
        await HorarioService.updateHorario(updtHor);
      }
      else{
        //Se elimina
        await HorarioService.deleteHorario(indexDelete.id);
        actualizarCursoCiclo(hor.curso_ciclo);
      }

      setOpenOnePopup(false)
    }

    //console.log(ciclo)

    return (
        <Form>            
            <Typography variant="h4"
                color="primary.light" style={SubtitulosTable}
            >
                Horario de Cursos
            </Typography>
            <Grid container >
                <Grid item xs={5}>
                    <Stack direction="row" align="left" spacing={0}>
                        <Controls.Input
                            name="searchText"
                            label="Buscar Cursos por el nombre"
                            onChange={handleSearch}
                            type="search"
                            size="small"

                        />
                        {/* <Controls.Button  
                            text={<SearchIcon/>}
                            size="small"
                            sx = {{
                                // display: "inline",
                                maxWidth: .05
                            }}
                        /> */}
                    </Stack>
                </Grid>
                <Grid item xs={5}/>
                {/* FIX:  left align */}
                {cicloActual === ciclo ?
                  <Grid item xs={2} align="right">
                      {/* FIX:  DT IconButton */}
                      <Controls.Button 
                          title="Agregar Nuevo Horario"
                          variant="text+icon"
                          text = "Agregar Nuevo Horario"
                          onClick = {(event) => handleClick(event)}
                      />
                  </Grid>
                : <> </>}
            </Grid>
            <BoxTbl>
                    {horariosCargados ? (
                      <>
                        <TblContainer>
                        <colgroup>
                          <col style={{ width: '5%' }} />
                          <col style={{ width: '30%' }} />
                          <col style={{ width: '25%' }} />
                          <col style={{ width: '5%' }} />
                          <col style={{ width: '8%' }} />
                          <col style={{ width: '15%' }} />
                          <col style={{ width: '5%' }} />
                          <col style={{ width: '7%' }} />
                      </colgroup>
                    <TblHead />
                    <TableBody>
                    {/* {console.log(records)} */}
                    { recordsAfterPagingAndSorting().map(item => (
                        <TableRow key={item.id}>
                            {/*<TableCell
                            align="right"
                            >
                            {item.clave}
                            </TableCell>*/}
                            <TableCell>{item.curso_ciclo.curso.codigo}</TableCell>
                            <TableCell>{item.curso_ciclo.curso.nombre}</TableCell>
                            <TableCell>{item.curso_ciclo.curso.facultad}</TableCell>
                            <TableCell align = "center">{item.curso_ciclo.curso.creditos}</TableCell>
                            <TableCell align = "center">{item.codigo}</TableCell>
                            <TableCell>{item.sesiones.secuencia ? "Laboratorio":"Clase"}</TableCell>
                            <TableCell align = "center">{item.sesiones.hora_sesion}</TableCell>
                            <TableCell>
                            {cicloActual === ciclo ?
                              <>
                                {/* Accion editar */}
                                <Controls.ActionButton
                                  color="warning"
                                  onClick={ () => {handleEdit(item)}}
                                >
                                  <EditOutlinedIcon fontSize="small" />
                                </Controls.ActionButton>
                                {/* Accion eliminar */}
                                <Controls.ActionButton
                                  color="warning"
                                  onClick={ () => {guardarIndex(item)}}
                                >
                                  <DeleteOutlinedIcon fontSize="small" />
                                </Controls.ActionButton>
                              </>
                              : <></>}
                            </TableCell>
                        </TableRow>
                        ))
                            }
                            </TableBody>
                        </TblContainer>
                        <>
                          {records.length > 0 ? <> </> 
                              :   (
                                      <Typography variant="body1" color="primary.light" align = "center"style={SubtitulosTable}>    
                                          No hay elementos en la tabla. 
                                      </Typography>  
                                      )
                          }
                        </>
                      </>
                    ) : (
                      <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                      </Box>
                    ) 
                }
                <TblPagination />
            </BoxTbl>
                {/* <Controls.Button
                text="Eliminar todos los horarios"
                size = "small"
                color="warning"
                endIcon={<DeleteOutlinedIcon fontSize="small"/>}
                onClick={ () => {setOpenAllPopup(true)}}
                /> */}
            <Popup
                openPopup={openPopupEdit}
                setOpenPopup={setOpenPopupEdit}
                title= {`Editar Horario | Curso: ${recordForEdit ? recordForEdit.curso_ciclo.curso.nombre : ''}`}
                size = "sm"
            >
              <EditarHorarioCurso
                recordForEdit={recordForEdit}
                setOpenPopup={setOpenPopupEdit}
              />        
            </Popup>
            <Popup
                openPopup={openOnePopup}
                setOpenPopup={setOpenOnePopup}
                title={`Eliminar horario`}
            >
              <EliminarUnCurso setOpenOnePopup = {setOpenOnePopup} eliminarCurso = {eliminarCurso}/>
            </Popup>
            <Popup
                openPopup={openAllPopup}
                setOpenPopup={setOpenAllPopup}
                title="Eliminar todos los horarios"
            >
              <EliminarTodosLosCursos setOpenAllPopup = {setOpenAllPopup} eliminarCursos = {eliminarCursos}/>
            </Popup>
        </Form>
    )
}
