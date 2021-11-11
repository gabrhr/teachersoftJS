/* Author: Gabriela
 * 
 * Se muestran "Mis Solicitudes".  Desde aqui se puede:
 * - Generar una nueva solicitud.
 * - Ver detalle de una solicitud.
 * "/doc/misSolicitudes"
 */
import React, { useState, useContext } from 'react'
import { Avatar, Grid, InputAdornment, Box, TableBody, TableCell, TableRow, Typography, Divider } from '@mui/material'
import { Controls } from '../../components/controls/Controls'
import useTable from '../../components/useTable'
import Notification from '../../components/util/Notification'


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


const tableHeaders = [
    {
        id: 'asunto',
        label: 'Asunto',
        numeric: false,
        sortable: true
    },
    {
        id: 'descripcion',
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
    departmentID: '0',
    estadoID: '4'
}

export const getTemaTramites = () => ([
    { id: 1, title: 'Todos los temas' },
    { id: 1, title: 'Tema 1' },
    { id: 2, title: 'Tema 2' },
    { id: 3, title: 'Tema 3' },
])

function getEstadoSolicitud() {
    return ([

        { id: 4, title: 'Todos los estados', icon: <div style={{ mr: 2 }} /> },
        { id: 0, title: 'Enviado', icon: <NearMeOutlinedIcon sx={{ color: "#3B4A81", mr: 2, }} /> },
        { id: 1, title: 'En Revisión', icon: <AccessTimeOutlinedIcon sx={{ color: "#E9D630", mr: 2 }} /> },
        { id: 2, title: 'Delegado', icon: <HowToRegOutlinedIcon sx={{ color: "#FF7A00", mr: 2 }} /> },
        { id: 3, title: 'Atendido', icon: <TaskAltOutlinedIcon sx={{ color: "#43DB7F", mr: 2 }} /> },
    ])
}

export default function DashboardSoli(props) {
    const {title,records, setRecords} =props
    const { rol} = useContext(UserContext);
    console.log(rol)
    /* Abrir Nueva Solicitud Form (in popup) */
    const [openNuevo, setOpenNuevo] = useState(false)
    /* que hace este? */
    const [createData, setCreateData] = useState(false);
    
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    /* Solo puede devolver promesa.  El .then() anterior devuelve lo que recibe
     * este then (res.data  (ya transformada)).  Cuando recibe la respuesta,
     * cambia records. */
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
    /* push data to DB */
    function add (solicitud) {
        //MesaPartesService.registerDepartamento(solicitud)
        setOpenNuevo(false)
        resetForm()
        // setCreateData(true);
        // MesaPartesService.registerSolicitud(values)
        setNotify({
            isOpen: true,
            message: 'Registro de Solicitud Exitosa',
            type: 'success'
        })
    }

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
            <Controls.RangeTimePicker />
          </div>
        </div>
        {/* Filtrados */}
        <div style={{ display: "flex", paddingRight: "5px", marginTop: 20 }}>
          <div style={{ width: "400px", marginRight: "50px" }}>
            <Controls.Select
              name="departmentID"
              label="Tema de Tramite"
              value={values.departmentID}
              onChange={handleInputChange}
              options={getTemaTramites()}
            />
          </div>
          <div style={{ width: "400px", marginRight: "50px" }}>
            <Controls.Select
              name="estadoID"
              label="Estado de Solicitud"
              value={values.estadoID}
              onChange={handleSearchEstados}
              options={getEstadoSolicitud()}
            />
          </div>
          {rol==6? 
            <></>:
            <div style={{ width: "80vw", textAlign: "right" }}>
                <Controls.AddButton
                variant="iconoTexto"
                text="Nueva Solicitud"
                onClick={() => {
                    setOpenNuevo(true);
                }}
                />
            </div>
          }
        </div>
        <DashboardSoliOrganism
          BoxTbl={BoxTbl}
          TblContainer={TblContainer}
          TableBody={TableBody}
          recordsAfterPagingAndSorting={recordsAfterPagingAndSorting}
          TblPagination={TblPagination}
        />
        {/* "MODALS" */}
        {/* Agregar nueva solicitud */}
        <Popup
          openPopup={openNuevo}
          setOpenPopup={setOpenNuevo}
          title="Mesa de Partes"
        >
          <NuevaSolicitudForm add={add} />
        </Popup>
        <Notification notify={notify} setNotify={setNotify} />
      </Form>
    );
}

