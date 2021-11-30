import React, {useState, useEffect} from 'react'
import { Grid, Typography, Stack } from '@mui/material';
import { Controls } from '../../../components/controls/Controls';
import { Form, useForm } from '../../../components/useForm';
import ContentHeader from '../../../components/AppMain/ContentHeader';
import Divider from '../../../components/controls/Divider';
import { Box } from '@mui/system';
import { TextField, Avatar } from '@mui/material';
import useTable from '../../../components/useTable';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TableBody } from '@mui/material';
import { TableRow, TableCell } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Popup from '../../../components/util/Popup'
import SolicitudDescargaForm from '../../Docente/DeudasYDescargas/SolicitudDescargaForm';
import SaveIcon from '@mui/icons-material/Save';
import ModalGuardarSolicitudActual from './ModalGuardarSolicitudActual'
import {useHistory} from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const tableHeaders = [
    
    {
        id: 'seleccionar',
        label: '',
        numeric: false,
        sortable: false
    },
    {
        id: 'nombre',
        label: 'Nombre del docente',
        numeric: false,
        sortable: true
    },
    {
        id: 'justificacion',
        label: 'Justificación',
        numeric: false,
        sortable: false
    },
]

export default function NuevoProcesoForm() {
    const history = useHistory()
    const handleClick = e =>{
        history.push("/cord/solicitudes/deudasYDescargas")
      }

    const [openSolicitudDescarga, setOpenSolicitudDescarga] = useState(false)
    const [openGuardarPopup, setOpenGuardarPopup] = useState(false)
    
    const [records, setRecords] = useState([
        {
            nombre: 'Perez',
            correo: '@perez.com',
            justificacion: 'Por favor',
            seleccionado: false
        }
    ])

    const [row, setRow] = React.useState(false)
    const [solicitados, setSolicitados] = React.useState(0)
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

    const codigo = '1342221'

    const addDocente = (docente) => {
        docente.seleccionado = !docente.seleccionado
        if(docente.seleccionado === true) setSolicitados(solicitados + 1)
        else setSolicitados(solicitados - 1)
        console.log(docente.seleccionado)
        console.log(solicitados)
    }

    return (
        <Form>
            <ContentHeader
                text="Nueva solicitud de descarga"
                cbo={false}
            />
            <Controls.Button
                variant="outlined"
                text="Regresar"
                size="small"
                startIcon={<ArrowBackIcon />}
                onClick={(e) => {handleClick(e)}}
            />
            <Divider/>
            <Typography fontWeight="550"  sx={{color:"primary.light"}}>
                Código: {`${codigo}`}
            </Typography>
            <Divider/>
            <Grid container spacing={{ xs: "10px" }} >
                <Grid item sx={{mt:"10px", mb:"10px", ml:1}}>
                    {/* <Avatar sx={{ width: 50, height: 50}} src={soli}/> */}
                    <Avatar sx={{ width: 50, height: 50}}/>
                </Grid>
                <Grid item sx={{mt:"9px"}}>
                    <Typography variant="h4" display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        {"De: "}
                    </Typography>
                    <Typography variant="h4"   display="inline">
                        {/* Nombre del docente solicitador */}
                        Docente PUCP (correo)
                    </Typography>
                    <div/>
                    <Typography variant="h4" display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        {"Para: \xa0"}
                    </Typography>
                    <Typography variant="body1"  display="inline">
                        {/* Seccion que pertenece */}
                        Seccion
                    </Typography>
                </Grid>
            </Grid>
            <Box ml="75px">
                <Controls.DreamTitle
                    title={'Justificación: '}
                    size='20px'
                    lineheight='300%'
                    />
            </Box>
            <TextField
                id="outlined-multiline-static"
                fullWidth
                multiline
                rows={6}
                defaultValue={""}
                sx={{
                    pl: "78px",
                    mb: "20px",
                    width: "62.5%",
                    /* magia negra de gabs */
                    ".css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled": {
                        WebkitTextFillColor: "black"
                    }
                }}
            />
            <Grid container>
                <Grid item >
                <div style={{ display: "flex", paddingRight: "5px", marginTop: 20 }}>
                    <div style={{ width: "500px", marginRight: "50px" }}>
                        <Controls.Input
                                label="Buscar Solicitud por Nombre"
                                InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                                }}
                                sx={{ width: .2 }}
                                onChange={handleSearch}
                                type="search"
                            />
                    </div>
                    <div style={{ width: "140px", marginLeft: "850px", paddingTop:'25px' }}>
                            <Controls.DreamTitle
                                title={`Solicitados: ${solicitados}`}
                                size='20px'
                                lineheight='100%'
                                />
                    </div>
                </div>
                </Grid>
                <Grid>
                    
                </Grid>
                
                
            </Grid>
            
            <BoxTbl>
                <TblContainer>
                    <TblHead/>
                    <TableBody>
                    {
                       recordsAfterPagingAndSorting().map((item,index) => (
                        <TableRow>
                            <TableCell sx = {{width: '70px'}}>
                                <Controls.RowCheckBox sx = '1' onClick = {()=>{addDocente(item)}} checked = {item.seleccionado}>
                                    <EditOutlinedIcon fontSize="small" />
                                </Controls.RowCheckBox>
                            </TableCell>
                            <TableCell sx = {{width: '1200px'}}>
                                {item.nombre}
                            </TableCell>
                            <TableCell> 
                                <Controls.Button
                                    text="Detalle"
                                    onClick = {()=>{setOpenSolicitudDescarga(true)}}
                                />
                            </TableCell>
                        </TableRow>
                        ))
                    }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </BoxTbl> 
            <Grid conteiner >
                <Grid item align = "right" marginX = {20} marginTop={5} >
                    <Controls.Button
                        text="guardar"
                        endIcon={<SaveIcon/>} 
                        // disabled = {(dValuNombre && dValuCreditos && dValuUnidad && dValuHorario) ? false : true}
                        onClick = {()=>setOpenGuardarPopup(true)}  
                        />
                </Grid>
            </Grid>
            <Popup
                openPopup={openSolicitudDescarga}
                setOpenPopup={setOpenSolicitudDescarga}
                title="Búsqueda de docentes para prácticas"
            >
                <SolicitudDescargaForm />
            </Popup>
            <Popup
                openPopup={openGuardarPopup}
                setOpenPopup={setOpenGuardarPopup}
                title="Guardar"
                size = "sm"
            >
               <ModalGuardarSolicitudActual setOpenGuardarPopup = {setOpenGuardarPopup} /*guardarSolicitud = {guardarSolicitud}*//>
            </Popup>
        </Form>
    )
}
