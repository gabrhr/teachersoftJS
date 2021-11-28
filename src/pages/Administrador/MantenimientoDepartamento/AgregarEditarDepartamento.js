import React, { useEffect } from 'react'
import { Grid , Input, Divider, Stack,Typography, Avatar} from '@mui/material';
import { useForm, Form } from '../../../components/useForm';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTheme } from '@mui/material/styles'
import { Controls } from "../../../components/controls/Controls"
/* fake BackEnd */
import * as DTLocalServices from '../../../services/DTLocalServices';
import DepartamentoService from '../../../services/departamentoService.js';
import UnidadService from '../../../services/unidadService.js';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const styles = {
    columnGridItem: {
      padding: 2
    }
  } 

let dataUni = [];

const getUnidades = async () => {
    
    dataUni = await UnidadService.getUnidades();
    dataUni = dataUni ?? []  
  
    const unidades = [];
    if(dataUni){
      dataUni.map(unid => (
        unidades.push({
          id: unid.id.toString(),
          activo: unid.activo,
          nombre: unid.nombre,
          fechaModificacion: unid.fecha_modificacion,
          fechaCreacion:unid.fecha_creacion,
        })
      ));
    }
    else console.log("No existen datos en Unidades");
    window.localStorage.setItem('listUnidades',JSON.stringify(dataUni));
    return unidades;
}
 
const initialFieldValues = {
    id: 0,
    nombre: '',
    correo: '',
    unidadId: 0,
    nombreUnidad: '',
    
}


export default function AgregarEditarDepartamento(props) {
    const {addOrEdit, recordForEdit, setOpenPopup} = props
    const [fotoPerfil, setFotoPerfil] = React.useState(null);
    const [fileFoto, setFileFoto] = React.useState(null);
    const [cambio, setCambio] = React.useState(false);
    const [departamento, setDepartamentos] = React.useState([]);

    const [unidad, setUnidades] = React.useState([])
  

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
        if(recordForEdit){
          temp.idUnidad = values.idUnidad !== 0 ? "" : "Este campo es requerido";
        } else{
          temp.unidadId = values.unidadId !== 0 ? "":"Este campo es requerido";
        }  
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
    } = useForm(recordForEdit? recordForEdit: initialFieldValues, true, validate);

    const handleSubmit = async e => {
        /* e is a "default parameter" */
        e.preventDefault();
        let fechaCreacion= "";
        if (validate()){
          //window.alert('valid')
          if(values.id) {
            const dep= await DepartamentoService.getDepartamento(values.id);
            fechaCreacion = dep.fecha_creacion;
          }
          const newDep = {
            id: values.id,
            nombre: values.nombre,
            correo: values.correo,
            fecha_creacion: fechaCreacion,
            fecha_modificacion: null,
            fecha_fundacion: fechaCreacion,
            unidad:{
                id: recordForEdit ? parseInt(values.idUnidad) : parseInt(values.unidadId),
                nombre: null,
            }
            //foto: null,
          }
          //console.log(newDep);
          //const rpta = await DepartamentoService.registerDepartamento(newDep);
          //console.log(rpta);
          addOrEdit(newDep,resetForm);
          //resetForm()
        }
//        if (validate())
//            addOrEdit(values,resetForm)
    }

    useEffect(() => {
        getUnidades()
        .then(newUnidad => {
          setUnidades(prevRecords => prevRecords.concat(newUnidad));
  
     
  
        });
        if (recordForEdit != null) {
            /* object is not empty */
            setValues({
                ...recordForEdit
            })
        }
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container
                  sx={{
                    gridTemplateColumns: "1fr 1fr ",
                  }}>
                 <Grid item xs={6} sx={styles.columnGridItem}>
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
                </Grid>
                <Grid item xs={6} sx={styles.columnGridItem}>
                < Typography variant="h4" mb={2} >
       
                    </Typography>
                  <Controls.Select
                    name={recordForEdit ? "idUnidad" : "unidadId"}
                    label="Facultad"
                    value={recordForEdit ? values.idUnidad : values.unidadId}
                    onChange={handleInputChange}
                    options={unidad}
                    options={[{ id: 0, nombre: "Seleccionar" }]
                    .concat(unidad)
                     }
                    error={recordForEdit ? errors.idUnidad : errors.unidadId}
             
         
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
                         <Avatar sx={{ width: 250, height: 250}}>
                            <img className="userImage" src="assets/img/profile-photo.png" alt="" />
                        </Avatar>
                    <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file"
                                type="file" sx={{display: 'none'}}
                                onChange={(event) => {
                                    const files = event.target.files

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
