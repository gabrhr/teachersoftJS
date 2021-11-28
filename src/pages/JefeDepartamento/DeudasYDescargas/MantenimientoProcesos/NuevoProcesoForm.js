import { Grid, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { Controls } from '../../../../components/controls/Controls';
import { Form, useForm } from '../../../../components/useForm';

const defaultDate = new Date().toString();

const initialFieldValues = {
    /* PROCESO */
    id: 0,
    nombre: '',
    fechaIniDocente: defaultDate,
    fechaFinDocente: defaultDate,
    fechaFinSeccion: defaultDate,
    fechaFinProceso: defaultDate,
}


export default function NuevoProcesoForm(props) {
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
        temp.nombre = values.nombre ? "" : "This field is required."
        
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
                        name="nombre"
                        label="Nombre del Proceso"
                        value={values.nombre}
                        onChange={handleInputChange}
                        error={errors.nombre}
                    />                   
                </Grid>
                <Grid item  xs={12}>
                    <Typography fontWeight="550"  sx={{color:"primary.light"}}>
                        Tiempo del proceso para los Docentes {'\u00A0'}
                    </Typography>
                    <Controls.DatePicker
                        name="fechaIniDocente"
                        label="Fecha Inicio para Docentes"
                        value={values.fechaIniDocente}
                        onChange={handleInputChange}
                        disableFuture
                        openTo="year"
                        views={['year', 'month', 'day']}
                    />
                    <Controls.DatePicker
                        name="fechaFinDocente"
                        label="Fecha Inicio para Docentes"
                        value={values.fechaFinDocente}
                        onChange={handleInputChange}
                        disableFuture
                        openTo="year"
                        views={['year', 'month', 'day']}
                    />
                </Grid>
                <Grid item  xs={12}>
                    <Typography fontWeight="550"  sx={{color:"primary.light"}}>
                        Tiempo del proceso para las Secciones {'\u00A0'}
                    </Typography>
                    <Controls.DatePicker
                        name="fechaFinSeccion"
                        label="Fecha Limite para Sección"
                        value={values.fechaFinSeccion}
                        onChange={handleInputChange}
                        disableFuture
                        openTo="year"
                        views={['year', 'month', 'day']}
                    />
                </Grid>
                <Grid item  xs={12}>
                    <Typography fontWeight="550"  sx={{color:"primary.light"}}>
                        Tiempo del proceso para el Departamento {'\u00A0'}
                    </Typography>
                    <Controls.DatePicker
                        name="fechaFinProceso"
                        label="Fecha Limite para Departamento"
                        value={values.fechaFinProceso}
                        onChange={handleInputChange}
                        disableFuture
                        openTo="year"
                        views={['year', 'month', 'day']}
                    />
                </Grid>
            </Grid>
            <Grid cointainer align="right" mt={5}>
                <div>
                    <Controls.Button
                        text="Guardar Cambios"
                        type="submit"
                    />

                </div>
            </Grid>
        </Form>
    )
}
