/* Author: Gabs
 *
 * tablita 
 */
import React, {useState} from 'react'
import { Grid, InputAdornment, Box, TableBody, TableCell, TableRow, Typography, Divider } from '@mui/material'
import { Link} from 'react-router-dom';
import TrackinDescarga from '../../../../components/DreamTeam/TrackinDescarga'
import useTable from '../../../../components/useTable'
import { Controls } from '../../../../components/controls/Controls'

/* icons */
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '../../../../components/controls/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import Popup from '../../../../components/util/Popup';
import ProcesoFinalizadoForm from './ProcesoFinalizadoForm';

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
    const {item,getRow,setOpenPopup,setRecordForEdit} = props
    const [openPopupFinalizado, setOpenPopupFinalizado] = useState(false)
    return (
        <>
            <TableRow>
                <TableCell sx={{maxWidth:"200px"}}>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Nombre de Proceso: {'\u00A0'}
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {item.nombre} 
                    </Typography >
                </TableCell>
                <TableCell > 
                    {/* Tracking dibujo */}
                    <TrackinDescarga item={item}/>
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

    return (
        <div>
            <div style={{display: "flex", paddingRight: "5px", marginTop:20}}>
                {/* <Toolbar> */}
                <Controls.Input
                    label="Buscar Proceso por Nombre"
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
        </div>
    )
}
