import { Divider, Typography, Grid, Avatar} from '@mui/material'
import React from 'react'
import { Controls } from '../../../components/controls/Controls'
import { Form, useForm } from '../../../components/useForm'

const initialFieldValues = {
    asunto: '',
    cantidadSolicitada: 0,
    descripcion: '',
}

export default function DetalleDescarga(props) {
    const {row} = props
    const styleTitles={marginTop:1, fontWeight:"bolder", width:"100%", color:"primary.light"}
    const {
        values,
        //setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues);
    const handleSubmit = e => {
        /* e is a "default parameter" */
        e.preventDefault()
        /* if (validate())
            window.alert('valid')
        else
            window.alert('invalid') */
        /* if (validate())
            addOrEdit(values,resetForm) */
    }
    
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container width="800px">
                <Typography variant="h4" sx={styleTitles} >
                    Tramite: Solicitud de Descarga Horaria
                </Typography>
                <Typography>Seccion: </Typography>
                <Controls.Divider/>
                <Grid container >
                    <Divider />
                    <Grid item pl={.5}>
                    <Avatar>
                        <img  src={`/static/images/avatar/1.jpg`} alt=""></img>
                    </Avatar>
                    </Grid>
                    <Grid item sm>
                        <Typography sx={{paddingLeft:2.5}}>
                            De:
                        </Typography>
                        <div style={{paddingLeft:20}}>
                            Para: Departamento de Ingeniería
                        </div>
                    </Grid>
                </Grid>
                <Typography sx={{paddingLeft:8, marginY:2}}>
                    Asunto: {row.asunto}
                </Typography>
                <Grid item xs={10}>
                    <Controls.Input 
                        name="descripcion"
                        label="Descripción Breve" 
                        value={row.descripcion} 
                        onChange = {handleInputChange}
                        multiline
                        sx={{marginLeft:8, marginTop:5, width:"100%"}}
                    />
                </Grid>
                <Grid item xs={2} mb={2}/>
                <Controls.Divider/>
                <Grid item >
                <Typography variant="h4" sx={styleTitles}>
                    Respuesta a Solicitud
                </Typography>
                <Typography>
                    Cantidad Solicitada: {row.descargaSolicitada} <br/>
                    Cantidad Aceptada: {row.descargaAceptada} 
                </Typography>
                </ Grid>
            </Grid>
        </Form>
    )
}
