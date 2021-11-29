import React, {useState, useEffect, useContext} from 'react'
import { Grid, Typography, Stack } from '@mui/material';
import { Controls } from '../../../../components/controls/Controls';
import { Form, useForm } from '../../../../components/useForm';

const defaultDate = new Date();

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
    const { addOrEdit, recordForEdit, setOpenPopup} = props
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(recordForEdit ? recordForEdit : initialFieldValues);

    const handleSubmit = async e => {
        /* e is a "default parameter" */
        e.preventDefault()
        //console.log(ciclo)
        //console.log(user)
        if (validate()){
            addOrEdit(values, resetForm)
            //console.log(newProceso)
        }
    }

    useEffect(() => {
        if (recordForEdit != null) {
            /* object is not empty */
            setValues({
                ...recordForEdit
            })
        }
    }, [recordForEdit])

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        let defaultError = "Campo es requerido"
        temp.nombre = values.nombre ? "" : "This field is required."
        
        if ('nombre' in fieldValues)
            if (fieldValues.nombre.length === 0)
                temp.nombre = "Campo requerido"
                
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
                    <Stack direction="row" align="left" spacing={4}>
                        <Controls.DateTimePickerv2
                            name="fechaIniDocente"
                            label="Fecha Inicio para Docentes"
                            value={values.fechaIniDocente}
                            onChange={handleInputChange}
                        />
                        <Controls.DateTimePickerv2
                            name="fechaFinDocente"
                            label="Fecha Fin para Docentes"
                            value={values.fechaFinDocente}
                            onChange={handleInputChange}
                        />
                    </Stack>
                </Grid>
                <Grid item  xs={12}>
                    
                    <Typography fontWeight="550"  sx={{color:"primary.light"}}>
                        Tiempo del proceso para las Secciones {'\u00A0'}
                    </Typography>
                    <Stack direction="row" align="left" spacing={4}>
                        <Controls.DateTimePickerv2
                            name="fechaFinSeccion"
                            label="Fecha Limite para Sección"
                            value={values.fechaFinSeccion}
                            onChange={handleInputChange}
                        />
                    </Stack>
                </Grid>
                <Grid item  xs={12}>
                    <Typography fontWeight="550"  sx={{color:"primary.light"}}>
                        Tiempo del proceso para el Departamento {'\u00A0'}
                    </Typography>
                    <Controls.DateTimePickerv2
                        name="fechaFinProceso"
                        label="Fecha Limite para Departamento"
                        value={values.fechaFinProceso}
                        onChange={handleInputChange}
                    />
                </Grid>
            </Grid>
            <Grid cointainer align="right" mt={5}>
                <div>
                    <Controls.Button
                        text="Iniciar Proceso"
                        type="submit"
                    />

                </div>
            </Grid>
        </Form>
    )
}
