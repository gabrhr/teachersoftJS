import React, {useState} from 'react'
import { Grid, InputAdornment, Box, TableBody, TableCell, TableRow, Typography, Divider } from '@mui/material'
import { Link} from 'react-router-dom';
import TrackinDescarga from '../../../components/DreamTeam/TrackinDescarga'
import useTable from '../../../components/useTable'
import { Controls } from '../../../components/controls/Controls'
import Popup from '../../../components/util/Popup'
import ModalAprobados from './ModalAprobados'
/* icons */
import SearchIcon from '@mui/icons-material/Search';
import { DT } from '../../../components/DreamTeam/DT';
import moment from 'moment'
import 'moment/locale/es'
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


function Item(props){
    const {item,getRow,setOpenAprobados,setProcesoActual} = props
    function formatoFecha(fecha){
        if(fecha!=null){
            return (moment(fecha).format('DD MMM YYYY [-] h:mm a'))
        }
    }
    console.log("item",item)
    setProcesoActual(item.procesoDescarga)
    console.log("Proceso Descarga del item", item.procesoDescarga)
    return (
        <>
            <TableRow>
                <TableCell sx={{minWidth:"150px"}}>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Fecha: {'\u00A0'}
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {formatoFecha(item.fecha_creacion)}
                    </Typography>
                    <div/>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Proceso: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" fontWeight='bold' fontSize={16}>
                        {item.procesoDescarga.nombre}
                    </Typography>
                    <div/>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Seccion: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {item.seccion.nombre}
                    </Typography>
                    <div/>
                </TableCell>
                <TableCell>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Estado: {'\u00A0'} 
                    </Typography>
                    <DT.Etiqueta
                            type={item.resultado === 0 ? "pendiente" :
                            "atendido"}
                            sx={{ marginBottom:"4px"}}
                        />
                </TableCell>
                <TableCell>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Solicitudes recibidas: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {item.cantidad_recibidas} 
                    </Typography>
                    <div/>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Solicitudes enviadas: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {item.cantidad_solicitada} 
                    </Typography>
                    <div/>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Solicitudes aprobadas: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {item.cantidad_aprobada} 
                    </Typography>
                </TableCell>
                <TableCell  align="center"> 
                    <Link to ={{
                        pathname:"/cord/solicitudes/deudasYDescargas/solicitud",
                        state:{
                            recordForEdit: item,
                            procesoActual: item.procesoDescarga
                        }
                    }}  style={{ textDecoration: 'none' }}>
                        <Controls.Button
                            text="Detalle"
                        />
                    </Link>
                    <Controls.Button
                        text="Aprobados"
                        onClick={()=>{setOpenAprobados(true)}} 
                    />
                </TableCell>
            </TableRow>
        </>

    );
}

export default function ListaProcesosPasadosSeccion(props) {
    const {records} = props
    
    const [row, setRow] = React.useState(false)
    const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } })
    const [openAprobados, setOpenAprobados] = useState(false)
    const [procesoActual, setProcesoActual] = useState(null)
    console.log("ifunciontem",procesoActual)

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
            if (target.value == ""){
                /* no search text */
                return items
            }
            else{
                console.log("Items: ", items)
                return items.filter(x => x.solicitador.nombres.toLowerCase()
                  .includes(target.value.toLowerCase()))
            }
          }
        })
    }

    return (
        <div>
            <div style={{display: "flex", paddingRight: "5px", marginTop:20}}>
                <Controls.Input
                    label="Buscar Solicitud por Nombre"
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                    }}
                    sx={{ width: .75 }}
                    onChange={handleSearch}
                    type="search"
                />
            </div>
            <BoxTbl>
                <TblContainer>
                    <TableBody>
                    {
                       recordsAfterPagingAndSorting().map((item,index) => (
                            <Item key={index} item={item} getRow= {getRow}
                                setOpenAprobados={setOpenAprobados} setProcesoActual = {setProcesoActual}
                            />
                        ))
                    }
                    </TableBody>
                </TblContainer>
                {records.length !== 0 && <TblPagination /> }
                {records.length === 0 &&
                    <Typography 
                        variant="h4" 
                        color="secondary"
                        textAlign="center"
                        children="Aún no se presenta un histórico de solicitudes"
                    />
                }
            </BoxTbl> 
            <Popup
                openPopup={openAprobados}
                setOpenPopup={setOpenAprobados}
                title="Aprobados"
                size = "md"
            >
               <ModalAprobados setOpenAprobados = {setOpenAprobados} procesoActual = {procesoActual} resultado = {1}/>
            </Popup>
        </div>
    )
}