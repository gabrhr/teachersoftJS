import React, {useState, useEffect} from 'react'
import { Grid, Typography, Stack } from '@mui/material';
import { Controls } from '../../../../components/controls/Controls';
import { Form, useForm } from '../../../../components/useForm';

const defaultDate = new Date();

const initialFieldValues = {
    /* PROCESO */
    id: 0,
    nombre: '',
    fecha_inicio: defaultDate,
    fecha_fin_docente: defaultDate,
    fecha_fin_seccion: defaultDate,
    fecha_fin: defaultDate,
}


export default function NuevoProcesoForm(props) {
    const { addOrEdit, recordForEdit} = props
    console.log("El recordsFE",recordForEdit)
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
        temp.nombre = values.nombre ? "" : "Campo requerido"
        
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
                    <div style={{ width: "545px", marginRight: "50px" }}>
                    <Controls.Input
                        name="nombre"
                        label="Nombre del Proceso"
                        value={values.nombre}
                        onChange={handleInputChange}
                        error={errors.nombre}
                    />                   
                    </div>
                </Grid>
                <Grid item  xs={12}>
                    <Typography fontWeight="550"  sx={{color:"primary.light"}}>
                        Tiempo del proceso para los Docentes {'\u00A0'}
                    </Typography>
                    <Stack direction="row" align="left" spacing={4}>
                            <Controls.DateTimePickerv2
                                name="fecha_inicio "
                                label="Fecha Inicio para Docentes"
                                value={values.fecha_inicio}
                                onChange={handleInputChange}
                                sx={{ width: "500px"}}
                                />
                        <Controls.DateTimePickerv2
                            name="fecha_fin_docente"
                            label="Fecha Fin para Docentes"
                            value={values.fecha_fin_docente}
                            onChange={handleInputChange}
                            sx={{ width: "500px"}}
                            />
                    </Stack>
                </Grid>
                <Grid item  xs={12}>
                    
                    <Typography fontWeight="550"  sx={{color:"primary.light"}}>
                        Tiempo del proceso para las Secciones {'\u00A0'}
                    </Typography>
                    <div style={{ width: "545px", marginRight: "50px" }}>
                        <Controls.DateTimePickerv2
                            name="fecha_fin_seccion"
                            label="Fecha Limite para Sección"
                            value={values.fecha_fin_seccion}
                            onChange={handleInputChange}
                        />
                    </div>
                </Grid>
                <Grid item  xs={12}>
                    <Typography fontWeight="550"  sx={{color:"primary.light"}}>
                        Tiempo del proceso para el Departamento {'\u00A0'}
                    </Typography>
                    <div style={{ width: "545px", marginRight: "50px" }}>
                        <Controls.DateTimePickerv2
                            name="fecha_fin"
                            label="Fecha Limite para Departamento"
                            value={values.fecha_fin}
                            onChange={handleInputChange}
                        />
                    </div>
                </Grid>
            </Grid>
            <Grid cointainer align="right" mt={5}>
                <div>
                    <Controls.Button
                        text={recordForEdit ? "Guardar Cambios" : "Iniciar Proceso"}
                        type="submit"
                    />

                </div>
            </Grid>
        </Form>
    )
}
