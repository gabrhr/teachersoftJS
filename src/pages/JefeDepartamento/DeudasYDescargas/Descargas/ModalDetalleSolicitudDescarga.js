import React, {useState, useEffect} from 'react'
import { Grid, Typography, Stack, Alert, LinearProgress } from '@mui/material';
import { Controls } from '../../../../components/controls/Controls';
import ContentHeader from '../../../../components/AppMain/ContentHeader';
import Divider from '../../../../components/controls/Divider';
import { Box } from '@mui/system';
import { TextField, Avatar } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { Form, useForm } from '../../../../components/useForm';

//Cosas borrables 
import useTable from '../../../../components/useTable';
import { TableBody } from '@mui/material';
import { TableRow, TableCell } from '@mui/material';
import Popup from '../../../../components/util/Popup'
import SolicitudDescargaForm from '../../../CoordinadorSeccion/DeudasYDescargasCoord/SolicitudDescargaForm';
import tramiteDescargaService from '../../../../services/tramiteDescargaService'
import procesoDescargaService from '../../../../services/procesoDescargaService'
import { UserContext } from '../../../../constants/UserContext';

const initialFieldValues = {
    justificacion: '',
    aprobados: 0
}

const tableHeaders = [
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
        label: 'Bono Solicitado',
        numeric: false,
        sortable: false
    },
]

export default function ModalDetalleSolicitudDescarga({setOpenDetalle, recordForView}){
    const solicitados = recordForView.cantidad_solicitada
    console.log(recordForView)
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues);

    const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } })
    const [records, setRecords] = React.useState([])
    const [openSolicitudDescarga, setOpenSolicitudDescarga] = useState(false)
    const [recordForViewDetalle, setRecordForViewDetalle] = useState(null)
    const { user } = React.useContext(UserContext)
    let atendido = (recordForView.resultado>0)
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records,tableHeaders, filterFn);

    const validate = () => {
        let temp = {...errors}
        temp.aprobados = values.aprobados<0? "Debe ser número positivo"
                        :values.aprobados<=solicitados? 
                        "": "Puede aprobar máximo " + solicitados + " solicitados."
        
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "")
        // Ref:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
    }

    const handleSubmit = async e => {
        /* e is a "default parameter" */
        e.preventDefault()
        if (validate()){

        }
            // addOrEdit(values, resetForm)
    }

    const getTramitesDocente = async() => {
        let procesoActivoNew = await procesoDescargaService.getProcesoDescargaActivoxDepartamento(user.persona.departamento.id)
        const request = await tramiteDescargaService.getTramitesDescargaPendientesxProcesoxSeccion(procesoActivoNew[0].id, user.persona.seccion.id, 0);
        setRecords(request)
    }

    React.useEffect(() => {
        getTramitesDocente()
    }, [recordForView])

    return(
        <>
        <Form onSubmit={handleSubmit}>
            <Grid container spacing={{ xs: "10px" }} >
                <Grid item sx={{mt:"10px", mb:"10px", ml:1}}>
                     <Avatar sx={{ width: 50, height: 50}} src={recordForView.solicitador.foto_URL}/>
                </Grid>
                <Grid item sx={{mt:"9px"}}>
                    <Typography variant="h4" display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        {"De: "}
                    </Typography>
                    <Typography variant="h4"   display="inline">
                        {/* Nombre del docente solicitador */}
                        {recordForView.solicitador.apellidos + ", " + recordForView.solicitador.nombres + 
                        "(" + recordForView.solicitador.correo_pucp + ")"}
                    </Typography>
                    <div/>
                    <Typography variant="h4" display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        {"Para: \xa0"}
                    </Typography>
                    <Typography variant="body1"  display="inline">
                        {/* Seccion que pertenece */}
                        {recordForView.solicitador.departamento.nombre + " (" + 
                        recordForView.solicitador.departamento.correo + ")" }
                    </Typography>
                </Grid>
            </Grid>
            <div style={{ display: "flex", paddingLeft: "160px", alignContent:"center",marginTop: 10, marginBottom: 10 }}>
                    <div style={{ width: "140px", marginLeft: "50px", paddingTop:'25px' }}>
                            <Typography variant="h4" display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                                Solicitadas: {'\u00A0'}
                            </Typography>
                            <Typography display="inline"  fontWeight="550" sx={{color:"secondary.main"}}>
                                {recordForView.cantidad_solicitada}
                            </Typography>
                    </div>
                    <div style={{ width: "120px", marginLeft: "110px", paddingTop:'25px' }}>
                            <Typography variant="h4" display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                                Aprobadas: {'\u00A0'}
                            </Typography>
                    </div>
                    {(!atendido && 
                    <div style={{ width: "100px", marginLeft: "2px", paddingTop:'3px' }}>
                            <Controls.Input
                                name="aprobados"
                                value={values.aprobados}
                                type="number"
                                onChange={handleInputChange}
                                error={errors.aprobados}
                                />
                    </div>) ||
                        <div style={{ width: "120px", paddingTop:'29px' }}>
                        <Typography fontWeight="550" sx={{color:"#2EBD59"}}>
                            {recordForView.cantidad_aprobada}
                        </Typography>
                        </div>
                    }
                </div>
                <Typography variant="h4" sx={{color:"primary.light", ml:"75px", mt:3}}>
                   <b> Lista de Descargas de Docentes Solicitadas </b>
                </Typography>
                <Grid container pl="75px"> 
                    <Grid item xs={12}>
                    <BoxTbl>
                    {recordsAfterPagingAndSorting().length>0? (
                        <>
                            <TblContainer>
                                <TblHead/>
                                <TableBody>
                                {
                                recordsAfterPagingAndSorting().map((item,index) => (
                                    <TableRow>
                                        <TableCell sx = {{width: '70px'}}> 
                                            <Avatar alt="profile pic" src={item.solicitador.foto_URL} />
                                        </TableCell>
                                        <TableCell sx = {{width: '400px'}}>
                                            {item.solicitador.nombres + " " + item.solicitador.apellidos}
                                        </TableCell>
                                        <TableCell sx = {{width: '200px'}}>
                                                <Alert icon={false} variant="outlined" severity="info" sx={{borderRadius:"25px"}}>
                                                    {item.tipo_bono===1? "Bono de Investigación":"Bono de Docencia"}
                                                </Alert>
                                        </TableCell>
                                    </TableRow>
                                    ))
                                }
                                </TableBody>
                            </TblContainer>
                            <TblPagination />
                        </>
                    ):
                        <LinearProgress/>
                    }
                </BoxTbl>
             </Grid>
            </Grid>
            <Grid item align = "right" marginTop={5} >
                { !atendido &&
                    <Controls.Button
                        text="Guardar"
                        endIcon={<SaveIcon/>} 
                        type="submit"
                        />
                }
            </Grid>
            <Popup
                openPopup={openSolicitudDescarga}
                setOpenPopup={setOpenSolicitudDescarga}
                title="Detalle Solicitud"
            >
                <SolicitudDescargaForm recordForView = {recordForViewDetalle}/>
            </Popup>
            </Form>
        </>
    )
}