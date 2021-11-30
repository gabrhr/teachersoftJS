import React, {useState} from 'react'
import { Form } from '../../../components/useForm'
import { Controls } from '../../../components/controls/Controls';
import { Grid, InputAdornment, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SearchIcon from '@mui/icons-material/Search';
import useTable from '../../../components/useTable';
import moment from 'moment'
import 'moment/locale/es'
moment.locale('es');

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
      id: 'cantidad',
      label: 'Cantidad',
      numeric: false,
      sortable: true
    }
]

export default function ListaDescargasPasadasDocente(props) {
    const { records, setRecordForEdit, setOpenPopup } = props
    const [row, setRow] = React.useState(false)
    const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } })
    const [confirmDialog, setConfirmDialog] = useState(
        { isOpen: false, title: '', subtitle: '' })
    

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
    return (
        <Form>
           <div style={{display: "flex", paddingRight: "5px", marginTop:20}}>
                {/* <Toolbar> */}
                <div style={{ width: "600px", marginRight: "50px" }}>
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
            </div>
            { records.length?
             <>
                <BoxTbl>
                    <TblContainer>
                        {/* <TblHead />  */}
                        <TableBody>
                        {
                        recordsAfterPagingAndSorting().map((item, index) => (
                                <Item key={index} item={item} getRow= {getRow}
                                    setOpenPopup={setOpenPopup}
                                    setRecordForEdit={setRecordForEdit}
                                    setConfirmDialog={setConfirmDialog}
                                />
                            ))
                        }
                        </TableBody>
                    </TblContainer>
                    <TblPagination />
                </BoxTbl>
             </>
             :
                <BoxTbl>
                    <Grid item xs= {12} rowSpacing={20} align = "center">
                        <Typography variant="h4" color = "secondary">
                                Aún no tiene Solicitudes de Descarga registradas
                        </Typography>
                    </Grid>
                </BoxTbl>

            } 
        </Form>
    )
}


function Item(props){
    const {item,getRow, setOpenPopup,setRecordForEdit, setConfirmDialog, onDelete} = props
    function formatoFecha(fecha){
        if(fecha!=null){
            return (moment.utc(fecha).format('DD MMM YYYY [-] h:mm a'))
        }
    }
    return (
        <>
        
            <TableRow>
                <TableCell sx={{maxWidth:"400px"}}>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Fecha: {'\u00A0'}
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {//formatoFecha(item.fecha_enviado)
                            "fecha"
                            }
                    </Typography>
                    <div/>
                    <Typography fontWeight='bold' fontSize={18}>
                         {/* Nombre del proceso */}
                    </Typography>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Autor: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {/* Docente de soli */}
                    </Typography>
                </TableCell>
                <TableCell >
                    <Typography display="inline">
                        Resultado de Solicitud:{'\u00A0'}
                    </Typography>
                    <Typography display="inline">
                        {/* Funcion para que sea Aprobado, Rechazada o Pendiente */}
                        Resultado 
                    </Typography>  
                </TableCell>
                <TableCell>
                    <Controls.ActionButton
                        color="warning"
                        onClick={ () => {setOpenPopup(true);setRecordForEdit(item)}}
                    >
                        <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton>
                </TableCell>
            </TableRow>
        </>
    );
}


