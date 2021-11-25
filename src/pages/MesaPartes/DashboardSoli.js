/* Author: Gabriela
 * 
 * Para los combos y el filtrado de DashboardSoliOrganism.js
 */
import React, { useState, useContext } from 'react'
import { Avatar, Grid, InputAdornment, Box, TableCell, TableRow, Typography, Divider } from '@mui/material'
import { Controls } from '../../components/controls/Controls'
import useTable from '../../components/useTable'
import Notification from '../../components/util/Notification'
import moment from 'moment'

/* ICONS */
import SearchIcon from '@mui/icons-material/Search';
import { maxWidth } from '@mui/system';
import Popup from '../../components/util/Popup';
import ContentHeader from '../../components/AppMain/ContentHeader';
import NuevaSolicitudForm from './NuevaSolicitudForm';
import { DT } from '../../components/DreamTeam/DT';
import { Form, useForm } from '../../components/useForm';
import * as MesaPartesService from '../../services/mesaPartesService'
//Iconos Mesa de Partes
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import { Link, Redirect } from 'react-router-dom';
import DashboardSoliOrganism from './DashboardSoliOrganism'
import { UserContext } from '../../constants/UserContext'

// services
import UnidadService from '../../services/unidadService';
import DepartamentoService from '../../services/departamentoService'
import SeccionService from '../../services/seccionService'
import fileService from '../../services/fileService'


const tableHeaders = [
    {
        id: 'asunto',
        label: 'Asunto',
        numeric: false,
        sortable: true
    },
    {
        id: 'temaTramiteID',
        label: 'Descripcion',
        numeric: false,
        sortable: false
    },
    {
        id: 'estado',
        label: 'Estado',
        numeric: true,
        sortable: true
    }, {
        id: 'detalle',
        label: 'Detalle',
        numeric: false,
        sortable: true
    },
]

const initialFieldValues = {
    temaTramiteID: 0,
    estadoID: 4 // (Todos los estados)
}

// export const getTemaTramites = () => ([
//     { id: 0, title: 'Todos los temas' },
//     { id: 1, title: 'Tema 1' },
//     { id: 2, title: 'Tema 2' },
//     { id: 3, title: 'Tema 3' },
// ])

function getUnidades(setUnidad) {
    UnidadService.getUnidades()
        .then(us => {
            setUnidad(us ?? [])
        })
}
function getDepartamentos(setDepartamento) {
    DepartamentoService.getDepartamentos()
        .then(ds => {
            setDepartamento(ds ?? [])
        })
}
function getSecciones(setSeccion) {
    SeccionService.getSecciones()
        .then(secs => {
            setSeccion(secs ?? [])
        })
}
function getTemaTramites(setTemaTramite) {
    MesaPartesService.getTemas()
        .then(temas => {
            setTemaTramite(temas ?? [])
        })
}
function getTiposTramites(setTipoTramite) {
    MesaPartesService.getTipos()
        .then(tipos => {
            setTipoTramite(tipos ?? [])
        })
}


function getEstadoSolicitud(delegado,rol) {
    if(delegado==true && rol!=6){
      return ([
        { id: 4, title: 'Todos los estados', icon: <div style={{ mr: 2 }} /> },
        { id: 2, title: 'Delegado', icon: <HowToRegOutlinedIcon sx={{ color: "#FF7A00", mr: 2 }} /> },
        { id: 3, title: 'Atendido', icon: <TaskAltOutlinedIcon sx={{ color: "#43DB7F", mr: 2 }} /> },
    ])
    }
    return ([
        { id: 4, title: 'Todos los estados', icon: <div style={{ mr: 2 }} /> },
        { id: 0, title: 'Enviado', icon: <NearMeOutlinedIcon sx={{ color: "#3B4A81", mr: 2, }} /> },
        { id: 1, title: 'En Revisión', icon: <AccessTimeOutlinedIcon sx={{ color: "#E9D630", mr: 2 }} /> },
        { id: 2, title: 'Delegado', icon: <HowToRegOutlinedIcon sx={{ color: "#FF7A00", mr: 2 }} /> },
        { id: 3, title: 'Atendido', icon: <TaskAltOutlinedIcon sx={{ color: "#43DB7F", mr: 2 }} /> },
    ])
}

