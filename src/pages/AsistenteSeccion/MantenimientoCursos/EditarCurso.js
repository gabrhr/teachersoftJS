import React, { useEffect, useState } from 'react'
import { Grid , Input, Divider, Stack,Typography, Avatar} from '@mui/material';
import { useForm, Form } from '../../../components/useForm';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTheme } from '@mui/material/styles'
import { Controls } from "../../../components/controls/Controls"
/* fake BackEnd */
import DepartamentoService from '../../../services/departamentoService.js';
import UnidadService from '../../../services/unidadService.js';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';


const initialFieldValues = {
    id: 0,
    nombre: '',
    codigo: '',
    creditos: 0,
    idFacultad: 0,
}

const fillFacultades = async () =>{
  const dataUn = await UnidadService.getUnidades();
  const unidades = []

  //if(dataDep) setDepartamentos(dataDep);
  dataUn.map(dep => (
    unidades.push({
      id: dep.id.toString(),
      nombre: dep.nombre,
    })
  ));

  //console.log(departamentos);
  return unidades;
}


export default function EditarCurso ({setOpenEditPopup, editarCurso, item}) {

    const [facultades, setFacultades] = useState([]);


    const handleInputChangeNumber = async (e) => {
        const pattern = /^[0-9]*$/;   
        console.log(e.target.value)
        //let inputChar = String.fromCharCode(event.charCode)
        if (!pattern.test(e.target.value)) {
          e.target.value = await e.target.value.replace(/[^0-9]/g, "");
          // invalid character, prevent input
        }
        handleInputChange(e)
    }

    const theme = useTheme();
    const ColumnGridItemStyle = {
        padding: theme.spacing(2),
        align:"left",

    }

    React.useEffect(() => {
      fillFacultades()
      .then (newFac =>{
        setFacultades(newFac);
      });

    }, [])

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if('idUnidad' in fieldValues)
          temp.idUnidad = parseInt(values.idUnidad) !== 0 ? "" : "Este campo es requerido";
        if ('nombre' in fieldValues)
            temp.nombre = fieldValues.nombre ? "" : "Este campo es requerido."
        if ('codigo' in fieldValues)
            temp.codigo = fieldValues.codigo ? "" : "Este campo es requerido."
        if ('creditos' in fieldValues)
            temp.creditos = fieldValues.creditos ? "" : "Este campo es requerido."
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
        resetForm
    } = useForm(item ? item : initialFieldValues, true, validate);


    const handleSubmit = e => {
      e.preventDefault();
      if (validate()){
        const seccion = JSON.parse(window.localStorage.getItem("user"));
        //console.log(seccion);
        const curso = {
          "id": item.id,
          "codigo": values.codigo,
          "nombre": values.nombre,
          "creditos": parseFloat(values.creditos),
          "seccion": seccion.persona.seccion,
          "unidad": {
              "id": values.unidad ? values.idUnidad : values.idFacultad
          }

        }
        console.log(curso)
        editarCurso(curso);
     }
    }
    console.log(values) 
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container rowSpacing = {0}>
                <Grid item xs = {12} >   
                    < Typography variant="h4" mb={2} >
                           DATOS DEL CURSO
                    </Typography>  
                  <Controls.Select
                  name={values.unidad ? "idUnidad" : "idFacultad"}
                  label="Facultad"
                  value={values.unidad ? values.idUnidad : values.idFacultad}
                  onChange={handleInputChange}
                  options={facultades}
                  options={[{ id: 0, nombre: "Seleccionar" }]
                    .concat(facultades)
                  }
                  error={values.unidad ? errors.idUnidad : errors.idFacultad}
                  />
                    <Grid item xs = {5}>        
                        <Controls.Input
                            name="codigo"
                            label="Clave"
                            value={values.codigo}
                            onChange = {handleInputChange}
                            error={errors.codigo}
                        />  
                    </Grid>
                        <Controls.Input
                            name="nombre"
                            label="Nombre"
                            value={values.nombre}
                            onChange = {handleInputChange}
                            error={errors.nombre}
                        /> 
                </Grid>
                <Grid item xs = {5}>  
                        <Controls.NumberPicker
                            name="creditos"
                            label="Créditos"
                            value={values.creditos}
                            type="number"
                            onChange = {handleInputChange}
                            error={errors.creditos}
                        />
                </Grid>
            </Grid>
            <Grid cointainer align="right" mt={5}>
                <div>
                    <Controls.Button
                        // disabled={true}
                        variant="disabled"
                        text="Cancelar"
                        onClick={()=> setOpenEditPopup(false)}
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
