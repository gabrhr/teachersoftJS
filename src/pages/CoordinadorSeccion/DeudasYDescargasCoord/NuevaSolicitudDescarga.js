import React, {useState, useEffect} from 'react'
import { Grid, Typography, Paper, Alert, LinearProgress } from '@mui/material';
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
import { useLocation } from 'react-router';

const tableHeaders = [
    
    {
        id: 'seleccionar',
        label: '',
        numeric: false,
        sortable: false
    },
    {
        id: 'foto',
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
        id: 'bono',
        label: 'Bono solicitado',
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
    const location= useLocation()
    const {recordForEdit,procesoActual}=location.state
    console.log("ReocrdforEdit??????", recordForEdit)
    const history = useHistory()
    const handleClick = e =>{
        window.history.back();
    }

    const [openSolicitudDescarga, setOpenSolicitudDescarga] = useState(false)
    const [openGuardarPopup, setOpenGuardarPopup] = useState(false)
    const { user } = React.useContext(UserContext)
    const [recordForView, setRecordForView] = useState(null)
    const [justificacion, setJustificacion] = useState("")
    const PaperStyle = { borderRadius: '20px',  mx:5,pb: 4, pt: 2, px: 5, color: "primary.light", elevatio: 0, mt:3 }
    //Records es solo la lista de Solicitudes de los DOCENTES
    const [records, setRecords] = useState([])
    
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
        //let  = await procesoDescargaService.getProcesoDescargaActivoxDepartamento(user.persona.departamento.id)
        //console.log("El iprocesoActivoNewd del proceso activo es ", procesoActivoNew[0].id)
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
                "id": procesoActual,
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
        //let procesoActivoNew = await procesoDescargaService.getProcesoDescargaActivoxDepartamento(user.persona.departamento.id)
        let request
        
        const rq1 = await tramiteDescargaService.getTramitesDescargaPendientesxProcesoxSeccion(procesoActual, user.persona.seccion.id, 0);
        const rq2 = await tramiteDescargaService.getTramitesDescargaPendientesxProcesoxSeccion(procesoActual, user.persona.seccion.id, 1);
        const rq3 = await tramiteDescargaService.getTramitesDescargaPendientesxProcesoxSeccion(procesoActual, user.persona.seccion.id, 2);

        console.log("rq1 ", rq1)
        console.log("rq2 ", rq2)

        if(typeof rq1 !== 'undefined' && rq2 !== 'undefined'){
            request = rq1.concat(rq2).concat(rq3)
        }else{
            request = []
        }
        

        console.log(procesoActual)
        console.log(user.persona.seccion.id)
        
        let requestTransformado = []

        console.log(request)
        if(request.length !== 0)requestTransformado = agregarCampo(request)
        setRecords(requestTransformado)
    }

    React.useEffect(() => {
        getTramitesDescargasSeccion()
    }, [openSolicitudDescarga])

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
            <Paper variant="outlined" sx={PaperStyle}>
                {/* Encabezado y Justificación */}
                <Grid container spacing={{ xs: "10px" }} >
                    <Grid item sx={{mt:"10px", mb:"10px", ml:1}}>
                        <Avatar sx={{ width: 50, height: 50}} src={user.persona.foto_URL}/>
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
                        size='18px'
                        lineheight='300%'
                        />
                </Box>
                <TextField
                    id="outlined-multiline-static"
                    fullWidth
                    multiline
                    rows={6}
                    value={recordForEdit? recordForEdit.observacion: ""}
                    defaultValue={recordForEdit? recordForEdit.observacion:justificacion}
                    disabled = {recordForEdit? true: false}
                    onChange={(e) => {setJustificacion(e.target.value)}}
                    sx={{
                        pl: "78px",
                        mb: "20px",
                        width: "20%",
                        /* magia negra de gabs */
                        ".css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled": {
                            WebkitTextFillColor: "black"
                        }
                    }}
                />
                {/* Buscador y #solicitados */}
                <Typography variant="h4" sx={{color:"primary.light", ml:"75px", mt:3}}>
                   <b> {recordForEdit? "Lista de Descargas de Docentes Solicitadas":
                            "Lista de Solicitudes de Descarga de los Docentes"
                        }
                   </b>
                </Typography>
                <Grid container ml="75px">
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
                        </div>
                    </Grid>
                    <Grid item xs/>
                    <Grid item  align = "right" mr= {10} marginTop={5} >
                        <Typography variant="h4" sx={{color:"primary.light"}}>
                            Solicitados: <b> {recordForEdit? recordForEdit.cantidad_solicitada : solicitados}</b>
                        </Typography>
                    </Grid>
                </Grid>
                {/* Tabla de Docentes y sus solicitudes */}
                <Grid container  pl={"75px"}>
                    <Grid item xs={12}>
                        <BoxTbl>
                            {recordsAfterPagingAndSorting().length>0? (
                                <>
                                    <TblContainer>
                                        <TblHead/>
                                        <TableBody>
                                        
                                        {
                                            recordsAfterPagingAndSorting().map((item,index) => (
                                                <TableRow
                                                 sx={item.tramiteSeccionDescarga?.id? {backgroundColor: '#ADFDCC'}: {backgroundColor: '#fff'}}
                                                >
                                                <TableCell sx = {{width: '70px'}}>
                                                { !recordForEdit &&
                                                        <Controls.RowCheckBox sx = '1' onClick = {()=>{addDocente(item)}} checked = {item.seleccionado}>
                                                            <EditOutlinedIcon fontSize="small" />
                                                        </Controls.RowCheckBox>

}
                                                </TableCell>
                                                <TableCell sx = {{width: '70px'}}> 
                                                    <Avatar alt="profile pic" src={item.solicitador.foto_URL} />
                                                </TableCell>
                                                <TableCell sx = {{maxWidth: '400px'}}>
                                                    {item.solicitador.nombres + " " + item.solicitador.apellidos}
                                                </TableCell>
                                                <TableCell sx = {{width: '250px'}}>
                                                    <Alert icon={false} variant="outlined" severity="info" sx={{borderRadius:"25px"}}>
                                                        {item.tipo_bono===1? "Bono de Investigación":"Bono de Docencia"}
                                                    </Alert>
                                                </TableCell>
                                                <TableCell sx = {{maxWidth: '200px'}}> 
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
                                </>
                            ):
                            
                            (
                                    <LinearProgress />
                            )

                            }
                        </BoxTbl> 
                    </Grid>
                </Grid>
                <Grid cointainer align="right" mt={5}>
                    <div>
                        <Controls.Button
                            text="guardar"
                            endIcon={<SaveIcon/>} 
                            // disabled = {(dValuNombre && dValuCreditos && dValuUnidad && dValuHorario) ? false : true}
                            onClick = {()=>setOpenGuardarPopup(true)}  
                            />

                    </div>
                </Grid>
            </Paper>
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
