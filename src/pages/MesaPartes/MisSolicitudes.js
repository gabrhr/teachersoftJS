/* Author: Gabriela
 * 
 * Se muestran "Mis Solicitudes".  Desde aqui se puede:
 * - Generar una nueva solicitud.
 * - Ver detalle de una solicitud.
 * "/doc/misSolicitudes"
 */
import React, { useState } from 'react'
import { Avatar, Grid, InputAdornment, Box, TableBody, TableCell, TableRow, Typography, Divider } from '@mui/material'
import { Controls } from '../../components/controls/Controls'
import useTable from '../../components/useTable'


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
    { id: '1', title: 'Tema 1' },
    { id: '2', title: 'Tema 2' },
    { id: '3', title: 'Tema 3' },
])

function getEstadoSolicitud() {
    return ([

        { id: '4', title: 'Todos los estados', icon: <div style={{ mr: 2 }} /> },
        { id: '0', title: 'Enviado', icon: <NearMeOutlinedIcon sx={{ color: "#3B4A81", mr: 2, }} /> },
        { id: '1', title: 'En Revisión', icon: <AccessTimeOutlinedIcon sx={{ color: "#E9D630", mr: 2 }} /> },
        { id: '2', title: 'Delegado', icon: <HowToRegOutlinedIcon sx={{ color: "#FF7A00", mr: 2 }} /> },
        { id: '3', title: 'Atendido', icon: <TaskAltOutlinedIcon sx={{ color: "#43DB7F", mr: 2 }} /> },
    ])
}
/* function createData(id, asunto, descripcion, fecha, autorNombre, estado) {
    return {
        id, asunto, descripcion, fecha, autorNombre, estado
    }
}
const usuarios2 = [
    createData('0', 'Solicitud Descarga 2019', 'Se estima los siguientes docentes ...', '2021-09-30 01:14 pm', 'Caceres', '0'),
    createData('1', 'Solicitud Descarga 2021', 'Se estima los siguientes docentes asfdasdasdasdasdasdasd ...', '2021-09-30 01:14 pm', 'Caceres', '1'),
    createData('2', 'Solicitud Descarga 2020', 'Se estima los siguientes docentes ...', '2021-09-30 01:14 pm', 'Caceres', '2'),
    createData('3', 'Solicitud Descarga 2020', 'Se estima los siguientes docentes ...', '2021-09-30 01:14 pm', 'Caceres', '3'),
    createData('4', 'Solicitud Descarga 2020', 'Se estima los siguientes docentes ...', '2021-09-30 01:14 pm', 'Caceres', '3'),
]
 */


export default function MisSolicitudes() {
    const [openNuevo, setOpenNuevo] = useState(false)
    const [createData, setCreateData] = useState(false);
    const [row, setRow] = useState(false)
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    /* Solo puede devolver promesa.  El .then() anterior devuelve lo que recibe
     * este then (res.data  (ya transformada)).  Cuando recibe la respuesta,
     * cambia records. */
    function getSolicitudes() {
        MesaPartesService.getSolicitudes()
            .then(data => {
                console.log(data)
                setRecords(data)
            })
    }

    let estado = 1;
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
             if (target.value == "")
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
             if (target.value == 4)
               /* no search text */
               return items
             else
               return items.filter(x => x.estado
                   .includes(target.value))
          }
        })
    }

    /* Busquen que significa lista vacia aqui ¿Cuando se ejecuta? */
    React.useEffect(() => {
        getSolicitudes()
    }, [])

    const add = (solicitud, resetForm) => {
        //MesaPartesService.registerDepartamento(solicitud)
        setOpenNuevo(false)
        resetForm()
        setCreateData(true);
        setNotify({
            isOpen: true,
            message: 'Registro de Solicitud Exitosa',
            type: 'success'
        })
    }

    function getRow({ ...props }) {
        setRow(props)
    }

    return (
        <Form>
            <ContentHeader text={"Mis solicitudes a Mesa de Partes"} cbo={false} />
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
                            )
                        }}
                        onChange={handleSearch}
                        type="search"
                    />

                </div>
                <div style={{ width: "360px", marginRight: "50px" }}>
                    <Controls.RangeTimePicker/>
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
                <div style={{ width: "80vw", textAlign: "right" }}>
                    <Controls.AddButton
                        variant="iconoTexto"
                        text="Nueva Solicitud"
                        onClick={() => { setOpenNuevo(true); }}
                    />
                </div>
            </div>
            <BoxTbl>
                <TblContainer>
                    {/* <TblHead />  */}
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item => (
                                <Item item={item} getRow={getRow} estado={estado} />
                            ))
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </BoxTbl>
            {/* Agregar nueva solicitud */}
            <Popup
                openPopup={openNuevo}
                setOpenPopup={setOpenNuevo}
                title="Mesa de Partes"
            >
                <NuevaSolicitudForm add={add} />
            </Popup>
        </Form>
    )
}

function Item(props) {
    const { item, getRow } = props

    return (
        <>
            <TableRow key={item.id}>
                <TableCell sx={{ maxWidth: "400px" }}>
                    <div >
                        Fecha de Creación: {item.fecha}
                    </div>
                    <Typography >
                        {item.asunto}
                    </Typography>
                    <div >
                        Autor: {item.solicitador.fullName}
                    </div>

                </TableCell>
                <TableCell sx={{ maxWidth: "200px" }}>
                    <Typography paragraph>
                        Descripcion: {item.descripcion}
                    </Typography>
                </TableCell>
                <TableCell >
                    <DT.Etiqueta
                        type={item.estado == 0 ? "enviado" :
                            item.estado == 1 ? "enRevision" :
                            item.estado == 2 ? "delegado" : "atendido"
                        }
                    />
                </TableCell>
                <TableCell>
                    <Link to ={{
                        pathname:'/doc/solicitudDetalle',
                        state:{
                            solicitud: item
                        }
                    }}  style={{ textDecoration: 'none' }}>
                    <Controls.Button
                        text="Detalle"
                        type="submit"
                        onClick={() => { getRow(item) }}
                    />
                    </Link>
                </TableCell>
            </TableRow>
        </>
    );
}
