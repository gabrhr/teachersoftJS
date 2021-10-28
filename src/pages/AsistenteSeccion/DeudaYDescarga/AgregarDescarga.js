import { Typography, Grid } from '@mui/material'
import React from 'react'
import { Controls } from '../../../components/controls/Controls';
import { Form, useForm } from '../../../components/useForm'

const initialFieldValues = {
    asunto: '',
    cantidadSolicitada: 0,
    descripcion: '',
}


export default function AgregarDescarga() {
    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('cantidadSolicitada' in fieldValues)
        temp.nombre = fieldValues.nombre ? "" : "This field is required."
        setErrors({
            ...temp
        })
        
        if (fieldValues == values)
        return Object.values(temp).every(x => x === "")
        // Ref:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
    }
    const {
        values,
        //setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, true, validate);
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
            <Typography variant="h4" mb={2} >
                Trámite: Solicitud de Descarga Horaria
            </Typography>

            <Controls.Input 
                name="asunto"
                label="Asunto" 
                value={values.asunto} 
                onChange = {handleInputChange}
            />
            <Controls.Input 
                name="cantidadSolicitada"
                label="Cantidad Solicitada de Descargas" 
                value={values.cantidadSolicitada} 
                onChange = {handleInputChange}
            />
            <Controls.Input 
                name="descripcion"
                label="Descripción Breve" 
                value={values.descripcion} 
                onChange = {handleInputChange}
                multiline
            />
            <Grid cointainer align="right" mt={5}>
                <div>
                    <Controls.Button
                        // disabled={true}
                        variant="disabled"
                        text="Cancelar"
                        onClick={resetForm}
                        />
                    <Controls.Button
                        // variant="contained"
                        // color="primary"
                        // size="large"
                        text="Guardar Cambios"
                        type="submit"
                        />
                </div>
            </Grid>
        </Form>
    )
}
