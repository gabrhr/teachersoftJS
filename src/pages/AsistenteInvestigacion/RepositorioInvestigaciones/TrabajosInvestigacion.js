import {useState, useContext, useEffect} from 'react'
import { Grid, Stack, Typography, TableBody, TableRow, TableCell} from '@mui/material';
import InvestigacionService from '../../../services/investigacionService';
import { Controls } from '../../../components/controls/Controls'
import { useForm, Form } from '../../../components/useForm';
import Popup from '../../../components/util/Popup'
import useTable from "../../../components/useTable"
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../../constants/UserContext';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EliminarUnTrabajoInvestigacion from './EliminarUnTrabajoInvestigacion'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditarTrabajoInvestigacion from './EditarTrabajoInvestigacion'

const initialFieldValues = {
    searchText: ''
}

const tableHeaders = [
    {
      id: 'cod_publicacion',
      label: 'Código',
      numeric: false,
      sortable: true
    },
    {
      id: 'titulo',
      label: 'Título',
      numeric: false,
      sortable: true
    },
    {
      id: 'nombre',
      label: 'Autor',
      numeric: false,
      sortable: true
    },
    {
      id: 'anho_publicacion',
      label: 'Año',
      numeric: false,
      sortable: false
    },
    {
      id: 'url',
      label: 'Texto Completo',
      numeric: false,
      sortable: false
    },
    {
      id: 'actions',
      label: '',
      numeric: false,
      sortable: false
    }
]
const fillInvestigaciones = async (anho) => {
    //PREGUNTAR POR EL USO DEL WINDOW.LOCAL.STORAGE.GETITEM
    if(!anho) anho = await window.localStorage.getItem("anho");
    //------------------------------------------------------------
    const dataInvestigaciones = await InvestigacionService.buscarPorAnho(anho);
    const arrInvestigaciones = [];
  if(!dataInvestigaciones)  {
    console.error("No se puede traer la data del servidor de los trabajos de investigacion")
    return [];
  }
  for (let trabajoInvestigacion of dataInvestigaciones){
    if(trabajoInvestigacion){
      arrInvestigaciones.push({
        "id": trabajoInvestigacion.id,
        "activo": trabajoInvestigacion.activo,
        "fecha_creacion": trabajoInvestigacion.fecha_creacion,
        "fecha_modificacion": trabajoInvestigacion.fecha_creacion,
        "fecha_fin": trabajoInvestigacion.fecha_fin,
        "fecha_inicio": trabajoInvestigacion.fecha_inicio,
        "formato": trabajoInvestigacion.formato,
        "idioma": trabajoInvestigacion.idioma,
        "tipo": trabajoInvestigacion.tipo,
        "url_repositorio": trabajoInvestigacion.url_repositorio,
        "doi": trabajoInvestigacion.doi,
        "isbn": trabajoInvestigacion.isbn,
        "issn": trabajoInvestigacion.issn,
        "anho_publicacion": trabajoInvestigacion.anho_publicacion,
        "ciudad": trabajoInvestigacion.ciudad,
        "codigo_validacion": trabajoInvestigacion.codigo_validacion,
        "divulgacion": trabajoInvestigacion.divulgacion,
        "edicion": trabajoInvestigacion.edicion,
        "editorial": trabajoInvestigacion.editorial,
        "especialidad_unesco": trabajoInvestigacion.especialidad_unesco,
        "filiacion": trabajoInvestigacion.filiacion,
        "identificador_produccion": trabajoInvestigacion.identificador_produccion,
        "indicador_calidad": trabajoInvestigacion.indicador_calidad,
        "medio_publicacion": trabajoInvestigacion.medio_publicacion,
        "motor_busqueda": trabajoInvestigacion.motor_busqueda,
        "nro_revista": trabajoInvestigacion.nro_revista,
        "observaciones_de_departamento": trabajoInvestigacion.observaciones_de_departamento,
        "observaciones_para_departamento": trabajoInvestigacion.observaciones_para_departamento,
        "pagina_final": trabajoInvestigacion.pagina_final,
        "pagina_inicial": trabajoInvestigacion.pagina_inicial,
        "pais": trabajoInvestigacion.pais,
        "palabras_clave": trabajoInvestigacion.palabras_clave,
        "responsabilidad": trabajoInvestigacion.responsabilidad,
        "subtipo_publicacion": trabajoInvestigacion.subtipo_publicacion,
        "tipo_publicacion": trabajoInvestigacion.tipo_publicacion,
        "tipo_referencia": trabajoInvestigacion.tipo_referencia,
        "titulo": trabajoInvestigacion.titulo,
        "validacion_preliminar": trabajoInvestigacion.validacion_preliminar,
        "volumen": trabajoInvestigacion.volumen,
        "id_autor": trabajoInvestigacion.id_autor,
        "codigo_publicacion": trabajoInvestigacion.codigo_publicacion,
      })
    }
  }
  return arrInvestigaciones;
}

