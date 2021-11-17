import React from 'react'
import { Controls } from '../../components/controls/Controls';
import { Form, useForm } from '../../components/useForm';

const initialFieldValues = {
    destinatarioID:4
}

function getDestinatarios() {
    return ([
        { id: 4, title: 'Seleccionar', icon: <div style={{ mr: 2 }} /> },
        { id: 0, title: 'Jefe de Departamento'},
        { id: 1, title: 'Coordinadores de Sección'},
        { id: 2, title: 'Docentes'},
    ])
}

export default function DelegarForm() {
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues);

    function validate() {
        let temp = {...errors}
        let defaultError = "Este campo es requerido"
        temp.destinatarioID = values.destinatarioID !== 4 ? "" : defaultError
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x === "")
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (validate()) {
            
        }
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Controls.Select
                name="destinatarioID"
                label="Tipo de Destinatario"
                value={values.destinatarioID}
                onChange={handleInputChange}
                options={getDestinatarios()}
                error={errors.destinatarioID}
            />
            
        </Form>
    )
}