export default function DashboardSoli(props) {
    const {
      title, delegado,
      records, setRecords, getSolicitudes, 
      user } = props
    const { rol} = useContext(UserContext);
    /* Abrir Nueva Solicitud Form (in popup) */
    const [openNuevo, setOpenNuevo] = useState(false)
    
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    /* data para mostrar en los combobox */
    const [unidad, setUnidad] = React.useState([])
    const [departamento, setDepartamento] = React.useState([])
    const [seccion, setSeccion] = React.useState([])
    const [temaTramite, setTemaTramite] = React.useState([])
    const [tipoTramite, setTipoTramite] = React.useState([])
    const comboData = 
        {
            unidad: unidad,
            departamento: departamento,
            seccion: seccion,
            temaTramite: temaTramite,
            tipoTramite: tipoTramite
        }
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records, tableHeaders, filterFn);

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues);

    React.useEffect(() => {
        getUnidades(setUnidad)
        getDepartamentos(setDepartamento)
        getSecciones(setSeccion)
        getTemaTramites(setTemaTramite)
        getTiposTramites(setTipoTramite)
        /* note:  estados no tiene porque solo es un numero codigo */
        
    }, [])

/*     React.useEffect( () =>{
      setFilterFn({
        fn: items => {
          return items.filter(x => x.estado
            .includes(0))
        }
     })
    }, []) */

    /* Initial data retrieved */
    // React.useEffect(() => {
    //   console.log("DashBoardSoli: ", comboData)
    // }, [comboData])

    
    //#region HANDLESEARCHS para filtras en la tabla
    const handleSearch = e => {
        let target = e.target;
        /* React "state object" (useState()) doens't allow functions, only
          * objects.  Thus the function needs to be inside an object. */
        setFilterFn({
           fn: items => {
             if (target.value == "" || items.length === 0)
               /* no search text */
               return items
             else
               return items.filter(x => x.asunto.toLowerCase()
                   .includes(target.value.toLowerCase()))
           }
        })
    }

    const handleSearchEstados = e => {
        let target = e.target;
        /* React "state object" (useState()) doens't allow functions, only
          * objects.  Thus the function needs to be inside an object. */
        handleInputChange(e)
        setFilterFn({
          fn: items => {
             if (target.value == 4 || items.length === 0)
               /* no search text */
               return items
             else
               return items.filter(x => x.estado
                   .includes(target.value))
          }
        })
    }

    const handleSearchTemas = e =>{
      let target = e.target;
        /* React "state object" (useState()) doens't allow functions, only
          * objects.  Thus the function needs to be inside an object. */
      handleInputChange(e)
      setFilterFn({
        fn: items => {
           if (target.value == 0 || items.length === 0)
             /* no search text */
             return items
           else
             return items.filter(x => x.temaTramiteID == target.value)

        }
      })
    }

    //#endregion
    


    /* push data to DB.  Does some error handling. */
    function add (solicitud, resetForm) {
      if (!user || !user.persona || !user.persona.id)
        return 
      
      /* complete data */
      solicitud.solicitadorID = user.persona.id     // required

      MesaPartesService.registerSolicitud(solicitud)
        .then((solicitudID) => {
          /* success */
          /* cerrar popup */
          resetForm()
          setOpenNuevo(false)   //setOpenPopup
          /* notify and update table */
          setNotify({
              isOpen: true,
              message: 'Registro de Solicitud Exitoso',
              type: 'success'
          })
          getSolicitudes(setRecords, user)
          
          /* insertar archivos relacionados */
          for (var i = 0; i < solicitud.archivos.length; i++) {
            solicitud.archivos[i].solicitud = { id: solicitudID }
            fileService.registerArchivo(solicitud.archivos[i]);
          }
          // console.log(solicitud)
          // window.alert(`Se inserto la soli con id=${solicitudID}`)
        })
        .catch(err => {
          /* error :( */
          setNotify({
              isOpen: true,
              message: 'Estamos teniendo problemas de conexion.  Consulte a un administrador.',
              type: 'error'
          })
          console.log(err)
          console.log("DashboardSoli: add: ", solicitud, MesaPartesService.f2bSolicitud(solicitud))
        })
    }
    const [valueFecha, setValueFecha] = React.useState([null, null]);

    React.useEffect(() => {
        const fechaIni = moment(valueFecha[0]).format('DD/MM/YYYY')
        const fechaFin = moment(valueFecha[1]).format('DD/MM/YYYY')
        setFilterFn({
          fn: items => {
            if (valueFecha[0]== null && valueFecha[1] == null)
              return items
            if (valueFecha[1]==null)
              return items.filter(x => 
                fechaIni <= moment(x.tracking.fecha_enviado).format('DD/MM/YYYY')
              )
            else{
              return items.filter((x) => fechaIni <= moment(x.tracking.fecha_enviado).format('DD/MM/YYYY') &&
                  moment(x.tracking.fecha_enviado).format('DD/MM/YYYY') <= fechaFin
              )
            }
          }
        })
    }, [valueFecha])

    return (
      <Form>
        <ContentHeader text={title} cbo={false} />
        {/* Buscador */}
        <div style={{ display: "flex", paddingRight: "5px", marginTop: 20 }}>
          <div style={{ width: "400px", marginRight: "50px" }}>
            <Controls.Input
              label="Buscar Solicitud por Nombre"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
              type="search"
            />
          </div>
          <div style={{ width: "360px", marginRight: "50px" }}>
             <Controls.RangeTimePicker 
              value = {valueFecha}
              setValue= {setValueFecha}
            /> 
          </div>
        </div>
        {/* Filtrados */}
        <div style={{ display: "flex", paddingRight: "5px", marginTop: 20 }}>
          <div style={{ width: "700px", marginRight: "50px" }}>
            <Controls.Select
              name="temaTramiteID"
              label="Tema de Trámite"
              value={values.temaTramiteID}
              onChange={handleSearchTemas}
              options={[{id: 0, nombre: "Todos los temas"}]
                .concat(comboData.temaTramite
                  .sort((x1, x2) => x1.nombre - x2.nombre))}
            />
          </div>
          <div style={{ width: "400px", marginRight: "50px" }}>
            <Controls.Select
              name="estadoID"
              label="Estado de Solicitud"
              value={values.estadoID}
              onChange={handleSearchEstados}
              options={getEstadoSolicitud(delegado,rol)}
            />
          </div>
          <div style={{ width: "80vw", textAlign: "right" }}>
            {delegado? 
              <></>:
              <Controls.AddButton
                variant="iconoTexto"
                text="Nueva Solicitud"
                onClick={() => {
                    setOpenNuevo(true);
                }}
              />
            }
          </div>
        </div>
        <DashboardSoliOrganism
          BoxTbl={BoxTbl}
          TblContainer={TblContainer}
          recordsAfterPagingAndSorting={recordsAfterPagingAndSorting}
          TblPagination={TblPagination}
          delegado={delegado}
        />
        {/* "MODALS" */}
        {/* Agregar nueva solicitud */}
        <Popup
          openPopup={openNuevo}
          setOpenPopup={setOpenNuevo}
          title="Mesa de Partes"
        >
          <NuevaSolicitudForm add={add} comboData={comboData}/>
        </Popup>
        <Notification notify={notify} setNotify={setNotify} />
      </Form>
    );
}

