/* Author: Mitsuo
 *
 * Invocado desde MisSolicitudes.js.  Añade una solicitud a la BD.
 */
import React from 'react'
import { DT } from '../../components/DreamTeam/DT'
import { IconButton, Typography, Box } from '@mui/material';
import { useForm, Form } from '../../components/useForm';
import { Controls } from '../../components/controls/Controls';

import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

/* BACK FAKE */
export const getDepartamentos = () => ([
    { id: '1', title: 'Facultad Ciencias E Ingenieria' },
    { id: '2', title: 'Sociales' },
    { id: '3', title: 'Facultad de Artes y Ciencias Escenicas' },
])

export const getTemaTramites = () => ([
    { id: '1', title: 'Personal Administrativo' },
    { id: '2', title: 'Personal Docente' },
    { id: '3', title: 'no se que mas poner' },
])

export const getTipoTramites = () => ([
    { id: '1', title: 'Descanso medico' },
    { id: '2', title: 'Descarga' },
    { id: '3', title: 'algun otro tramite' },
])

/* -----end of BACK FAKE----- */

const initialFieldValues = {
    id: 0,
    departamentoID: '0',
    temaTramiteID: '0',
    tipoTramiteID: '0',
    asunto: '',
    descripcion: '',
    archivos: [],
    date: new Date(),
}

function printValues(values) {
    let s = "values:\n"
    for (let key in values) {
        s += `- ${key}: ${values[key]}\n`
    }
    s += "\n"
    return s
}

function ActualForm(props) {
    const { values, handleInputChange, resetForm } = props

    return (
        <Form>
            <Box height="250px" overflow="auto" display="inherit">
                <Typography sx={{
                    fontFamily: "monospace",
                    whiteSpace: "pre"
                }}>
                    {printValues(values)}
                </Typography>
            </Box>

            <Controls.Select
                name="departamentoID"
                label="Departamento"
                value={values.departamentoID}
                onChange={handleInputChange}
                options={getDepartamentos()}
            />

            <Controls.Select
                name="temaTramiteID"
                label="Tema de Trámite"
                value={values.temaTramiteID}
                onChange={handleInputChange}
                options={getTemaTramites()}
            />

            <Controls.Select
                name="tipoTramiteID"
                label="Departamento"
                value={values.tipoTramiteID}
                onChange={handleInputChange}
                options={getTipoTramites()}
            />
            
            <Controls.Input 
                name="asunto"
                label="Asunto"  
                value={values.asunto} 
                onChange = {handleInputChange}
            />

            <Controls.Input 
                name="descripcion"
                label="Descripcion Breve"  
                value={values.descripcion} 
                onChange = {handleInputChange}
                multiline
                minRows={6}
                maxRows={12}
            />

            <Box display="flex" justifyContent="flex-end"> 
                <Controls.Button
                    variant="disabled"
                    text="Cancelar"
                    onClick={resetForm}
                    endIcon={<CancelOutlinedIcon />}
                />
                <Controls.Button
                    text="Enviar"
                    type="submit"
                    endIcon={<SendOutlinedIcon />}
                />
            </Box>
        </Form>
    )
}

export default function NuevaSolicitudForm() {
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues);

    return (
        <div>
            <DT.Title text="Mesa de partes" />
            <DT.BorderBox>
                <DT.Title small text="Nueva Solicitud" />
                <ActualForm 
                    values={values} 
                    handleInputChange={handleInputChange}
                    resetForm={resetForm}
                />
            </DT.BorderBox>
        </div>
    )
}
