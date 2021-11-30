/* Author: Gabs
 *
 * tablita 
 */
import React, {useState} from 'react'
import { Grid, InputAdornment, Box, TableBody, TableCell, TableRow, Typography, Divider, Avatar } from '@mui/material'
import { Link} from 'react-router-dom';
import useTable from '../../../../components/useTable'
import { Controls } from '../../../../components/controls/Controls'
/* icons */
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '../../../../components/controls/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import Popup from '../../../../components/util/Popup';
import ProcesoFinalizadoForm from './ProcesoFinalizadoForm';

import moment from 'moment'
import 'moment/locale/es'
import { Form } from '../../../../components/useForm';
moment.locale('es');

const tableHeaders = [
    {
        id: 'proceso',
        label: 'Proceso',
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
        id: 'acciones',
        label: 'Acciones',
        numeric: false,
        sortable: false
    },
    {
        id: 'detalle',
        label: 'Detalle',
        numeric: false,
        sortable: false
    }
]

function formatoFecha(fecha,e) {
    if (fecha != null) {
        if(e>0){
            return (moment.utc(fecha).subtract(5, 'hours').format('DD MMM YYYY'))
        }
        return (moment.utc(fecha).format('DD MMM YYYY'))
    }
    return (" ")
}

function formatoHora(fecha,e) {
    if (fecha != null) {
        if(e>0){
            return (moment.utc(fecha).subtract(5, 'hours').format('h:mm a'))
        }
        return (moment.utc(fecha).format('h:mm a'))
    }
    return (" ")
}

function Item(props){
    const {item,getRow,setOpenPopup,setRecordForEdit} = props
    const [openPopupFinalizado, setOpenPopupFinalizado] = useState(false)
    return (
        <>
            <TableRow>
                <TableCell sx={{minWidth:"200px"}}>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Nombre de Proceso: {'\u00A0'}
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {item.nombre} 
                    </Typography >
                    <div/>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Estado: {'\u00A0'}
                    </Typography>
                    <Typography display="inline" sx={{color:"red"}}>
                        Finalizado
                    </Typography >
                </TableCell>
                <TableCell > 
                    <Grid container>
                        <Grid item xs={1}>
                                <Avatar sx={{ bgcolor: "#3B4A81"}}>
                                    <CalendarTodayOutlinedIcon/>
                                </Avatar>
                        </Grid>
                        <Grid item xs={10}>
                                <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                                    Fecha de inicio: {'\u00A0'}
                                </Typography>
                                <Typography display="inline">
                                    {"Fecha: " + formatoFecha(item.fecha_inicio) + " Hora: " + formatoHora(item.fecha_inicio)}
                                </Typography >
                                <div/>
                                <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                                    Fecha de fin: {'\u00A0'}
                                </Typography>
                                <Typography display="inline">
                                    {"Fecha: " + formatoFecha(item.fecha_fin) + " Hora: " + formatoHora(item.fecha_fin)}
                                </Typography >
                        </Grid>
                    </Grid>

                </TableCell>
                <TableCell sx={{maxWidth:"70px"}}> 
                    <Controls.ActionButton
                        color="warning"
                        onClick={ () => {setOpenPopupFinalizado(true)}}
                    >
                        <AssignmentOutlinedIcon fontSize="small" />
                    </Controls.ActionButton>
                </TableCell>
                <TableCell sx={{maxWidth:"70px"}}>
                    <Link to ={{
                        pathname:"/jd/asignacionCarga/proceso/descarga",
                        state:{
                            procesoinit: item
                        }
                    }}  style={{ textDecoration: 'none' }}>

                        <IconButton size="small"
                            onClick={() => { getRow(item) }}
                        >
                            <ArrowForwardIosIcon fontSize="small" />

                        </IconButton>
                    </Link>
                </TableCell>
            </TableRow>
            <Popup
                openPopup={openPopupFinalizado}
                setOpenPopup={setOpenPopupFinalizado}
                title="Detalle de Proceso de Descarga"
            >
                <ProcesoFinalizadoForm item={item}/>
            </Popup>
        </>

    );
}

export default function ListaProcesosPasados(props) {
    const { records, setRecordForEdit, setOpenPopup } = props
    const [row, setRow] = React.useState(false)
    const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records,tableHeaders, filterFn);

    function getRow ({...props}){
        //setOpenDetalle(true)
        setRow(props)
    }

    const handleSearch = e => {
        let target = e.target;
        /* React "state object" (React.useState()) doens't allow functions, only
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
                fechaIni <= moment(x.fecha_inicio).format('DD/MM/YYYY')
              )
            else{
              return items.filter((x) => fechaIni <= moment(x.fecha_inicio).format('DD/MM/YYYY') &&
                  moment(x.fecha_inicio).format('DD/MM/YYYY') <= fechaFin
              )
            }
          }
        })
    }, [valueFecha])

    return (
        <Form>
            <div style={{ display: "flex", paddingRight: "5px", marginTop: 20 }}>
                <div style={{ width: "500px", marginRight: "50px" }}>
                    <Controls.Input
                        label="Buscar Proceso por Nombre"
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                            ),
                        }}
                        onChange={handleSearch}
                        type="search"
                        fullwidth
                    />
                </div>
                <div style={{ width: "360px", marginRight: "50px" }}>
                    <Controls.RangeTimePicker 
                    value = {valueFecha}
                    setValue= {setValueFecha}
                    /> 
                </div>
            </div>
            
            <BoxTbl>
                {records.length?
                    <>
                        <TblContainer>
                            {/* <TblHead />  */}
                            <TableBody>
                            {
                            recordsAfterPagingAndSorting().map((item,index) => (
                                    <Item key={index} item={item} getRow= {getRow}
                                        setRecordForEdit={setRecordForEdit}
                                        setOpenPopup={setOpenPopup}
                                    />
                                ))
                            }
                            </TableBody>
                        </TblContainer>
                        <TblPagination />

                    </>:
                    <Grid item xs= {12} rowSpacing={20} align = "center">
                        <Typography variant="h4" color = "secondary">
                                No se presenta con un Histórico de Procesos de Descarga
                        </Typography>
                    </Grid>

                }
            </BoxTbl>
        </Form>
    )
}
