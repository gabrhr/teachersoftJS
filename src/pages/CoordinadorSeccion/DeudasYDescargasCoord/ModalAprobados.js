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
import ModalGuardarAprobados from './ModalGuardarAprobados'
import { Alert } from '@mui/material';
import tramiteDescargaService from '../../../services/tramiteDescargaService';
import tramiteSeccionDescargaService from '../../../services/tramiteSeccionDescargaService';
import procesoDescargaService from '../../../services/procesoDescargaService';
import { UserContext } from '../../../constants/UserContext';

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

export default function ModalAprobados({setOpenAprobados, procesoActual, cantAprobada = 0, 
    solicitudActual, resultado = 4}){
    
        console.log("resultado?",resultado)
    const [records, setRecords] = useState([])

    const [aprobados, setAprobados] = React.useState(null)
    const [descargas, setDescargas] = React.useState(0)
    
    const { user } = React.useContext(UserContext)
    

    const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records,tableHeaders, filterFn);

    const guardarSolicitudActual = async() =>{
        for(let i = 0; i < records.length; i++){
            if(records[i].seleccionado){
                records[i].resultado = 1
            }else{
                records[i].resultado = 2
                records[i].tramiteSeccionDescarga = null
            }
            await tramiteDescargaService.updateTramiteDescarga(records[i])
            console.log("ID: de tramite modificado", records[i].id)
        }
        //Se actualiza el estado tracking
        solicitudActual.estado_tracking = 2
        await tramiteSeccionDescargaService.updateTramitesSeccionDescarga(solicitudActual)
        console.log("Records modificado ", records)
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

    const agregarCampo = (request) =>{
        for(let i = 0; i < request.length; i++){
            request[i]["seleccionado"] = true
        }
        /*for(let i = 0; i < request.length; i++){
            delete request[i].seleccionado
        }Mausequerramienta misteriosa*/
        //setDescargas(request.length)
        return request
    }

    const getTramitesDescargasDocentes = async() =>{
        //console.log(user.persona.departamento.id)
        //let procesoActivoNew = await procesoDescargaService.getProcesoDescargaActivoxDepartamento(user.persona.departamento.id)
        let request
        if(resultado === 4){
            const rq1 = await tramiteDescargaService.getTramitesDescargaPendientesxProcesoxSeccion(procesoActual.id, user.persona.seccion.id, 1);
            const rq2 = await tramiteDescargaService.getTramitesDescargaPendientesxProcesoxSeccion(procesoActual.id, user.persona.seccion.id, 2);
            request = rq1.concat(rq2)
        }else{
            request = await tramiteDescargaService.getTramitesDescargaPendientesxProcesoxSeccion(procesoActual.id, user.persona.seccion.id, resultado);
        }
        console.log(request)
        setDescargas(request.length)
        setAprobados(cantAprobada)
        const requestTransformado = agregarCampo(request)
        setRecords(requestTransformado)
    } 

    React.useEffect(() => {
        //listar todos tramites
        getTramitesDescargasDocentes()
    }, [aprobados])

    const history = useHistory()

    const addDocente = (docente) => {
        docente.seleccionado = !docente.seleccionado
        if(docente.seleccionado === true) setDescargas(descargas + 1)
        else setDescargas(descargas - 1)
        console.log(docente.seleccionado)
        console.log(aprobados)
    }

    return (
        <>
                <div style={{ display: "flex", paddingRight: "5px", marginTop: 20 }}>
                    <div style={{ width: "480px", marginRight: "1px" }}>
                        <Controls.Input
                                label="Buscar Solicitud por Nombre"
                                
                                InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                                }}
                                sx={{ width: .9 }}
                                onChange={handleSearch}
                                type="search"
                            />
                    </div>
                    <div style={{ width: "140px", marginLeft: "50x", paddingTop:'25px' }}>
                            <Controls.DreamTitle
                                title={`Aprobados: ${aprobados}`}
                                size='20px'
                                lineheight='100%'
                                />
                    </div>
                    <div style={{ width: "150px", marginLeft: "50px", paddingTop:'25px' }}>
                            <Controls.DreamTitle
                                title={`N° Descargas: ${descargas}`}
                                size='20px'
                                lineheight='100%'
                                />
                    </div>
                </div>
            
            <BoxTbl>
                <TblContainer>
                    <TblHead/>
                    <TableBody>
                    {
                       recordsAfterPagingAndSorting().map((item,index) => (
                        <TableRow>
                            <TableCell sx = {{width: '70px'}}>
                                { resultado!==1 &&
                                <Controls.RowCheckBox sx = '1' onClick = {()=>{addDocente(item)}} checked = {item.seleccionado}>
                                    <EditOutlinedIcon fontSize="small" />
                                </Controls.RowCheckBox>
                                }
                            </TableCell>
                            <TableCell sx = {{width: '533px'}}>
                                {item.solicitador.nombres + " " + item.solicitador.apellidos}
                            </TableCell>
                            <TableCell> 
                                <Alert icon={false} variant="outlined" severity="info" sx={{borderRadius:"25px"}}>
                                    {
                                        item.tipo_bono===1? "Bono de Investigación":"Bono de Docencia"
                                    }
                                </Alert>
                            </TableCell>
                        </TableRow>
                        ))
                    }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </BoxTbl> 
            <Grid conteiner >
                
                <Grid item align = "right" marginTop={5} >
                    {resultado!==1 &&
                    <Controls.Button
                        text="Aprobar descargas"
                        endIcon={<SaveIcon/>} 
                        disabled = {descargas !== aprobados}
                        onClick={(e)=>{
                            guardarSolicitudActual()
                            setOpenAprobados(false)
                            history.push("/cord/asignacionCarga/deudaYDescarga");
                        }} 
                        />
                    } 
                </Grid>
            </Grid>
        </>
    )
}