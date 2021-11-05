import React, {useState} from 'react'
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

const initialFieldValues = {
    searchText: ''
}

const tableHeaders = [
    {
      id: 'claveCurso',
      label: 'Clave',
      numeric: false,
      sortable: true
    },
    {
      id: 'cargaHoraria',
      label: 'Carga',
      numeric: false,
      sortable: true
    },
    {
        id: 'Facultad',
        label: 'Facultad',
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
        id: 'horario',
        label: 'Horario',
        numeric: false,
        sortable: true
     },
     {
        id: 'tipoSesion',
        label: 'Tipo',
        numeric: false,
        sortable: true
     },
     {
        id: 'horaSesion',
        label: 'Horas',
        numeric: false,
        sortable: true
     },
     {
      id: 'actions',
      label: 'Acción',
      numeric: false,
      sortable: false
    }
]

const fillHorarios = async () => {
  const dataHor = await HorarioService.getHorarios();
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
    horarios.push({
      "id": hor.id,
      "codigo": hor.codigo,
      "tipo": hor.sesiones[0].secuencia,
      "horas_semanales": hor.sesiones[0].horas + hor.sesiones[1].horas, 
      ciclo:{
        "id": hor.ciclo.id,
      },
      curso:{
        "id": hor.curso.id,
        "codigo": hor.curso.codigo,
        "nombre": hor.curso.nombre,
        "creditos": hor.curso.creditos,
        "unidad": hor.curso.unidad,
        "facultad": hor.curso.seccion.departamento.unidad.nombre,
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
        "horas_semanales": hor.sesiones[0].horas + hor.sesiones[1].horas, 
        ciclo:{
          "id": hor.ciclo.id,
        },
        curso:{
          "id": hor.curso.id,
          "codigo": hor.curso.codigo,
          "nombre": hor.curso.nombre,
          "creditos": hor.curso.creditos,
          "unidad": hor.curso.unidad,
          "facultad": hor.curso.seccion.departamento.unidad.nombre
        },
        sesiones:{
          "secuencia": hor.sesiones[1].secuencia,
          "sesiones_dictado": [],
          "hora_sesion": hor.sesiones[1].horas,
        },
      })
    }
  }
  return horarios;

}

export default function HorarioCursos({records, setRecords}) {

    //let hors = (window.localStorage.getItem('listHorario'))
    //const {getHorario, horario, setHorario, isNewFile } = props
    //const [openPopup, setOpenPopup] = useState(false);
    //const [recordsX, setRecordsX] = useState([]); //Se debe colocar el ID
    //const [columns, setColumns] = useState([]);
    //const [data, setData] = useState([]);
    //const [open, setOpen] = React.useState(false);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openOnePopup, setOpenOnePopup] = useState(false)
    const [openAllPopup, setOpenAllPopup] = useState(false)
    const [indexDelete, setIndexDelete] = useState(0)
    const history = useHistory()
    const SubtitulosTable={display:"flex"}
    const PaperStyle={ borderRadius: '20px', pb:4,pt:2, px:2, 
    color:"primary.light", elevatio:0}
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
      //Obtenemos las secciones
      fillHorarios()
      .then (newHorarios =>{
        //setRecordsX(newHorarios); //Se quiere actualizar todo
        setRecords(newHorarios);
      });
      
    }, [])
  
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
              return items.filter(x => x.curso.nombre.toLowerCase()
                  .includes(target.value.toLowerCase()))
          }
        })
      }
    const handleClick = (e) => {
        history.push("/as/asignacionCarga/cursos");
    };

    const guardarIndex = item => {
      setIndexDelete(item.id)
      setOpenOnePopup(true)
    }

    const eliminarCursos = () =>{
      records.map(item => {
        HorarioService.deleteHorario(item.id);
      })
      setRecords([])
      setOpenAllPopup(false)
    }

    const eliminarCurso = () =>{
      console.log(indexDelete);
      //Funcion para elimianr el Curso seleccionado
      let pos = records.map(function(e) { return e.id; }).indexOf(indexDelete);
      records.splice(pos,1);
      pos = 0;
      //De nuevo, solo para comprobar que existen ambos campos en pantalla - solo en pantalla.
      pos = records.map(function(e) { return e.id; }).indexOf(indexDelete);
      records.splice(pos,1);
      //setRecords(); 
      HorarioService.deleteHorario(indexDelete);
      setOpenOnePopup(false)
    }

    return (
        <Form>            
            <Typography variant="h4"
                color="primary.light" style={SubtitulosTable}
            >
                Horario de Cursos
            </Typography>
            <Grid container>
                <Grid item xs={8}>
                    <Stack direction="row" align="left" spacing={0}>
                        <Controls.Input
                            name="searchText"
                            label="Buscar Cursos por el nombre"
                            onChange={handleSearch}
                            type="search"
                            size="small"
                            sx = {{
                                maxWidth: .7
                            }}
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
                {/* FIX:  left align */}
                <Grid item xs={4} align="right">
                    {/* FIX:  DT IconButton */}
                    {/* <Controls.AddButton 
                        title="Agregar Nuevo Horario"
                        variant="iconoTexto"
                        onClick = {(event) => handleClick(event)}
                    /> */}
                </Grid>
            </Grid>
            <BoxTbl>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                    {console.log(records)}
                    {records.length > 0 ? 
                        recordsAfterPagingAndSorting().map(item => (
                        <TableRow key={item.id}>
                            {/*<TableCell
                            align="right"
                            >
                            {item.clave}
                            </TableCell>*/}
                            <TableCell>{item.curso.codigo}</TableCell>
                            <TableCell>{item.horas_semanales}</TableCell>
                            <TableCell>{item.curso.facultad}</TableCell>
                            <TableCell>{item.curso.nombre}</TableCell>
                            <TableCell>{item.codigo}</TableCell>
                            <TableCell>{item.sesiones.secuencia ? "Laboratorio":"Clase"}</TableCell>
                            <TableCell>{item.sesiones.hora_sesion}</TableCell>
                            <TableCell>
                              {/* Accion eliminar */}
                              <Controls.ActionButton
                                color="warning"
                                onClick={ () => {guardarIndex(item)}}
                              >
                                <DeleteOutlinedIcon fontSize="small" />
                              </Controls.ActionButton>
                            </TableCell>
                        </TableRow>
                        ))
                        :   (
                            <Typography variant="body1" color="primary.light" style={SubtitulosTable}>    
                                No hay elementos en la tabla. 
                            </Typography>  
                            )
                    }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </BoxTbl>
            <Controls.ActionButton color="warning" onClick={ () => {setOpenAllPopup(true)}}>
                      <DeleteOutlinedIcon fontSize="small"/>
                      Eliminar todos los cursos
                    </Controls.ActionButton>
            <Popup
                openPopup={openOnePopup}
                setOpenPopup={setOpenOnePopup}
                title="Eliminar curso"
            >
              <EliminarUnCurso setOpenOnePopup = {setOpenOnePopup} eliminarCurso = {eliminarCurso}/>
            </Popup>
            <Popup
                openPopup={openAllPopup}
                setOpenPopup={setOpenAllPopup}
                title="Eliminar cursos"
            >
              <EliminarTodosLosCursos setOpenAllPopup = {setOpenAllPopup} eliminarCursos = {eliminarCursos}/>
            </Popup>
        </Form>
    )
}
