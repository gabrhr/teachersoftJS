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
    const {recordForEdit, setOpenPopup, records, setRecords, transformarDocentes, editIndex, setEditIndex, tipo} = props
    
    const [newNombre, setNombre] = useState(recordForEdit.nombres);
    const [errorNombre, setErrorNombre] = useState(false);
    
    const [newApellidos, setApellidos] = useState(recordForEdit.apellidos);
    const [errorApellidos, setErrorApellidos] = useState(false);
    
    const [newCodigo, setCodigo] = useState(recordForEdit.codigo);
    const [errorCodigo, setErrorCodigo] = useState(false);
        
    const [newTipoDoc, setTipoDoc] = useState(recordForEdit.tipo_docente);
    const [errorTipoDoc, setErrorTipoDoc] = useState(false);
    
    const [newTelefono, setTelefono] = useState(recordForEdit.telefono);
    const [errorTelefono, setErrorTelefono] = useState(false);
    
    const [newCorreo, setCorreo] = useState(recordForEdit.correo);
    const [errorCorreo, setErrorCorreo] = useState(false);
    
    const [newDocumento, setDocumento] = useState(recordForEdit.dni);
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
        if(!isNumeric(newCodigo) || newCodigo.length !== 8){
            setErrorCodigo(true)
            errores++;
        }
        if(!isNumeric(newTelefono) || newTelefono.length !== 9){
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
        if(!isNumeric(newDocumento) || newDocumento.length !== 8){
            setErrorDocumento(true)
            errores++;
        }
        if(newTipoDoc  === 0){
            setErrorTipoDoc(true)
            errores++;
        }
        if(errores){
            return false
        }else{
            return true
        }
    }

    const handleSubmit = async e => {
        /* e is a "default parameter" */
        e.preventDefault();
        if (validate()){
          const editDoc = {
            "id": recordForEdit.id,
            "foto_URL": recordForEdit.url_foto,
            "nombres": newNombre,
            "apellidos": newApellidos,
            "tipo_persona": 1,
            "tipo_docente": newTipoDoc,
            "seccion": {
                "id": recordForEdit.id_seccion,
            },
            "departamento": {
                "id": recordForEdit.id_departamento,
            },
            "correo_pucp": newCorreo,
            "telefono": newTelefono,
            "codigo_pucp": newCodigo,
            "numero_documento": newDocumento,
            "tipo_documento": 0,
            "deuda_docente": recordForEdit.deuda_docente,
            "cargaDocente": recordForEdit.cargaDocente,
            "tipo_bono": recordForEdit.tipo_bono,
            "fecha_ultimo_bono": recordForEdit.fecha_ultimo_bono,
          }
          console.log(editDoc);
          const rpta = await personaService.updatePersona(editDoc);
          console.log(rpta);
          if(rpta){
            const rptaArr = [rpta];
            //Hacemos la insercion
            const newDoc = transformarDocentes(rptaArr);
            if(newDoc[0].tipo_docente === tipo){
              const newRecords = records;
              newRecords[editIndex] =  newDoc[0];
              setRecords(newRecords);
              setEditIndex(); 
            } else{
              if(tipo !== -1){
                const newRecords = records;
                newRecords.splice(editIndex,1);
                setRecords(newRecords);
                setEditIndex(); 
              }
              else{ //Entonces es un listado de todos - nunca aparecerá
                const newRecords = records;
                newRecords[editIndex] =  newDoc[0];
                setRecords(newRecords);
                setEditIndex(); 
              }
            }
            setOpenPopup(false)
          }
        }
//        if (validate())
//            addOrEdit(values,resetForm)
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
                            defaultValue={recordForEdit.nombres}
                            onChange = {(e)=>{
                                setNombre(e.target.value)
                            }}
                            error = {errorNombre}
                            helperText = {errorNombre && "Este campo está vacío"}
                        />
                        <Controls.Input
                            name="apellido"
                            label="Apellidos"
                            defaultValue={recordForEdit.apellidos}
                            onChange = {(e)=>{
                                setApellidos(e.target.value)
                            }}
                            error = {errorApellidos}
                            helperText = {errorApellidos && "Este campo está vacío"}
                        />
                        <Controls.Input
                            name="codigo"
                            label="Codigo PUCP"
                            defaultValue={recordForEdit.codigo}
                            onChange = {(e)=>{
                                setCodigo(e.target.value)
                            }}
                            error = {errorCodigo}
                            helperText = {errorCodigo && "Este campo es incorrecto"}
                        />
                        <Controls.Select
                            name="tipo_doc"
                            label="Tipo Docente"
                            defaultValue={recordForEdit.tipo_docente}
                            onChange = {(e)=>{
                                setTipoDoc(e.target.value)
                            }}
                            error = {errorTipoDoc}
                            helperText = {errorTipoDoc && "Debe seleccionar un tipo de docente"}
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
                            error = {errorTelefono}
                            helperText = {errorTelefono && "Este campo es incorrecto"}
                        />
                        <Controls.Input
                            name="correo"
                            label="Correo Electrónico"
                            defaultValue={recordForEdit.correo}
                            onChange = {(e)=>{
                                setCorreo(e.target.value)
                            }}
                            error = {errorCorreo}
                            helperText = {errorCorreo && "Este campo es incorrecto"}
                        />
                        <Controls.Input
                            name="documento"
                            label="Documento de Identidad"
                            defaultValue={recordForEdit.dni}
                            onChange = {(e)=>{
                                setDocumento(e.target.value)
                            }}
                            error = {errorDocumento}
                            helperText = {errorDocumento && "Este campo es incorrecto"}
                        />
                        {/* <Controls.Input
                            name="url_foto"
                            label="URL Foto"
                            defaultValue={recordForEdit.url_foto}
                            onChange = {(e)=>{
                                setURL(e.target.value)
                            }}
                        /> */}
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
