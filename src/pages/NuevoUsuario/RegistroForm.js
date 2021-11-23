/* Author: Team MP
 *
 * Llena con datos personales para luego poder enviar solis a MP.
 * 
 * CAPTCHA (rtokumori@pucp.edu.pe)
 * Site key: 6LcKzlQdAAAAAKE-sgUaSteogICfr93SMR0wdhOa
 * Secret key: 6LcKzlQdAAAAAKiqFD2-koK6mb0jFMtNPBcvbmum
 */

import React from 'react'
import { IconButton, Typography, Box, Alert } from '@mui/material';
import { useForm, Form } from '../../components/useForm';
import { Controls } from '../../components/controls/Controls';
import { UserContext } from '../../constants/UserContext';
import { DT } from '../../components/DreamTeam/DT'
import ReCAPTCHA from 'react-google-recaptcha';
/* fake BackEnd */
import * as employeeService from '../../services/employeeService';
/* ICONS */
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';

const radioGroupValues = [
    {id: 0, title: 'Male'},
    {id: 1, title: 'Female'},
    {id: 2, title: 'Other'}
]

function getPaises() {
    return [
        {id: '0', title: 'Perú'},
        {id: '1', title: 'Extranjero'},
    ]
}

const initialFieldValues = {
    id: 0,
    correo: '',
    primer_apellido: '',
    segundo_apellido: '',
    nombres: '',
    fecha_nacimiento: new Date(),
    pais_nacionalidad: '0',
    sexo: 0,
    dni: '',
    acepta_politica_privacidad: false,
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
    const {user, rol} = React.useContext(UserContext);
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
        console.log('reCaptcha')
    }

    return (
        <Form>
            <Box height="250px" overflow="auto" display="none">
                <Typography sx={{
                    fontFamily: "monospace",
                    whiteSpace: "pre"
                }}>
                    {printValues(values)}
                </Typography>
            </Box>

            <Controls.Input 
                name="correo"
                label="Correo electrónico"
                value={values.correo} 
                onChange = {handleInputChange}
                disabled
            />

            <div>
                <Controls.Input 
                    name="primer_apellido"
                    label="Primer apellido"
                    value={values.primer_apellido} 
                    onChange = {handleInputChange}
                    sx={{maxWidth: "30%"}}
                />
                <Controls.Input 
                    name="segundo_apellido"
                    label="Segundo apellido"
                    value={values.segundo_apellido} 
                    onChange = {handleInputChange}
                    sx={{maxWidth: "30%", mx: 2}}
                />
                <Controls.Input 
                    name="nombres"
                    label="Nombres"
                    value={values.nombres} 
                    onChange = {handleInputChange}
                    sx={{maxWidth: "35%"}}
                />
            </div>

            <div>
                <Controls.DatePicker
                    name="fecha_nacimiento"
                    label="Fecha de nacimiento"
                    value={values.fecha_nacimiento}
                    onChange={handleInputChange}
                    disableFuture
                    openTo="year"
                    views={['year', 'month', 'day']}
                />

                <Controls.Select
                    name="pais_nacionalidad"
                    label="País de nacionalidad"
                    value={values.pais_nacionalidad}
                    onChange={handleInputChange}
                    options={getPaises()}
                />

                <Controls.RadioGroup
                    name="sexo"
                    label="Sexo"
                    value={values.sexo}
                    onChange={handleInputChange}
                    items={radioGroupValues}
                />
            </div>
            <Controls.Input 
                name="dni"
                label="DNI"
                value={values.dni} 
                onChange = {handleInputChange}
                sx={{maxWidth: "30%"}}
                required
            />

            <Alert sx={{ mt: 1 }} variant="outlined" severity="info">
                Declaro que he leído la Politica de Privacidad y que autorizo a
                la Pontificia Universidad Católica del Perú a la realización del
                tratamiento de mis datos personales conforme a los términos y
                condiciones ahí planteados.
            </Alert>
            <Controls.Checkbox
                name="acepta_politica_privacidad"
                label="Acepto"
                value={values.acepta_politica_privacidad}
                onChange={handleInputChange}
            />

            <ReCAPTCHA
                sitekey="6LcKzlQdAAAAAKE-sgUaSteogICfr93SMR0wdhOa"
                onChange={handleChangeCaptcha}
            />

            <Box sx={{ display: "flex", width: "100%", alignItems: "center"}}>
                <Controls.Button
                    text="Enviar"
                    // type="submit"
                    endIcon={<SendIcon />}
                />
            </Box>
        </Form>
    )
}