import React, { useEffect} from 'react'
import { Grid , Input,Divider, Stack,Typography, Avatar} from '@mui/material';
import { useForm, Form } from '../../../components/useForm';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTheme } from '@mui/material/styles'
import { Controls } from "../../../components/controls/Controls"
/* fake BackEnd */
import * as employeeService from '../../../services/employeeService';
import SeccionService from '../../../services/seccionService.js';
import DepartamentoService from '../../../services/departamentoService.js';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const initialFieldValues = {
    id: 0,
    nombre: '',
    correo: '',
    departmentId: '',
    nombreDepartamento: '',
    foto: '',
}

const convertirBase64 = (file) =>{
  return new Promise((resolve, reject) =>{
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    }

    //Si es error
    fileReader.error = (error) => {
      reject(error)
    }

  });
}


export default function AgregarEditarSeccion(props) {
    const {addOrEdit, recordForEdit, setOpenPopup} = props
    const theme = useTheme();
    const [fotoPerfil, setFotoPerfil] = React.useState(null);
    const [fileFoto, setFileFoto] = React.useState(null);
    const [cambio, setCambio] = React.useState(false);
    const [departamento, setDepartamentos] = React.useState([]);

    const ColumnGridItemStyle = {
        padding: theme.spacing(2),
        align:"left",

    }
    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('nombre' in fieldValues)
            temp.nombre = fieldValues.nombre ? "" : "Este campo es requerido"
        if ('correo' in fieldValues)
            temp.correo = (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                    .test(fieldValues.correo) ? ""
                    : "Este correo no es válido."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
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
    } = useForm(recordForEdit ? recordForEdit : initialFieldValues, true, validate);

    const handleSubmit = async e => {
        e.preventDefault()
        //Definicio de validaciones
        if (validate()){
          //window.alert('valid')

          //Este pasa como la nueva seccion o la seccion editada
          const newSecc = {
            id: values.id,
            nombre: values.nombre,
            correo: values.correo,
            departamento: {
              id: recordForEdit ? parseInt(values.idDepartamento) : parseInt(values.departmentId) ,
              nombre: recordForEdit ? parseInt(values.idDepartamento) : null,
            },
            //foto: fotoPerfil,
            fecha_fundacion: null
            //~~~foto: --queda pendiente
          }

          console.log(newSecc);
          //const rpta = await SeccionService.registerSeccion(newSecc);
          //console.log(rpta);
          addOrEdit(newSecc,resetForm)
          //resetForm()

        }
        else
            window.alert('invalid')
    }

    const FillDepartamentos = async () =>{
      const dataDep = await DepartamentoService.getDepartamentos();
      const departamentos = []

      //if(dataDep) setDepartamentos(dataDep);
      dataDep.map(dep => (
        departamentos.push({
          id: dep.id.toString(),
          nombre: dep.nombre,
        })
      ));

      //console.log(departamentos);
      return departamentos;
    }

    React.useEffect(() => {
      FillDepartamentos()
      .then (newDep =>{
        setDepartamentos(prevDep => prevDep.concat(newDep));
      });
      if (recordForEdit != null) {
          /* object is not empty - esto que hace?*/
          setValues({
              ...recordForEdit
          })
      }
    }, [recordForEdit])

    return (

      <Form onSubmit={handleSubmit}>

            <Grid container>
                <Grid item sx={6} style={ColumnGridItemStyle}>
                    < Typography variant="h4" mb={2} >
                           DATOS GENERALES
                    </Typography>
                    <Controls.Input
                        name="nombre"
                        label="Nombre"
                        value={values.nombre}
                        onChange = {handleInputChange}
                        error={errors.nombre}
                    />
                    <Controls.Input
                        name="correo"
                        label="Correo Electrónico"
                        value={values.correo}
                        onChange = {handleInputChange}
                        error={errors.correo}
                    />

                    <Controls.Select
                        name={recordForEdit? "idDepartamento" : "departmentId"}
                        label="Departamento"
                        value={recordForEdit? values.idDepartamento : values.departmentId}
                        onChange={handleInputChange}
                        options={departamento}
                    />
                </Grid>
                {/*
                <Divider orientation="vertical" flexItem sx={{mt: 9,mb:2, ml:9, mr:5}} />
                <Grid item sx={5} style={ColumnGridItemStyle} align="center">
                    <Typography variant="h4" mb={2} >
                        FOTO REFERENCIAL
                    </Typography>
                    {/* <Avatar src="/broken-image.jpg" sx={{ width: 250, height: 250,mb:2}} />
                    <Avatar src={fotoPerfil} sx={{ width: 250, height: 250,mb:2}} />
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file"
                            type="file" sx={{display: 'none'}}
                            onChange={(event) => {
                                const files = event.target.files
                                //console.log(files[0]);

                                setFileFoto(files[0])
                                setCambio(true)

                                if (files && files[0]) {
                                  var reader = new FileReader();
                                  reader.onload = function (e) {
                                    setFotoPerfil(e.target.result)
                                  };
                                  reader.readAsDataURL(files[0]);

                                }
                            }}
                        />
                        <Controls.Button
                            text="Subir foto"
                            // type="submit"   // html property (not component)
                            endIcon={<AddAPhotoIcon />} //Opcional con imagen
                            size="medium"
                            component="span"
                            />
                    </label>
                </Grid> */}
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
                        text="Guardar Cambios"
                        type="submit"
                    />

                </div>
            </Grid>
        </Form>
    );
}
