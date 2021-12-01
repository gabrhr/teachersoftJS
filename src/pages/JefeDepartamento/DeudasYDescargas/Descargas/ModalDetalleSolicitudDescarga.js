import React, {useState, useEffect} from 'react'
import { Grid, Typography, Stack } from '@mui/material';
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

export default function ModalDetalleSolicitudDescarga({setOpenDetalle, recordForView}){
    const codigo = '23233421'
    const solicitados = '10'
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
            <div style={{ display: "flex", paddingLeft: "165px", marginTop: 20, marginBottom: 10 }}>
                    <div style={{ width: "140px", marginLeft: "50x", paddingTop:'25px' }}>
                            <Controls.DreamTitle
                                title={`Solicitados: ${recordForView.cantidad_solicitada}`}
                                size='20px'
                                lineheight='100%'
                                />
                    </div>
                    <div style={{ width: "120px", marginLeft: "110px", paddingTop:'25px' }}>
                            <Controls.DreamTitle
                                title={`Aprobados: `}
                                size='20px'
                                lineheight='100%'
                            />
                    </div>
                    <div style={{ width: "150px", marginLeft: "2px", paddingTop:'3px' }}>
                            <Controls.Input
                                name="aprobados"
                                value={values.aprobados}
                                type="number"
                                onChange={handleInputChange}
                                sx={{ width: .4 }}
                                error={errors.aprobados}
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
                            <TableCell sx = {{width: '1200px'}}>
                                {item.solicitador.nombres + " " + item.solicitador.apellidos}
                            </TableCell>
                            <TableCell> 
                                <Controls.Button
                                    text="Detalle"
                                    onClick = {()=>{setOpenSolicitudDescarga(true);console.log(item);setRecordForViewDetalle(item);}}
                                />
                            </TableCell>
                        </TableRow>
                        ))
                    }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </BoxTbl>
            <Grid item align = "right" marginTop={5} >
                <Controls.Button
                    text="Guardar"
                    endIcon={<SaveIcon/>} 
                    type="submit"
                    />
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