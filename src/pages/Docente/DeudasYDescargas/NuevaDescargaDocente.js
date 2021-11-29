import { Grid } from '@mui/material';
import React, {useEffect} from 'react'
import { Controls } from '../../../components/controls/Controls';
import { Form, useForm } from '../../../components/useForm';

const initialFieldValues = {
    /* PROCESO */
    id: 0,
    bonoId: 0,
    justificacion:'',
}

const getBonos = [
    {id: 0, bonoId:0, title: 'Seleccionar'},
    {id: 1, bonoId:1,title: 'Bono de Investigación'},
    {id: 2, bonoId:2,title: 'Bono de Docencia'}
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
        temp.bonoId = values.bonoId !=0 ? "" : "Este campo es requerido."
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
            <Grid container spacing={2} algin="center">
                <Grid item xs={12}>
                    <Controls.Select
                        name="bonoId"
                        label="Bono solicitado"
                        value={values.bonoId}
                        onChange={handleInputChange}
                        options={getBonos}
                        error={errors.bonoId}
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
            <Grid cointainer align="right" mt={3}>
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
