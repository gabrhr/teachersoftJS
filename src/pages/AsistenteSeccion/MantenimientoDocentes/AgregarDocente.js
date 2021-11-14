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

const initialFieldValues = {
    id: 0,
    nombre: '',
    apellido: '',
    codigo: '',
    especialidad: '',
    telefono: '',
    correo: '',
    dni: '',
    creditos: 0,
}

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
    const {setOpenPopup} = props

    const [newNombre, setNombre] = useState('');
    const [errorNombre, setErrorNombre] = useState(false);
    
    const [newApellidos, setApellidos] = useState('');
    const [errorApellidos, setErrorApellidos] = useState(false);
    
    const [newCodigo, setCodigo] = useState('');
    const [errorCodigo, setErrorCodigo] = useState(false);
    
    const [newEspecialidad, setEspecialidad] = useState('');
    const [errorEspecialidad, setErrorEspecialidad] = useState(false);
    
    const [newTipoDoc, setTipoDoc] = useState(0);
    
    const [newTelefono, setTelefono] = useState('');
    const [errorTelefono, setErrorTelefono] = useState(false);
    
    const [newCorreo, setCorreo] = useState('');
    const [errorCorreo, setErrorCorreo] = useState(false);
    
    const [newDocumento, setDocumento] = useState('');
    const [errorDocumento, setErrorDocumento] = useState(false);
    
    const [newURL, setURL] = useState('');

    const theme = useTheme();
    const ColumnGridItemStyle = {
        padding: theme.spacing(2),
        align:"left",

    }

    function isNumeric(num){
        return !isNaN(num)
    } 

    const validate = () => {
        let errores = 0;
        if(newNombre === ""){
            setErrorNombre(true);
            errores++;
        }
        if(newApellidos === ""){
            setErrorApellidos(true)
            errores++;
        }
        if(!isNumeric(newCodigo) || newCodigo.length != 8){
            setErrorCodigo(true)
            errores++;
        }
        if(newEspecialidad === ""){
            setErrorEspecialidad(true)
            errores++;
        }
        if(!isNumeric(newTelefono) || newTelefono.length != 9){
            setErrorTelefono(true)
            errores++;
        }
        //temp.correo = (/^$|[A-Za-z_]+@[A-Za-z_]+\.[A-Za-z_\.]+$/)
        (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                .test(newCorreo) ? setErrorCorreo(false)
                : setErrorCorreo(true)
        if(errorCorreo){
            errores++;
        }
        if(!isNumeric(newDocumento) || newDocumento.length != 8){
            setErrorDocumento(true)
            errores++;
        }
        if(errores){
            return false
        }else{
            return true
        }
    }

    /*const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
    } = useForm(initialFieldValues, true, validate);*/

    const handleSubmit = async e => {
        /* e is a "default parameter" */
        e.preventDefault();
        if (validate()){
          const newDoc = {
            "foto_URL": newURL ? newURL : 'static/images/avatar/1.jpg',
            "nombres": newNombre,
            "apellidos": newApellidos,
            "tipo_persona": 1,
            "tipo_docente": newTipoDoc,
            "seccion": {
                "id": 3,
                "nombre": newEspecialidad,
            },
            "departamento": {
                "id": 3,
                "unidad": {
                    "id": 1,
                }
            },
            "correo_pucp": newCorreo,
            "telefono": newTelefono,
            "codigo_pucp": newCodigo,
            "numero_documento": newDocumento,
            "tipo_documento": 0
          }
          console.log(newDoc);
          const rpta = await personaService.registerPersona(newDoc);
          console.log(rpta);
          setOpenPopup(false)
        }
    }

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
                            defaultValue= ""
                            onChange = {(e)=>{
                                setNombre(e.target.value)
                            }}
                            error = {errorNombre}
                            helperText = {errorNombre && "Este campo está vacío"}
                        />
                        <Controls.Input
                            name="apellido"
                            label="Apellidos"
                            defaultValue=""
                            onChange = {(e)=>{
                                setApellidos(e.target.value)
                            }}
                            error = {errorApellidos}
                            helperText = {errorApellidos && "Este campo está vacío"}
                        />
                        <Controls.Input
                            name="codigo"
                            label="Codigo PUCP"
                            defaultValue=""
                            onChange = {(e)=>{
                                setCodigo(e.target.value)
                            }}
                            error = {errorCodigo}
                            helperText = {errorCodigo && "Este campo es incorrecto"}
                        />
                        <Controls.Input
                            name="especialidad"
                            label="Especialidad"
                            defaultValue=""
                            onChange = {(e)=>{
                                setEspecialidad(e.target.value)
                            }}
                            error = {errorEspecialidad}
                            helperText = {errorEspecialidad && "Este campo está vacío"}
                        />
                        <Controls.Select
                            name="tipo_doc"
                            label="Tipo Docente"
                            defaultValue={0}
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
                            defaultValue=""
                            onChange = {(e)=>{
                                setTelefono(e.target.value)
                            }}
                            error = {errorTelefono}
                            helperText = {errorTelefono && "Este campo es incorrecto"}
                        />
                        <Controls.Input
                            name="correo"
                            label="Correo Electrónico"
                            defaultValue=""
                            onChange = {(e)=>{
                                setCorreo(e.target.value)
                            }}
                            error = {errorCorreo}
                            helperText = {errorCorreo && "Este campo es incorrecto"}
                        />
                        <Controls.Input
                            name="documento"
                            label="Documento de Identidad"
                            defaultValue=""
                            onChange = {(e)=>{
                                setDocumento(e.target.value)
                            }}
                            error = {errorDocumento}
                            helperText = {errorDocumento && "Este campo es incorrecto"}
                        />
                        <Controls.Input
                            name="url_foto"
                            label="URL Foto"
                            defaultValue=""
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