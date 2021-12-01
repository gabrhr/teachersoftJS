import { Grid } from '@mui/material';
import React, {useEffect} from 'react'
import { Controls } from '../../../components/controls/Controls';
import { Form, useForm } from '../../../components/useForm';

const initialFieldValues = {
    /* PROCESO */
    id: 0,
    tipo_bono: 0,
    observacion:'',
}

const getBonos = [
    {id: 0, tipo_bono:0, title: 'Seleccionar'},
    {id: 1, tipo_bono:1,title: 'Bono de Investigación'},
    {id: 2, tipo_bono:2,title: 'Bono de Docencia'}
]


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
        temp.tipo_bono = values.tipo_bono !=0 ? "" : "Este campo es requerido."
        temp.observacion = values.observacion ? "" : "Este campo es requerido."
        
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "")
        // Ref:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
    }


    return (
        <Form onSubmit={handleSubmit}>
            {/* seleccion de tema y tipo tramite */}
            <Grid container spacing={2} algin="center">
                <Grid item xs={12}>
                    <Controls.Select
                        name="tipo_bono"
                        label="Bono solicitado"
                        value={values.tipo_bono}
                        onChange={handleInputChange}
                        options={getBonos}
                        error={errors.tipo_bono}
                    />
                    <Controls.Input
                        name="observacion"
                        label="Justificacion"
                        value={values.observacion}
                        onChange={handleInputChange}
                        error={errors.observacion}
                        multiline
                        minRows={6}
                        maxRows={6}
                    />               
                </Grid>
            </Grid>
            <Grid cointainer align="right" mt={3}>
                <div>
                    <Controls.Button
                        text={recordForEdit? "Guardar cambios":"Enviar Solicitud"}
                        type="submit"
                    />

                </div>
            </Grid>
        </Form>
    )
}
