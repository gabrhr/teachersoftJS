/* Author: Mitsuo
 *
 * Invocado desde MisSolicitudes.js.  Añade una solicitud a la BD.
 */
import React from 'react'
import { DT } from '../../components/DreamTeam/DT'
import { Grid, IconButton, Typography, Box } from '@mui/material';
import { useForm, Form } from '../../components/useForm';
import { Controls } from '../../components/controls/Controls';
// import CargaArchivos from './CargaArchivos';
//import FileUpload1 from '../../components/MesaPartes/FileUpload1'
import DragDropArchivos from './DragDropArchivos';

// services 
import * as MesaPartesService from '../../services/mesaPartesService';
import * as UnidadService from '../../services/unidadService';
import DepartamentoService from '../../services/departamentoService'
import SeccionService from '../../services/seccionService'

// icons
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const initialFieldValues = {
    /* SOLICITUD */
    id: 0,
    asunto: '',
    descripcion: '',
    //solicitador
    archivos: [],        // se va a completar en DragDropArchivos
    //delegado

    tracking: {
        fecha_enviado: new Date(),
    },

    estado: 0,          // (del tracking) enviado
    resultado: 0,

    tipoTramiteID: '0',

    /* EXTRA (solo se utilizan en este componente) */
    unidadID: 0,
    departamentoID: 0,
    seccionID: 0,
    temaTramiteID: 0,
    /* extra extra (no se usan aqui pero se listan para mantener un orden) */
    solicitadorID: null,
    delegadoID: null
}

function ActualForm(props) {
    const { values, setValues, errors,
        handleInputChange, handleSubmit,
        comboData } = props
    /* data de los comboboxes */
    const [disable, setDisable] = React.useState({
        departamentoID: true,
        seccionID: true,
        temaTramiteID: true,
        tipoTramiteID: true
    })

    /* Cadenita de combobox
     * Unidad > Departamento > Seccion > TemaTramite > TipoTramite 
     */
    function check(id, nextid) {
        if (values[id] === 0) {
            setDisable({...disable, [nextid]: true});
        }
        else {
            setDisable({...disable, [nextid]: false});
        }
        setValues({...values, [nextid]: 0})
    }
    React.useEffect(() => check('unidadID', 'departamentoID'), [values.unidadID])
    React.useEffect(() => check('departamentoID', 'seccionID'), [values.departamentoID])
    React.useEffect(() => check('seccionID', 'temaTramiteID'), [values.seccionID])
    React.useEffect(() => check('temaTramiteID', 'tipoTramiteID'), [values.temaTramiteID])

    // React.useEffect(() => {
    //     console.log("NuevaSoli:", comboData)
    // }, [comboData])

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
                        options={[{ id: 0, nombre: "Seleccionar"}]
                            .concat(comboData.unidad)
                        }
                        error={errors.unidadID}
                    />
                    <Controls.Select
                        name="departamentoID"
                        label="Departamento"
                        value={values.departamentoID}
                        onChange={handleInputChange}
                        options={[{ id: 0, unidad: { id: 0 }, nombre: "Seleccionar"}]
                            .concat(comboData.departamento)
                            .filter(x => x.unidad.id === values.unidadID || 
                                         x.id === 0
                            )
                        }
                        disabled={disable.departamentoID}
                        error={errors.departamentoID}
                    />
                    <Controls.Select
                        name="seccionID"
                        label="Sección"
                        value={values.seccionID}
                        onChange={handleInputChange}
                        options={[{ id: 0, departamento: { id: 0 }, nombre: "Seleccionar"}]
                            .concat(comboData.seccion)
                            .filter(x => x.departamento.id === values.departamentoID || 
                                         x.id === 0
                            )
                        }
                        disabled={disable.seccionID}
                        error={errors.seccionID}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Select
                        name="temaTramiteID"
                        label="Tema de Trámite"
                        value={values.temaTramiteID}
                        onChange={handleInputChange}
                        /* ojo que este ya no es seccion.id sino seccionID */
                        options={[{ id: 0, seccionID: 0, nombre: "Seleccionar"}]
                            .concat(comboData.temaTramite)
                            .filter(x => x.seccionID === values.seccionID || 
                                         x.id === 0
                            )
                        }
                        disabled={disable.temaTramiteID}
                        error={errors.temaTramiteID}
                    />
                    <Controls.Select
                        name="tipoTramiteID"
                        label="Tipo de Trámite"
                        value={values.tipoTramiteID}
                        onChange={handleInputChange}
                        options={[{ id: 0, temaTramiteID: 0, nombre: "Seleccionar"}]
                            .concat(comboData.tipoTramite)
                            .filter(x => x.temaTramiteID === values.temaTramiteID || 
                                         x.id === 0
                            )
                        }
                        disabled={disable.tipoTramiteID}
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
                maxRows={6}
            />
            {/* ARCHIVOS */}
            <DragDropArchivos values={values} setValues={setValues} />

            {/* botones */}
            <Box display="flex" justifyContent="flex-end">
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
    const { add, comboData } = props

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
        let defaultError = "Este campo es requerido"
        temp.unidadID = values.unidadID !== 0 ? "" : defaultError
        temp.departamentoID = values.departamentoID !== 0 ? "" : defaultError
        temp.seccionID = values.seccionID !== 0 ? "" : defaultError
        temp.temaTramiteID = values.temaTramiteID !== 0 ? "" : defaultError
        temp.tipoTramiteID = values.tipoTramiteID !== 0 ? "" : defaultError

        temp.asunto = values.asunto ? "" : defaultError
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x === "")
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (validate()) {
            add(values, resetForm)
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
                comboData={comboData}
            />
        </div>
    )
}
