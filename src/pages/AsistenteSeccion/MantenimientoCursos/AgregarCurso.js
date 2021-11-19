import React, { useEffect, useState } from 'react'
import { Grid , Input, Divider, Stack,Typography, Avatar} from '@mui/material';
import { useForm, Form } from '../../../components/useForm';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTheme } from '@mui/material/styles'
import { Controls} from "../../../components/controls/Controls"
/* fake BackEnd */
import DepartamentoService from '../../../services/departamentoService.js';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';


const initialFieldValues = {
    id: 0,
    nombre: '',
    codigo: '',
    creditos: '',
}

export default function AgregarCurso ({setOpenAddPopup, agregarCurso}) {

    const [departamento, setDepartamentos] = useState([]);

    const theme = useTheme();
    const ColumnGridItemStyle = {
        padding: theme.spacing(2),
        align:"left",

    }
    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('nombre' in fieldValues)
            temp.nombre = fieldValues.nombre ? "" : "Este campo es requerido."
        if ('codigo' in fieldValues)
            temp.codigo = fieldValues.codigo ? "" : "Este campo es requerido."
        if ('créditos' in fieldValues)
            temp.clave = fieldValues.créditos ? "" : "Este campo es requerido."
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
    } = useForm(initialFieldValues, true, validate);

    const handleSubmit = e => {
      e.preventDefault();
      if (validate()){
        const seccion = JSON.parse(window.localStorage.getItem("user"));
        console.log(seccion);
        const curso = {
          "codigo": values.codigo,
          "nombre": values.nombre,
          "creditos": parseInt(values.creditos),
          "seccion": {
            "id": seccion.persona.seccion.id,
          }
        }

        agregarCurso(curso);
      }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item sx={6} style={ColumnGridItemStyle}>
                    < Typography variant="h4" mb={2} >
                           DATOS DEL CURSO
                    </Typography>

                        <Controls.Input
                            name="codigo"
                            label="Clave"
                            value={values.codigo}
                            onChange = {handleInputChange}
                            error={errors.codigo}
                        />
                        <Controls.Input
                            name="nombre"
                            label="Nombre"
                            value={values.nombre}
                            onChange = {handleInputChange}
                            error={errors.nombre}
                        />
                        <Controls.NumberPicker
                            name="creditos"
                            label="Créditos"
                            type= "number"
                            value={values.creditos}
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
                        onClick={()=> setOpenAddPopup(false)}
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
