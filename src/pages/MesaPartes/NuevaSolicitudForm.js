/* Author: Mitsuo
 *
 * Invocado desde MisSolicitudes.js.  Añade una solicitud a la BD.
 */
import React from 'react'
import { DT } from '../../components/DreamTeam/DT'
import { Grid, IconButton, Typography, Box } from '@mui/material';
import { useForm, Form } from '../../components/useForm';
import { Controls } from '../../components/controls/Controls';
import * as MesaPartesService from '../../services/mesaPartesService';
import * as UnidadService from '../../services/unidadService';
import DepartamentoService from '../../services/departamentoService'
import SeccionService from '../../services/seccionService'

import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

/* BACK FAKE */
function getUnidades() {
    return [
        { id: '0', nombre: 'Seleccionar' },
        { id: '1', nombre: 'Facultad Ciencias E Ingenieria' },
        { id: '2', nombre: 'Facultad de Artes y Diseño' },
        { id: '3', nombre: 'Facultad de Ciencias Sociales' },
    ]
}

function getDepartamentos() {
    return [
        { id: '0', unidad: { id: '0' }, nombre: 'Seleccionar' },
        { id: '1', unidad: { id: '1' }, nombre: 'Ingenieria' },
        { id: '2', unidad: { id: '1' }, nombre: 'Fisica' },
        { id: '3', unidad: { id: '1' }, nombre: 'Matematica' },
    ]
}

function getSecciones() {
    return [
        { id: '0', departamento: { id: '0' }, nombre: 'Seleccionar' },
        { id: '1', departamento: { id: '1' }, nombre: 'Ing. Informatica' },
        { id: '2', departamento: { id: '1' }, nombre: 'Ing. Civil' },
        { id: '3', departamento: { id: '1' }, nombre: 'Ing. Mecanica' },
    ]
}

function getTemaTramites() {
    return [
        { id: '0', seccion: { id: '0' }, nombre: 'Seleccionar' },
        { id: '1', seccion: { id: '1' }, nombre: 'Personal Administrativo' },
        { id: '2', seccion: { id: '1' }, nombre: 'Personal Docente' },
        { id: '3', seccion: { id: '1' }, nombre: 'Otros Tramites' },
        { id: '4', seccion: { id: '2' }, nombre: 'Personal Administrativo' },
        { id: '5', seccion: { id: '2' }, nombre: 'Personal Docente' },
        { id: '6', seccion: { id: '2' }, nombre: 'Otros Tramites' },
        { id: '7', seccion: { id: '3' }, nombre: 'Personal Administrativo' },
        { id: '8', seccion: { id: '3' }, nombre: 'Personal Docente' },
        { id: '9', seccion: { id: '3' }, nombre: 'Otros Tramites' },
    ]
}

function getTipoTramites() {
    return [
        { id: '0', temaTramite: { id: '0' }, nombre: 'Seleccionar' },
        { id: '1', temaTramite: { id: '1' }, nombre: 'Descanso medico' },
        { id: '2', temaTramite: { id: '1' }, nombre: 'Descarga' },
        { id: '3', temaTramite: { id: '2' }, nombre: 'Descanso medico' },
        { id: '4', temaTramite: { id: '2' }, nombre: 'Descarga' },
        { id: '5', temaTramite: { id: '3' }, nombre: 'Descanso medico' },
        { id: '6', temaTramite: { id: '3' }, nombre: 'Descarga' },
        { id: '7', temaTramite: { id: '4' }, nombre: 'Descanso medico' },
        { id: '8', temaTramite: { id: '4' }, nombre: 'Descarga' },
        { id: '9', temaTramite: { id: '5' }, nombre: 'Descanso medico' },
        { id: '10', temaTramite: { id: '5' }, nombre: 'Descarga' },
        { id: '11', temaTramite: { id: '6' }, nombre: 'Descanso medico' },
        { id: '12', temaTramite: { id: '6' }, nombre: 'Descarga' },
        { id: '13', temaTramite: { id: '7' }, nombre: 'Descanso medico' },
        { id: '14', temaTramite: { id: '7' }, nombre: 'Descarga' },
        { id: '15', temaTramite: { id: '8' }, nombre: 'Descanso medico' },
        { id: '16', temaTramite: { id: '8' }, nombre: 'Descarga' },
        { id: '17', temaTramite: { id: '9' }, nombre: 'Descanso medico' },
        { id: '18', temaTramite: { id: '9' }, nombre: 'Descarga' },
    ]
}
/* -----end of BACK FAKE----- */

// function getUnidades(setComboData) {
//     UnidadService.getUnidades()
//         .then(data => {
//             setComboData(data ?? [])
//         })
// }
// function getDepartamentos(setComboData) {
//     DepartamentoService.getDepartamentos()
//         .then(data => {
//             setComboData(data ?? [])
//         })
// }
// function getSecciones(setComboData) {
//     SeccionService.getSecciones()
//         .then(data => {
//             setComboData(data ?? [])
//         })
// }
// function getTemaTramites(setComboData) {
//     MesaPartesService.getTemas()
//         .then(data => {
//             setComboData(data ?? [])
//         })
// }
// function getTipoTramites(setComboData) {
//     MesaPartesService.getTipos()
//         .then(data => {
//             setComboData(data ?? [])
//         })
// }

const initialFieldValues = {
    /* SOLICITUD */
    id: 0,
    asunto: '',
    descripcion: '',
    //solicitador
    archivos: [],
    //delegado

    tracking: {
        fecha_enviado: new Date(),
    },

    estado: 0,          // enviado
    resultado: 0,

    tipoTramiteID: '0',

    /* EXTRA */
    unidadID: '0',
    departamentoID: '0',
    seccionID: '0',
    temaTramiteID: '0',
}

