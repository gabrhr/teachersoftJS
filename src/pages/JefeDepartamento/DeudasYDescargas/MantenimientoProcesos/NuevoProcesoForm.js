import React, {useState, useEffect} from 'react'
import { Grid, Typography, Stack } from '@mui/material';
import { Controls } from '../../../../components/controls/Controls';
import { Form, useForm } from '../../../../components/useForm';
import ValidationBox from '../../../../components/DreamTeam/ValidationBox';

const defaultDate = new Date();

const initialFieldValues = {
    /* PROCESO */
    id: 0,
    nombre: '',
    fecha_inicio: null,
    fecha_fin_docente: null,
    fecha_fin_seccion: null,
    fecha_fin_docente1: null,
    fecha_fin_seccion1: null,
    fecha_fin: null,
}


export default function NuevoProcesoForm(props) {
    const { addOrEdit, recordForEdit} = props
    const [open, setOpen] = useState(false);
    const [openDocente, setOpenDocente] = useState(false);
    const [openSeccion, setOpenSeccion] = useState(false);
    const [openDepa, setOpenDepa] = useState(false);

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
        const fechaInicio = new Date(values.fecha_inicio);
        const fechaFinDocente = new Date(values.fecha_fin_docente);
        temp.nombre = values.nombre ? "" : "Campo requerido"
        temp.fecha_inicio = values.fecha_inicio? "":"Campo requerido"
        temp.fecha_fin_docente = values.fecha_fin_docente? "":"Campo requerido"
        temp.fecha_fin_seccion = values.fecha_fin_seccion? "":"Campo requerido"
        temp.fecha_fin = values.fecha_fin? "":"Campo requerido"
        
        if(!values.fecha_inicio || !values.fecha_fin_docente || !values.fecha_fin_seccion ||
            !values.fecha_fin){
                setOpen(true)
            
        }else setOpen(false)
        if(values.fecha_inicio>values.fecha_fin_docente){
            setOpenDocente(true)
            temp.fecha_fin_docente = "Mal fecha"
        }else setOpenDocente(false)
        if(values.fecha_fin_docente>values.fecha_fin_seccion){
            setOpenSeccion(true)
            temp.fecha_fin_seccion = "Mal fecha"
        }else setOpenSeccion(false)
        if(values.fecha_fin_seccion>values.fecha_fin){
            setOpenDepa(true)
            temp.fecha_fin = "Mal fecha"
        }else setOpenDepa(false)
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "")
        // Ref:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
    }


    return (
        <Form onSubmit={handleSubmit}>
            {/* seleccion de tema y tipo tramite */}
            <Grid container spacing={1}>
                <Grid item xs={12}>
                     <Typography fontWeight="550"  sx={{color:"primary.light"}}>
                        Proceso de Descarga {'\u00A0'}
                    </Typography>
                    <Stack direction="row" align="left" spacing={4}>
                        <Controls.Input
                            name="nombre"
                            label="Nombre del Proceso"
                            value={values.nombre}
                            onChange={handleInputChange}
                            error={errors.nombre}
                            />  
                        <ValidationBox
                            open = {open}
                            setOpen = {setOpen}
                            text = {"Verificar que se ha ingresado todas las fechas"}
                        />  
                    </Stack>               
                </Grid>
                <Grid item  xs={12}>
                    <Typography fontWeight="550"  sx={{color:"primary.light"}}>
                        Tiempo del proceso para los Docentes {'\u00A0'}
                    </Typography>
                    <Typography  sx={{color:"primary.light", mb:1}}>
                        Fechas para el envío de solicitudes de Descarga de los docentes a sus Secciones correspondientes.
                    </Typography>
                    <Stack direction="row" align="left" spacing={4}>
                        <Controls.DateTimePickerv2
                            name="fecha_inicio"
                            label="Fecha Inicio para Docentes"
                            value={values.fecha_inicio}
                            onChange={handleInputChange}
                            sx={{ width: "500px"}}
                            helperText={errors.fecha_inicio}
                            />
                        <Grid item  xs={12}>
                            <Controls.DateTimePickerv2
                            name="fecha_fin_docente"
                            label="Fecha Fin para Docentes"
                            value={values.fecha_fin_docente}
                            onChange={handleInputChange}
                            sx={{ width: "500px"}}
                            helperText={errors.fecha_fin_docente}
                            error={errors.fecha_fin_docenteB}
                            />
                            <ValidationBox
                                open = {openDocente}
                                setOpen = {setOpenDocente}
                                text = {"Fecha fin debe ser posterior a la fecha inicio para Docentes."}
                            />
                        </Grid>
                    </Stack>
                </Grid>
                <Grid item  xs={12}>
                    <Typography fontWeight="550"  sx={{color:"primary.light"}}>
                        Tiempo del proceso para las Secciones {'\u00A0'}
                    </Typography>
                    <Typography  sx={{color:"primary.light", mb:1}}>
                        Fechas para el envío de solicitudes de Descarga de las Secciones, tras evaluar
                         cada una de las solicitudes de los Docentes.
                    </Typography>
                    <Stack direction="row" align="left" spacing={4}>
                        <Controls.DateTimePickerv2
                            name="fecha_fin_docente1"
                            label="Fecha Inicio para Secciones"
                            value={values.fecha_fin_docente}
                            onChange={handleInputChange}
                            disabled
                            />
                        <Grid item xs={12}>
                        <Controls.DateTimePickerv2
                            name="fecha_fin_seccion"
                            label="Fecha Fin para Secciones"
                            value={values.fecha_fin_seccion}
                            onChange={handleInputChange}
                            invalidDateMessage={errors.fecha_fin_seccion}
                            />
                            <ValidationBox
                                open = {openSeccion}
                                setOpen = {setOpenSeccion}
                                text = {"Fecha fin debe ser posterior a la fecha inicio para las Secciones."}
                            />
                            </Grid>
                    </Stack>
                </Grid>
                <Grid item  xs={12}>
                    <Typography fontWeight="550"  sx={{color:"primary.light"}}>
                        Tiempo del proceso para el Departamento {'\u00A0'}
                    </Typography>
                    <Typography  sx={{color:"primary.light", mb:1}}>
                        Fechas para la atención y evaluación de las solicitudes de Descarga de las Secciones
                    </Typography>
                    <Stack direction="row" align="left" spacing={4}>
                        <Controls.DateTimePickerv2
                            name="fecha_fin_seccion1"
                            label="Fecha Fin para Secciones"
                            value={values.fecha_fin_seccion}
                            onChange={handleInputChange}
                            disabled
                        />
                        <Grid item  xs={12}>
                            <Controls.DateTimePickerv2
                            name="fecha_fin"
                            label="Fecha Limite para Departamento"
                            value={values.fecha_fin}
                            onChange={handleInputChange}
                            error={errors.fecha_fin}
                            />
                            <ValidationBox
                                open = {openDepa}
                                setOpen = {setOpenDepa}
                                text = {"Fecha fin debe ser posterior a la fecha inicio para el Departamento."}
                            />
                        </Grid>
                    </Stack>
                </Grid>
            </Grid>
            <Grid cointainer align="right" mt={5}>
                    <Controls.Button
                        text={recordForEdit ? "Guardar Cambios" : "Iniciar Proceso"}
                        type="submit"
                    />

            </Grid>
        </Form>
    )
}
