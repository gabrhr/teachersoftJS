/* Author: Gabriela
 * 
 * Se muestran "Mis Solicitudes".  Desde aqui se puede:
 * - Generar una nueva solicitud.
 * - Ver detalle de una solicitud.
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
      numeric: false,
      sortable: true
    },{
      id: 'detalle',
      label: 'Detalle',
      numeric: false,
      sortable: true
    },
]


function createData(id, asunto, descripcion , fecha, autorNombre, descargaSolicitada, descargaAceptada) {
    return {
        id, asunto, descripcion ,fecha, autorNombre, descargaSolicitada, descargaAceptada
    }
  }
const usuarios2 = [
    createData('0', 'Solicitud Descarga 2021','Se estima los siguientes docentes asfdasdasdasdasdasdasd ...','2021-09-30 01:14 pm','Caceres','10','3'),
    createData('1', 'Solicitud Descarga 2020','Se estima los siguientes docentes ...','2021-09-30 01:14 pm','Caceres','10','3'),
    createData('2', 'Solicitud Descarga 2019','Se estima los siguientes docentes ...','2021-09-30 01:14 pm','Caceres','10','3'),
]

export default function MisSolicitudes() {
    const [openPopup, setOpenPopup] = useState(false)
    const [openDetalle, setOpenDetalle] = useState(false)
    const [row, setRow] = useState(false)
    const [records, setRecords] = useState(usuarios2)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records,tableHeaders, filterFn);
    
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
    function getRow ({...props}){
        setOpenDetalle(true)
        setRow(props)
    }
    
    return (
        <>
            <ContentHeader text={"Mis solicitudes a Mesa de Partes"} cbo={false}/>
            {/* Buscador */}
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
                    sx={{ width: .3 }}
                    onChange={handleSearch}
                    type="search"
                />
            </div>
            {/* Filtrados */}
            <div style={{display: "flex", paddingRight: "5px", marginTop:20}}>
                
            </div>
            <BoxTbl>
                <TblContainer>
                     {/* <TblHead />  */}
                    <TableBody>
                    {
                       recordsAfterPagingAndSorting().map(item => (
                            <Item item={item} getRow= {getRow}/>
                        ))
                    }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </BoxTbl>
            {/* Agregar nueva solicitud */}
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Nueva solicitud"
            >
                <NuevaSolicitudForm/>
            </Popup>
            {/* Ver detalle de solicitud -> hay que pensarla bien como redireccionar */}
            {/* 
            <Popup
                openPopup={openDetalle}
                setOpenPopup={setOpenDetalle}
                title="Detalle de Solicitud"
            >
                <SolicitudDetalle  row ={row} />
            </Popup> */}
        </>
    )
}

function Item(props){
    const {item,getRow} = props
    return (
        <>
        
            <TableRow key={item.id}>
                <TableCell sx={{maxWidth:"400px"}}>
                    <div >
                        Fecha de Creación: {item.fecha}
                    </div>
                    <Typography >
                        {item.asunto}
                    </Typography>
                    <div >
                        Autor: {item.autorNombre}
                    </div>
                    
                </TableCell>
                <TableCell sx={{maxWidth:"250px"}}> 
                    <Typography paragraph>
                        Descripcion: {item.descripcion}
                    </Typography>
                </TableCell>
                <TableCell >
                    <DT.Etiqueta
                        type="enRevision"
                    />
                </TableCell>
                <TableCell>
                    <Controls.Button
                        text="Detalle"
                        type="submit"
                        onClick = {() => {getRow(item)}}
                    />
                </TableCell>
                {/* <TableCell>{item.bono}</TableCell> */}
            </TableRow>
                        

        </>
    );
}
