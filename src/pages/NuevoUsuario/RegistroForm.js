/* Author: Team MP
 *
 * Llena con datos personales para luego poder enviar solis a MP.
 * 
 * CAPTCHA (rtokumori@pucp.edu.pe)
 * Site key: 6LcKzlQdAAAAAKE-sgUaSteogICfr93SMR0wdhOa
 * Secret key: 6LcKzlQdAAAAAKiqFD2-koK6mb0jFMtNPBcvbmum
 */

import React from 'react'
import { IconButton, Typography, Box, Alert, Grid, 
    FormHelperText } from '@mui/material';
import { useForm, Form } from '../../components/useForm';
import { Controls } from '../../components/controls/Controls';
import { UserContext } from '../../constants/UserContext';
import { DT } from '../../components/DreamTeam/DT'
import ReCAPTCHA from 'react-google-recaptcha';
/* fake BackEnd */
import * as employeeService from '../../services/employeeService';
import * as DTLocalServices from '../../services/DTLocalServices'
/* ICONS */
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';

const radioGroupValues = [
    { id: 0, title: 'Masculino' },
    { id: 1, title: 'Femenino' }
]

function getPaises() {
    return [
        { id: 'Seleccionar', title: 'Seleccionar' },
        { id: 'Perú', title: 'Perú' },
        { id: 'Extranjero', title: 'Extranjero' },
    ]
}

const initialFieldValues = {
    id: 0,
    correo: '',
    primer_apellido: '',
    segundo_apellido: '',
    nombres: '',
    fecha_nacimiento: new Date(),
    pais_nacionalidad: 'Seleccionar',
    sexo: 0,
    dni: '',
    aceptaTyC: false,

    /* extra */
    captcha: false      /* true iff has passed CAPTCHA */
}

function printValues(values) {
    let s = "values:\n"
    for (let key in values) {
        s += `- ${key}: ${values[key]}\n`
    }
    s += "\n"
    return s
}

export default function RegistroForm() {
    const { user, rol } = React.useContext(UserContext);
    const captcha = React.useRef(null);   /* referencia al Componente */
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues);

    React.useEffect(() => {
        setValues({
            ...values,
            correo: user.persona.correo_pucp,
            /* TODO: split apellidos */
            primer_apellido: user.persona.apellidos,
            // segundo_apellido: user.persona.nombres,
            nombres: user.persona.nombres
        })
    }, [user])

    function handleChangeCaptcha() {
        /* success */
        if (captcha.current.getValue()) {   // (returns a token)
            setValues({
                ...values,
                captcha: true
            })
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (validate())
            window.alert('submitted');
    }

    /* onSubmit validation */
    function validate() {
        let temp = {...errors}
        let defaultError = "Este campo es requerido"
        if (values.primer_apellido.length !== 0)
            temp.primer_apellido = DTLocalServices.validateName(values.primer_apellido)
        else
            temp.primer_apellido = defaultError
        if (values.nombres.length !== 0)
            temp.nombres = DTLocalServices.validateName(values.nombres)
        else 
            temp.nombres = defaultError
        temp.dni = DTLocalServices.validateDni(values.dni)
        temp.aceptaTyC = values.aceptaTyC === true ? "" : defaultError
        temp.pais_nacionalidad = values.pais_nacionalidad !== "Seleccionar" ? "" 
            : defaultError
        temp.captcha = values.captcha === true ? "" : defaultError

        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x === "")
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Box height="250px" overflow="auto" display="none">
                <Typography sx={{
                    fontFamily: "monospace",
                    whiteSpace: "pre"
                }}>
                    {printValues(values)}
                </Typography>
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Controls.Input
                        name="correo"
                        label="Correo electrónico"
                        value={values.correo}
                        onChange={handleInputChange}
                        disabled
                    />
                    <Controls.Input
                        name="primer_apellido"
                        label="Primer apellido"
                        value={values.primer_apellido}
                        onChange={handleInputChange}
                        error={errors.primer_apellido}
                    />
                    <Controls.Input
                        name="segundo_apellido"
                        label="Segundo apellido"
                        value={values.segundo_apellido}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="nombres"
                        label="Nombres"
                        value={values.nombres}
                        onChange={handleInputChange}
                        error={errors.nombres}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="dni"
                        label="DNI"
                        value={values.dni}
                        onChange={handleInputChange}
                        error={errors.dni}
                    />
                    <Controls.DatePicker
                        name="fecha_nacimiento"
                        label="Fecha de nacimiento"
                        value={values.fecha_nacimiento}
                        onChange={handleInputChange}
                        disableFuture
                        openTo="year"
                        views={['year', 'month', 'day']}
                    />
                    <Controls.RadioGroup
                        name="sexo"
                        label="Sexo"
                        value={values.sexo}
                        onChange={handleInputChange}
                        items={radioGroupValues}
                    />
                    <Controls.Select
                        name="pais_nacionalidad"
                        label="País de nacionalidad"
                        value={values.pais_nacionalidad}
                        onChange={handleInputChange}
                        options={getPaises()}
                        error={errors.pais_nacionalidad}
                    />
                </Grid>
            </Grid>

            <Alert sx={{ mt: 2 }} variant="outlined" severity="info">
                Declaro que he leído la{" "}
                <a href="http://example.com">Politica de Privacidad</a> 
                {" "}y que autorizo a la Pontificia Universidad Católica del Perú a
                la realización del tratamiento de mis datos personales conforme
                a los términos y condiciones ahí planteados.
            </Alert>
            <Controls.Checkbox
                name="aceptaTyC"
                label="Acepto los Términos y Condiciones"
                value={values.aceptaTyC}
                onChange={handleInputChange}
                error={errors.aceptaTyC}
            />
            <ReCAPTCHA
                ref={captcha}
                sitekey="6LcKzlQdAAAAAKE-sgUaSteogICfr93SMR0wdhOa"
                onChange={handleChangeCaptcha}
            />
            {errors.captcha && 
                <FormHelperText sx={{color: "red"}}>{errors.captcha}</FormHelperText>
            }
            <Box display="flex" justifyContent="flex-end">
                <Controls.Button
                    text="Enviar"
                    type="submit"
                    endIcon={<SendIcon />}
                />
            </Box>
        </Form>
    )
}