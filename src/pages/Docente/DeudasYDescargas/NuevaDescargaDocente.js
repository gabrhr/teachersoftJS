import { Grid } from '@mui/material';
import React, {useEffect} from 'react'
import { Controls } from '../../../components/controls/Controls';
import { Form, useForm } from '../../../components/useForm';

const initialFieldValues = {
    /* PROCESO */
    id: 0,
    bono: '',
    justificacion:'',
}


export default function NuevaDescargaDocente(props) {
    const { addOrEdit, recordForEdit } = props
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(recordForEdit ? recordForEdit : initialFieldValues);

    const handleSubmit = e => {
        /* e is a "default parameter" */
        e.preventDefault()
        if (validate())
            addOrEdit(values, resetForm)
    }

    useEffect(() => {
        if (recordForEdit != null) {
            /* object is not empty */
            setValues({
                ...recordForEdit
            })
        }
    }, [recordForEdit])

    const validate = () => {
        let temp = {...errors}
        temp.bono = values.bono ? "" : "Este campo es requerido."
        temp.justificacion = values.justificacion ? "" : "Este campo es requerido."
        
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "")
        // Ref:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
    }


    return (
        <Form onSubmit={handleSubmit}>
            {/* seleccion de tema y tipo tramite */}
            <Grid container spacing={8}>
                <Grid item xs={6}>
                    <Controls.Input
                        name="bono"
                        label="Bono del Proceso"
                        value={values.bono}
                        onChange={handleInputChange}
                        error={errors.bono}
                    />  
                    <Controls.Input
                        name="justificacion"
                        label="Justificacion"
                        value={values.justificacion}
                        onChange={handleInputChange}
                        error={errors.justificacion}
                        multiline
                        minRows={6}
                        maxRows={6}
                    />               
                </Grid>
            </Grid>
            <Grid cointainer align="right" mt={5}>
                <div>
                    <Controls.Button
                        text="Enviar Solicitud"
                        type="submit"
                    />

                </div>
            </Grid>
        </Form>
    )
}