export default function TrabajosInvestigacion({records, setRecords, setInvestigaciones, investigaciones, anho, setAnho}) {
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
  color:"primary.light", elevation:0}
  const {
      TblContainer,
      TblHead,
      TblPagination,
      recordsAfterPagingAndSorting,
      BoxTbl
  } = useTable(records, tableHeaders, filterFn);
  const {
      handleInputChange
  } = useForm(initialFieldValues);

  useEffect(() => {
    fillInvestigaciones(anho)
    .then (nuevasInvestigaciones =>{
      setRecords(nuevasInvestigaciones);
      setInvestigaciones(records);
    });
    console.log("El rol es", rol)
  }, [openPopupEdit])

  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
      fn: items => {
        if (target.value === "")
          return items
        else
          // CONSULTAR SOBRE QUE ALMACENA LA X PARA PODER ACCEDER
          // CORRECTAMENTE A LOS VALORES DEL TRABAJO DE INVESTIGACION
          // ---------------------------------------------------------------------
          return items.filter(x => x.curso_ciclo.curso.nombre.toLowerCase()
              .includes(target.value.toLowerCase()))
      }
    })
  }

  // CONSULTAR SOBRE POR QUE EN HorarioCursos.js SE TIENE UN IF ELSE SI EL ROL
  // SE GARANTIZA AL ACCEDER PREVIAMENTE A LA PANTALLA POR DEFECTO
  // ---------------------------------------------------------------------
  const handleClick = e => {
    // VERIFICAR COMO FUNCIONA HISTORY PUSH PARA REDIRIGIRME AL MODAL DE AGREGAR
    // NO DEJAR PASAR
    if(rol === 9){
      history.push("/cord/asignacionCarga/cursos");
    }else{
      console.log("ERROR: NO POSEE EL ROL 9 PARA INGRESAR");
    }
  }

  const guardarIndex = item => {
    setIndexDelete(item)
    setOpenOnePopup(true)
  }

  const eliminarInvestigaciones = () => {
    records.map(item => {
      InvestigacionService.deleteDocumento(item.id);
    })
    setRecords([]);
    setOpenAllPopup(false);
  }

  const handleEdit = async item => {
    const request = await InvestigacionService.getDocumento(item.id);
    setRecordForEdit(request);
    setOpenPopupEdit(true);
  }

  const eliminarInvestigacion = async () =>{
    //Funcion para elimianr la INVESTIGACION seleccionado
    let pos = records.map(function(e) { return e.id; }).indexOf(indexDelete.id);
    records.splice(pos,1);
    pos = 0;
    InvestigacionService.deleteDocumento(indexDelete.id);
    setOpenOnePopup(false)
  }

  return (
    <Form>            
      <Typography variant="h4" style={SubtitulosTable}>
        Repositorio de Investigación
      </Typography>
      <Grid container>
        <Grid item xs={5}>
          <Stack direction="row" align="left" spacing={0}>
            <Controls.Input
              name="searchText"
              label="Buscar trabajo de investigación por el nombre"
              onChange={handleSearch}
              type="search"
              size="small"
            />
          </Stack>
        </Grid>
        <Grid item xs={5}/>
        <Grid item xs={2} align="right">
          <Controls.Button 
            title="Agregar Trabajo de Investigación"
            variant="text+icon"
            text = "Agregar Trabajo de Investigación"
            onClick = {event => handleClick(event)}
          />
        </Grid>
      </Grid>
      <BoxTbl>
        <TblContainer>
          <TblHead />
          <TableBody>
            {records.length > 0
              ? 
              recordsAfterPagingAndSorting().map(item => (
                <TableRow key={item.id}>
                  {/* <TableCell>{item.curso_ciclo.curso.codigo}</TableCell>
                  <TableCell>{item.horas_semanales}</TableCell>
                  <TableCell>{item.curso_ciclo.curso.facultad}</TableCell>
                  <TableCell>{item.curso_ciclo.curso.nombre}</TableCell>
                  <TableCell>{item.codigo}</TableCell>
                  <TableCell>{item.sesiones.secuencia ? "Laboratorio":"Clase"}</TableCell>
                  <TableCell>{item.sesiones.hora_sesion}</TableCell> */}
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              ))
              :
              (
                <Typography variant="body1" color="primary.light" style={SubtitulosTable}>    
                    No hay elementos en la tabla. 
                </Typography>  
              )
            }
          </TableBody>
        </TblContainer>
        <TblPagination />
      </BoxTbl>
      <Popup
        openPopup={openPopupEdit}
        setOpenPopup={setOpenPopupEdit}
        title = {"Editar trabajo de investigación"}
        size = "sm"
      >
        <EditarTrabajoInvestigacion
          recordForEdit={recordForEdit}
          setOpenPopup={setOpenPopupEdit}
        />        
      </Popup>
      <Popup
          openPopup={openOnePopup}
          setOpenPopup={setOpenOnePopup}
          title={"Eliminar trabajo de investigación"}
      >
        <EliminarUnTrabajoInvestigacion
          setOpenOnePopup = {setOpenOnePopup}
          eliminarInvestigacion = {eliminarInvestigacion}
        />
      </Popup>
    </Form>
  )
}
