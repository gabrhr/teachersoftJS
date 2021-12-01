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
import SolicitudDescargaForm from './SolicitudDescargaForm';
import SaveIcon from '@mui/icons-material/Save';
import ModalGuardarSolicitudActual from './ModalGuardarSolicitudActual'
import {useHistory} from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UserContext } from '../../../constants/UserContext';
import tramiteDescargaService from '../../../services/tramiteDescargaService';
import tramiteSeccionDescargaService from '../../../services/tramiteSeccionDescargaService';
import procesoDescargaService from '../../../services/procesoDescargaService';

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
        window.history.back();
    }

    const [openSolicitudDescarga, setOpenSolicitudDescarga] = useState(false)
    const [openGuardarPopup, setOpenGuardarPopup] = useState(false)
    const { user } = React.useContext(UserContext)
    const [recordForView, setRecordForView] = useState(null)
    const [justificacion, setJustificacion] = useState("")

    const [records, setRecords] = useState([
        {
            "nombres": 'José',
            "apellidos": 'Pérez',
            "solicitador": {
                "apellidos": 'Becerra Menacho',
                "nombres": "Marcelo Martín",
                "correo_pucp": "marcelo.becerra@pucp.edu.pe",
                "seccion": {
                    "nombre": "Ingeniería Informática"
                }
            },
            "correo": '@perez.com',
            "justificacion": 'Por favor',
            "seleccionado": false,
            "fecha_creacion": "2021-11-29T23:07:23.000+00:00",
            "tipo_bono": 1,
            "observacion": "Por favor funciona"
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

    const guardarSolicitud = async() =>{
        let procesoActivoNew = await procesoDescargaService.getProcesoDescargaActivoxDepartamento(user.persona.departamento.id)
        console.log("El id del proceso activo es ", procesoActivoNew[0].id)
        const newTramiteSeccion = {
            "observacion": justificacion,
            "estado_tracking": 0,
            "resultado": 0,
            "seccion": {
                "id": user.persona.seccion.id,
            },
            "ciclo": {
                "id": window.localStorage.getItem("ciclo"),
            },
            "solicitador": {
                "id": user.persona.id,
            },
            "procesoDescarga": {
                "id": procesoActivoNew[0].id,
            },
            "cantidad_solicitada": solicitados,
            "persona_departamento": null,
            "departamento": null,
        }
        //console.log("El nuevo tramite seccion", newTramiteSeccion)
        let resultado = 
            await tramiteSeccionDescargaService.registerTramitesSeccionDescarga(newTramiteSeccion)
        //console.log("El id del tramite seccion es", resultado.id)
        for(let i = 0; i < records.length; i++){
            if(records[i].seleccionado){
                records[i].tramiteSeccionDescarga = {
                    "id": resultado.id,
                }
                records[i].persona_seccion = {
                    "id": user.persona.id,
                }
                /*Se agregan los datos del tramite de seccion*/
            }else{
                records[i].resultado = 2
                /*Se rechaza la solicitud del docente*/
            }
            await tramiteDescargaService.updateTramiteDescarga(records[i])
        }
        console.log("Las filas modificadas", records)
    }

    const agregarCampo = (request) =>{
        for(let i = 0; i < request.length; i++){
            request[i]["seleccionado"] = false
        }
        /*for(let i = 0; i < request.length; i++){
            delete request[i].seleccionado
        }Mausequerramienta misteriosa*/
        return request
    }

    const getTramitesDescargasSeccion = async() =>{
        let procesoActivoNew = await procesoDescargaService.getProcesoDescargaActivoxDepartamento(user.persona.departamento.id)
        const request = await tramiteDescargaService.getTramitesDescargaPendientesxProcesoxSeccion(procesoActivoNew[0].id, user.persona.seccion.id);
        console.log(request)
        const requestTransformado = agregarCampo(request)
        setRecords(requestTransformado)
    }

    React.useEffect(() => {
        getTramitesDescargasSeccion()
    }, [openSolicitudDescarga, openSolicitudDescarga])

    const handleSearch = e => {
        let target = e.target;
        /* React "state object" (React.useState()) doens't allow functions, only
          * objects.  Thus the function needs to be inside an object. */
        setFilterFn({
          fn: items => {
            if (target.value == "")
              /* no search text */
              return items
            else{
              return items.filter(x => x.solicitador.nombres.toLowerCase()
                  .includes(target.value.toLowerCase()))
            }
          }
        })
    }

    const codigo = '20180000'

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
                Código: {user.persona.codigo_pucp ? user.persona.codigo_pucp : `${codigo}`}
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
                        {user.persona.nombres + " " + user.persona.apellidos + " (" + user.persona.correo_pucp + ")"}
                    </Typography>
                    <div/>
                    <Typography variant="h4" display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        {"Para: \xa0"}
                    </Typography>
                    <Typography variant="body1"  display="inline">
                        {/* Seccion que pertenece */}
                        {"Jefe de Departamento de " + user.persona.seccion.nombre}
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
                defaultValue={justificacion}
                onChange={(e) => {setJustificacion(e.target.value)}}
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
                                {item.solicitador.nombres + " " + item.solicitador.apellidos}
                            </TableCell>
                            <TableCell> 
                                <Controls.Button
                                    text="Detalle"
                                    onClick = {()=>{setOpenSolicitudDescarga(true);console.log(item);setRecordForView(item);}}
                                />
                            </TableCell>
                        </TableRow>
                        ))
                    }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </BoxTbl> 
            <Grid container >
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
                title="Detalle Solicitud"
            >
                <SolicitudDescargaForm recordForView = {recordForView}/>
            </Popup>
            <Popup  
                openPopup={openGuardarPopup}
                setOpenPopup={setOpenGuardarPopup}
                title="Guardar"
                size = "sm"
            >
               <ModalGuardarSolicitudActual setOpenGuardarPopup = {setOpenGuardarPopup} guardarSolicitudActual = {guardarSolicitud}/>
            </Popup>
        </Form>
    )
}
