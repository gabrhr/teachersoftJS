import React, { useEffect, useState } from 'react'
import { Grid , Input, Divider, Stack,Typography, Avatar} from '@mui/material';
import { useForm, Form } from '../../../components/useForm';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTheme } from '@mui/material/styles'
import { Controls } from "../../../components/controls/Controls"
/* fake BackEnd */
import * as employeeService from '../../../services/employeeService';
import DepartamentoService from '../../../services/departamentoService.js';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import personaService from '../../../services/personaService';

const tipos_docente = [
    {
        "id": 0,
        "nombre": "No asignado",
    },
    {
        "id": 1,
        "nombre": "TC - Tiempo Completo",
    },
    {
        "id": 2,
        "nombre": "TPC - Tiempo Parcial Convencional",
    },
    {
        "id": 3,
        "nombre": "TPA - Tiempo Parcial por Asignaturas",
    }
]

export default function EditarDocente(props) {
    const {recordForEdit, setOpenPopup} = props
    const [newNombre, setNombre] = useState(recordForEdit.nombres);
    const [newApellidos, setApellidos] = useState(recordForEdit.apellidos);
    const [newCodigo, setCodigo] = useState(recordForEdit.codigo);
    const [newEspecialidad, setEspecialidad] = useState(recordForEdit.especialidad);
    const [newTipoDoc, setTipoDoc] = useState(recordForEdit.tipo_docente);
    const [newTelefono, setTelefono] = useState(recordForEdit.telefono);
    const [newCorreo, setCorreo] = useState(recordForEdit.correo);
    const [newDocumento, setDocumento] = useState(recordForEdit.dni);
    const [newURL, setURL] = useState(recordForEdit.url_foto);

    const theme = useTheme();
    const ColumnGridItemStyle = {
        padding: theme.spacing(2),
        align:"left",

    }
    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('nombre' in fieldValues)
            temp.nombre = fieldValues.nombre ? "" : "Este campo es requerido."
        if ('correo' in fieldValues)
            //temp.correo = (/^$|[A-Za-z_]+@[A-Za-z_]+\.[A-Za-z_\.]+$/)
            temp.correo = (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                    .test(fieldValues.correo) ? ""
                    : "Este correo no es válido"
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x === "")
        // Ref:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
    } = useForm(recordForEdit, true, validate);

    const handleSubmit = async e => {
        /* e is a "default parameter" */
        e.preventDefault();
        console.log(recordForEdit.id)
        if (validate()){
          const editDoc = {
            "id": recordForEdit.id,
            "foto_URL": newURL ? newURL : 'static/images/avatar/1.jpg',
            "nombres": newNombre,
            "apellidos": newApellidos,
            "tipo_persona": 1,
            "tipo_docente": newTipoDoc,
            "seccion": {
                "id": recordForEdit.id_seccion,
                "nombre": newEspecialidad,
            },
            "departamento": {
                "id": recordForEdit.id_departamento,
                "unidad": {
                    "id": recordForEdit.id_departamento,
                }
            },
            "correo_pucp": newCorreo,
            "telefono": newTelefono,
            "codigo_pucp": newCodigo,
            "numero_documento": newDocumento,
            "tipo_documento": 0
          }
          console.log(editDoc);
          const rpta = await personaService.updatePersona(editDoc);
          console.log(rpta);
          setOpenPopup(false)
        }
//        if (validate())
//            addOrEdit(values,resetForm)
    }

    useEffect(() => {
      //Llenar Departamentos??
        if (recordForEdit != null) {
            /* object is not empty */
            setValues({
                ...recordForEdit
            })
        }
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container spacing = {2}>
                <Grid item sx={6} md = {6} style={ColumnGridItemStyle}>
                    < Typography variant="h4" mb={2} >
                           DATOS GENERALES
                    </Typography>
                        <Controls.Input
                            name="nombre"
                            label="Nombres"
                            defaultValue={recordForEdit.nombres}
                            onChange = {(e)=>{
                                setNombre(e.target.value)
                            }}
                        />
                        <Controls.Input
                            name="apellido"
                            label="Apellidos"
                            defaultValue={recordForEdit.apellidos}
                            onChange = {(e)=>{
                                setApellidos(e.target.value)
                            }}
                        />
                        <Controls.Input
                            name="codigo"
                            label="Codigo PUCP"
                            defaultValue={recordForEdit.codigo}
                            onChange = {(e)=>{
                                setCodigo(e.target.value)
                            }}
                        />
                        <Controls.Input
                            name="especialidad"
                            label="Especialidad"
                            defaultValue={recordForEdit.especialidad}
                            onChange = {(e)=>{
                                setEspecialidad(e.target.value)
                            }}
                        />
                        <Controls.Select
                            name="tipo_doc"
                            label="Tipo Docente"
                            defaultValue={recordForEdit.tipo_docente}
                            onChange = {(e)=>{
                                setTipoDoc(e.target.value)
                            }}
                            options = {tipos_docente}
                        />
                </Grid>
                <Grid item sx={6} md = {6} style={ColumnGridItemStyle}>
                        < Typography variant="h4" mb={2} >
                            &nbsp;
                        </Typography>
                        <Controls.Input
                            name="telefono"
                            label="Telefono"
                            defaultValue={recordForEdit.telefono}
                            onChange = {(e)=>{
                                setTelefono(e.target.value)
                            }}
                        />
                        <Controls.Input
                            name="correo"
                            label="Correo Electrónico"
                            defaultValue={recordForEdit.correo}
                            onChange = {(e)=>{
                                setCorreo(e.target.value)
                            }}
                        />
                        <Controls.Input
                            name="documento"
                            label="Documento de Identidad"
                            defaultValue={recordForEdit.dni}
                            onChange = {(e)=>{
                                setDocumento(e.target.value)
                            }}
                        />
                        <Controls.Input
                            name="url_foto"
                            label="URL Foto"
                            defaultValue={recordForEdit.url_foto}
                            onChange = {(e)=>{
                                setURL(e.target.value)
                            }}
                        />
                </Grid>
            </Grid>
            <Grid cointainer align="right" mt={5}>
                <div>
                    <Controls.Button
                        // disabled={true}
                        variant="disabled"
                        text="Cancelar"
                        onClick={()=> setOpenPopup(false)}
                        />
                    <Controls.Button
                        // variant="contained"
                        // color="primary"
                        // size="large"
                        text="Guardar Cambios"
                        type="submit"
                        />

                </div>
            </Grid>
        </Form>
    );
}
