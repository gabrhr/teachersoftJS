/* Author: Gabs
 * 
 * Obtiene los datos de la BD, y los pasa a ItemProcesoActual y
 * ListaProcesosPasados
 */
import React, { useState }  from 'react'
import useTable from '../../../../components/useTable'
import { Grid, InputAdornment, Box, TableBody, TableCell, TableRow, Typography, Divider } from '@mui/material'
import { Controls } from '../../../../components/controls/Controls'
import SearchIcon from '@mui/icons-material/Search';
import Popup from '../../../../components/util/Popup';
import NuevoProcesoForm from './NuevoProcesoForm';
import Notification from '../../../../components/util/Notification';
import IconButton from '../../../../components/controls/IconButton';
import { Link} from 'react-router-dom';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

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
      sortable: true
    }
]

export default function GestionProcesos() {
    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [row, setRow] = useState(false)
    const [createData, setCreateData] = useState(false);
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
    /* confirm dialog */
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: '',
        subtitle: ''
    })

    
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
        /* React "state object" (useState()) doens't allow functions, only
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

    const addOrEdit = (employee, resetForm) => {
        //Service

        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)    
        setNotify({
          isOpen: true,
          message: 'Submitted Successfully',
          type: 'success'
        })
    }
    React.useEffect(() => {
        // serviceeeeeeeeeee
       /*  getCiclos()
        .then (newDep =>{
          setRecords(newDep);
          console.log(newDep);
          setDeleteData(false);
          setCreateData(false);
        }); */
    }, [recordForEdit, createData])
    
    return (
        <>
        {/* Proceso actual*/}
        <div style={{ display: "flex", paddingRight: "5px", marginTop: 20 }}>
            <Controls.AddButton
                title="Agregar Nueva Solicitud"
                variant="iconoTexto"
                onClick = {() => {setOpenPopup(true);}}
            />
        </div>
        {/* Procesos Pasados */}
        <Typography variant="h4" > Lista de Procesos de Descarga Anteriores</Typography>

        <div style={{display: "flex", paddingRight: "5px", marginTop:20}}>
                {/* <Toolbar> */}
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
            </BoxTbl>
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Nuevo Proceso de Descarga"
            >
                <NuevoProcesoForm 
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit}
                />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    )
}

function Item(props){
    const {item,getRow,setOpenPopup,setRecordForEdit} = props
    return (
        <>
        
            <TableRow>
                <TableCell sx={{maxWidth:"400px"}}>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Nombre de Proceso: {'\u00A0'}
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {item.nombre} 
                    </Typography >
                </TableCell>
                <TableCell sx={{maxWidth:"250px"}}> 
                    {/* Tracking dibujo */}
                </TableCell>
                <TableCell>
                    <Controls.ActionButton
                        color="warning"
                        onClick={ () => {setOpenPopup(true);setRecordForEdit(item)}}
                    >
                        <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton>
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
        </>
    );
}

