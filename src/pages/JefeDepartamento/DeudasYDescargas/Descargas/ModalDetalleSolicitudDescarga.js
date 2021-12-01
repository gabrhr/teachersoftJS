import React, {useState, useEffect} from 'react'
import { Grid, Typography, Stack } from '@mui/material';
import { Controls } from '../../../../components/controls/Controls';
import ContentHeader from '../../../../components/AppMain/ContentHeader';
import Divider from '../../../../components/controls/Divider';
import { Box } from '@mui/system';
import { TextField, Avatar } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { Form, useForm } from '../../../../components/useForm';

const initialFieldValues = {
    justificacion: '',
    aprobados: 0
}

export default function ModalDetalleSolicitudDescarga({setOpenDetalle}){
    const codigo = '23233421'
    const solicitados = '10'

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues);

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
            <div style={{ display: "flex", paddingLeft: "165px", marginTop: 20, marginBottom: 10 }}>
                    <div style={{ width: "140px", marginLeft: "50x", paddingTop:'25px' }}>
                            <Controls.DreamTitle
                                title={`Solicitados: ${solicitados}`}
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
            <Grid item align = "right" marginTop={5} >
                <Controls.Button
                    text="Guardar"
                    endIcon={<SaveIcon/>} 
                    type="submit"
                    />
            </Grid>
            </Form>
        </>
    )
}