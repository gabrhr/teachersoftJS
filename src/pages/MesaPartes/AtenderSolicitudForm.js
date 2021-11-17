import React from 'react'
import { Grid, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Controls } from '../../components/controls/Controls'
import { DT } from '../../components/DreamTeam/DT'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import { Form, useForm } from '../../components/useForm'

// icons
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ClearIcon from '@mui/icons-material/Clear';

const initialFieldValues = {
    asunto: '',
    descripcion: '',
    resultadoID:4
}

function getColorIcon(resultado){
    if(resultado==1)
        return {color:"#43DB7F"} //Verde de aceptado
    return {color:"#DC395F"} //Rojo de rechazado

}

function obtenerResultadoBox(resultado){
    return (
        <Box
            sx={{
                width:"180px",
                height: "40px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "50px",
                padding:"2px"
            }}
        >
            <Stack direction="row" spacing={2} p={1} ml={2}>
                <PanoramaFishEyeIcon sx={getColorIcon(resultado)}/>
                <Typography variant="body2" style={{pt:"20px"}}>
                    {resultado==1? "Aprobado":"Rechazado"}
                </Typography> 
            </Stack>
        </Box> 
    )
}

function getEstadoResultado() {
    return ([
        { id: 4, title: 'Seleccionar', icon: <div style={{ mr: 2 }} /> },
        { id: 0, title: 'Aceptado', icon: <PanoramaFishEyeIcon sx={{ color: "#43DB7F", mr: 2, }} /> },
        { id: 1, title: 'Rechazado', icon: <PanoramaFishEyeIcon sx={{ color: "#DC395F", mr: 2 }} /> },
    ])
}


export default function AtenderSolicitudForm(props) {
    const {setAtender}=props
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues);

    function validate() {
        let temp = {...errors}
        let defaultError = "Este campo es requerido"
        temp.resultadoID = values.resultadoID !== 4 ? "" : defaultError

        temp.descripcion = values.descripcion ? "" : defaultError
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x === "")
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (validate()) {
            
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <div style={{marginTop:"40px"}}>
                <Controls.Divider/>
                <Grid container mt={3}> 
                    <Grid item md={4}>
                        <Typography variant="h5" mx={2} >
                            Atención de Solicitud
                        </Typography>
                    </Grid>
                    <Grid xs/>
                    <Grid item mr={5}>
                        <Controls.Button
                            variant="outlined"
                            text="Cancelar"
                            onClick={() => {setAtender(false)}}
                            endIcon={<ClearIcon />}
                        />
                        <Controls.Button
                            text="Enviar"
                            type="submit"
                            endIcon={<SendOutlinedIcon />}
                        />
                    </Grid>
                </Grid>
                <Stack direction="column" spacing={2} p={1} ml={"62px"} sx={{width:"250px"}} >
                    <Controls.Select
                        name="resultadoID"
                        label="Resultado"
                        value={values.resultadoID}
                        onChange={handleInputChange}
                        options={getEstadoResultado()}
                        error={errors.resultadoID}
                    />
                </Stack>
                <Grid  md={11}>
                    <Typography fontWeight={"500"} fontSize= {17} mx={2} mt={2} ml={"72px"}>
                        Observación de la Solicitud
                    </Typography>
                    <Controls.Input
                        name="descripcion"
                        label=""
                        value={values.descripcion}
                        onChange={handleInputChange}
                        multiline
                        minRows={6}
                        maxRows={12}
                        sx={{
                            ml:"75px",
                            mr: "20px"
                        }}
                        error={errors.descripcion}
                    />
                </Grid>
            </div>
        </Form>
    )
}