function ActualForm(props) {
    const { values, setValues, errors,
        handleInputChange, handleSubmit } = props
    /* data de los comboboxes */
    const [disable, setDisable] = React.useState({
        departamento: true,
        seccion: true,
        temaTramite: true,
        tipoTramite: true
    })
    const [comboData, setComboData] = React.useState({
        unidad: [],
        departamento: [],
        seccion: [],
        temaTramite: [],
        tipoTramite: []
    })

    /* Retrieve Back API data */
    // React.useEffect(() => {
    //     getUnidades(setComboData)
    //     getDepartamentos(setComboData)
    //     getSecciones(setComboData)
    //     getTemaTramites(setComboData)
    //     getTipoTramites(setComboData)
    // }, [])

    /* logica para encadenar seleccion de
     * Unidad > Departamento > Seccion > TemaTramite > TipoTramite 
     * 
     * (solo funciona en una direccion por el momento.  Sino es un infierno
     *  estar anidando los if-else)
     */
    React.useEffect(() => {
        if (values.unidadID !== "0") {
            setDisable({...disable, departamento: false});
            if (values.departamentoID !== "0") {
                setDisable({...disable, seccion: false});
                if (values.seccionID !== "0") {
                    setDisable({...disable, temaTramite: false})
                    if (values.temaTramiteID !== "0") {
                        setDisable({...disable, tipoTramite: false})
                    }
                }
            }
        }
    }, [values])

    // function chain0(e) {
    //     /* unidad */
    //     handleInputChange(e)
    //     if (values.unidadID === '0')
    //         chain1({ target: { name: 'departamentoID', value: '0'}});
    // }
    // function chain1(e) {
    //     /* departamento */
    //     handleInputChange(e)
    //     if (values.departamentoID === '0')
    //         chain2({ target: { name: 'seccionID', value: '0'}});
    // }
    // function chain2(e) {
    //     /* seccion */
    //     handleInputChange(e)
    //     console.log('chain3')
    // }

    return (
        <Form onSubmit={handleSubmit}>
            {/* seleccion de tema y tipo tramite */}
            <Grid container spacing={8}>
                <Grid item xs={6}>
                    <Controls.Select
                        name="unidadID"
                        label="Unidad"
                        value={values.unidadID}
                        onChange={handleInputChange}
                        options={getUnidades()}
                        error={errors.tipoTramiteID}
                    />
                    <Controls.Select
                        name="departamentoID"
                        label="Departamento"
                        value={values.departamentoID}
                        onChange={handleInputChange}
                        options={getDepartamentos()
                            .filter(x => x.unidad.id === values.unidadID || 
                                         x.id === '0'
                            )
                        }
                        disabled={disable.departamento}
                        error={errors.tipoTramiteID}
                    />
                    <Controls.Select
                        name="seccionID"
                        label="Sección"
                        value={values.seccionID}
                        onChange={handleInputChange}
                        options={getSecciones()
                            .filter(x => 
                                x.departamento.id === values.departamentoID || 
                                x.id === '0'
                            )
                        }
                        disabled={disable.seccion}
                        error={errors.tipoTramiteID}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Select
                        name="temaTramiteID"
                        label="Tema de Trámite"
                        value={values.temaTramiteID}
                        onChange={handleInputChange}
                        options={getTemaTramites()
                            .filter(x => 
                                x.seccion.id === values.seccionID || 
                                x.id === '0'
                            )
                        }
                        disabled={disable.temaTramite}
                        error={errors.tipoTramiteID}
                    />
                    <Controls.Select
                        name="tipoTramiteID"
                        label="Tipo de Trámite"
                        value={values.tipoTramiteID}
                        onChange={handleInputChange}
                        options={getTipoTramites()
                            .filter(x => 
                                x.temaTramite.id === values.temaTramiteID || 
                                x.id === '0'
                            )
                        }
                        disabled={disable.tipoTramite}
                        error={errors.tipoTramiteID}
                    />
                </Grid>
            </Grid>

            {/* asunto + descripcion */}
            <Controls.Input
                name="asunto"
                label="Asunto"
                value={values.asunto}
                onChange={handleInputChange}
                error={errors.asunto}
            />

            <Controls.Input
                name="descripcion"
                label="Descripcion Breve"
                value={values.descripcion}
                onChange={handleInputChange}
                multiline
                minRows={6}
                maxRows={12}
            />

            {/* botones */}
            <Box display="flex" justifyContent="flex-end">
                {/* YA NO VA */}
                {/* <Controls.Button
                    variant="disabled"
                    text="Cancelar"
                    onClick={regresa}
                    endIcon={<CancelOutlinedIcon />}
                /> */}
                <Controls.Button
                    text="Enviar"
                    type="submit"
                    endIcon={<SendOutlinedIcon />}
                />
            </Box>
        </Form>
    )
}


export default function NuevaSolicitudForm(props) {
    const { add } = props

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues);

    /* onSubmit validation */
    function validate() {
        let temp = {...errors}
        temp.tipoTramiteID = values.tipoTramiteID !== '0'
            ? "" 
            : "Este campo es requerido"
        temp.asunto = values.asunto
            ? "" 
            : "Este campo es requerido"

        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x === "")
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (validate()) {
            add(values)
        }
    }

    return (
        <div>
            <DT.Title size="medium" text="Nueva Solicitud" />
            <ActualForm
                values={values}
                setValues={setValues}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                errors={errors}
            />
        </div>
    )
}
