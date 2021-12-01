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
import { useRadioGroup } from '@mui/material/RadioGroup';


let selectedID = 0;

const initialFieldValues = {
  id: 0,
  activo: 0,
  anho_publicacion: '',
  ciudad:  '',
  codigo_publicacion:  '',
  codigo_validacion:  '',
  divulgacion:  '',
  doi:  '',
  edicion:  '',
  editorial:  '',
  especialidad_unesco:  '',
  fecha_creacion:  '',
  fecha_modificacion:  '',
  filiacion:  '',
  identificador_produccion:  '',
  idioma:  '',
  indicador_calidad:  '',
  isbn:  '',
  issn:  '',
  medio_publicacion: '',
  motor_busqueda:  '',
  nro_revista:  '',
  observaciones_de_departamento:  '',
  observaciones_para_departamento:  '',
  pagina_final:  '',
  pagina_inicial:  '',
  pais:  '',
  palabras_clave:  '',
  responsabilidad:  '',
  subtipo_publicacion:  '',
  tipo_publicacion:  '',
  tipo_referencia:  '',
  titulo:  '',
  url_repositorio:  '',
  validacion_preliminar:  '',
  volumen:  '',
  
  //autor

  idAutor:  '',
  nombreAutor: '',
}



export default function AgregarEditarInvestiga(props) {
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
        let defaultError = "Este campo es requerido"
        if ('titulo' in fieldValues)
            temp.titulo = fieldValues.nombre ? "" : "Este campo es requerido"
        if ('anho_publicacion' in fieldValues)
            temp.anho_publicacion = fieldValues.nombre ? "" : "Este campo es requerido"
        if ('codigo_publicacion' in fieldValues)
            temp.codigo_publicacion = fieldValues.nombre ? "" : "Este campo es requerido"
        if ('correo' in fieldValues)
            temp.correo = (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                    .test(fieldValues.correo) ? ""
                    : "Este correo no es válido."
        // temp.idDepartamento = values.departmentId !== 0 ? "" : defaultError
        if(recordForEdit){
          temp.idAutor = values.idDepartamento !== 0 ? "" : defaultError;
        } else{
          temp.departmentId = values.departmentId !== 0 ? "":defaultError;
        }    
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
        e.preventDefault();
        let fechaCreacion= "";
        //Definicio de validaciones
        if (validate()){
            //console.log("Esto es sección");
            /*if(values.id) {
              const secc= await InvestigaService.getInvestiga(values.id);
              fechaCreacion = secc.fecha_creacion;
            }
            */
            //console.log(fechaCreacion);
          //Este pasa como la nueva seccion o la seccion editada
          const newTrabjo = {
            id: values.id,
            cod_publicacion: values.cod_publicacion,
            titulo:values.titulo,
            anho_publicacion: values.anho_publicacion,
            doi: values.doi,
            autor: {
              id: recordForEdit ? parseInt(values.idDepartamento) : parseInt(values.departmentId) ,
              nombre: recordForEdit ? parseInt(values.idDepartamento) : null,
            },
            fecha_creacion:fechaCreacion,
            //foto: fotoPerfil,
            fecha_modificacion: null,
            fecha_fundacion: null
            //~~~foto: --queda pendiente
          }
          console.log(newTrabjo);
          //const rpta = await SeccionService.registerSeccion(newSecc);
          //console.log(rpta);
          addOrEdit(newTrabjo,resetForm)
          //resetForm()
        }
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

    useEffect(() => {
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

            <Grid container spacing={8}>
                <Grid item sx={6}>
                    < Typography variant="h4" mb={2} >
                           DATOS GENERALES
                    </Typography>
                    <Controls.Input
                        name="anho_publicacion"
                        label="Año de Publicación"
                        value={values.anho_publicacion}
                        onChange = {handleInputChange}
                        error={errors.anho_publicacion}
                    />
                    <Controls.Input
                        name="ciudad"
                        label="Ciudad"
                        value={values.ciudad}
                        onChange = {handleInputChange}
                        error={errors.ciudad}
                    />
                    <Controls.Input
                        name="codigo_publicacion"
                        label="Código de Publicación"
                        value={values.cod_publicacion}
                        onChange = {handleInputChange}
                        error={errors.cod_publicacion}
                    />

                    <Controls.Input
                        name="codigo_validacion"
                        label="Código de Validación"
                        value={values.cod_publicacion}
                        onChange = {handleInputChange}
                        error={errors.cod_publicacion}
                    />
                    <Controls.Input
                        name="divulgacion"
                        label="Divulgación"
                        value={values.divulgacion}
                        onChange = {handleInputChange}
                        error={errors.divulgacion}
                    />
                    <Controls.Input
                        name="doi"
                        label="DOI"
                        value={values.doi}
                        onChange = {handleInputChange}
                        error={errors.doi}
                    />
                    <Controls.Input
                        name="edicion"
                        label="Edición"
                        value={values.edicion}
                        onChange = {handleInputChange}
                        error={errors.edicion}
                    />
                    <Controls.Input
                        name="editorial"
                        label="Editorial"
                        value={values.editorial}
                        onChange = {handleInputChange}
                        error={errors.editorial}
                    />
                    <Controls.Input
                        name="especialidad_unesco"
                        label="Especialidad Unesco"
                        value={values.especialidad_unesco}
                        onChange = {handleInputChange}
                        error={errors.especialidad_unesco}
                    />

                    <Controls.Input
                        name="edicion"
                        label="Edición"
                        value={values.edicion}
                        onChange = {handleInputChange}
                        error={errors.edicion}
                    />
                    {/*    
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Filiacion</FormLabel>
                        <RadioGroup
                            aria-label="filiacion"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                        <FormControlLabel value="si" control={<Radio />} label="Female" />
                        <FormControlLabel value="no" control={<Radio />} label="Male" />
                        
                        </RadioGroup>
                    </FormControl>
                    */}

                    <Controls.Input
                        name="identificador_produccion"
                        label="Identificador de Produccion"
                        value={values.identificador_produccion}
                        onChange = {handleInputChange}
                        error={errors.identificador_produccion}
                    />

                    <Controls.Input
                        name="idioma"
                        label="Idioma"
                        value={values.idioma}
                        onChange = {handleInputChange}
                        error={errors.idioma}
                    />

                    <Controls.Input
                        name="indicador_calidad"
                        label="Indicador de Calidad"
                        value={values.indicador_calidad}
                        onChange = {handleInputChange}
                        error={errors.indicador_calidad}
                    />
                     <Controls.Input
                        name="isbn"
                        label="ISBN"
                        value={values.isbn}
                        onChange = {handleInputChange}
                        error={errors.isbn}
                    />                 
                    <Controls.Input
                        name="issn"
                        label="ISSN"
                        value={values.issn}
                        onChange = {handleInputChange}
                        error={errors.issn}
                    /> 

                    <Controls.Input
                        name="medio_publicacion"
                        label="Medio de Publicacion"
                        value={values.medio_publicacion}
                        onChange = {handleInputChange}
                        error={errors.medio_publicacion}
                    /> 

                    <Controls.Input
                        name="motor_nusqueda"
                        label="Motor de Busqueda"
                        value={values.motor_busqueda}
                        onChange = {handleInputChange}
                        error={errors.motor_busqueda}
                    /> 

                    <Controls.Input
                        name="nro_revista"
                        label="Nro de Revista"
                        value={values.nro_revista}
                        onChange = {handleInputChange}
                        error={errors.nro_revista}
                    /> 
            
                    <Controls.Input
                        name="observaciones_de_departamento"
                        label="Observaciones de Departamento"
                        value={values.observaciones_de_departamento}
                        onChange = {handleInputChange}
                        error={errors.observaciones_de_departamento}
                    />

                    <Controls.Input
                        name="observaciones_para_departamento"
                        label="Observaciones para Departamento"
                        value={values.observaciones_para_departamento}
                        onChange = {handleInputChange}
                        error={errors.observaciones_para_departamento}
                    /> 

                    <Controls.Input
                        name="pagina_final"
                        label="Pagina Final"
                        value={values.pagina_final}
                        onChange = {handleInputChange}
                        error={errors.pagina_final}
                    /> 

                    <Controls.Input
                        name="pagina_inicial"
                        label="Pagina Inicial"
                        value={values.pagina_inicial}
                        onChange = {handleInputChange}
                        error={errors.pagina_inicial}
                    /> 

                    <Controls.Input
                        name="pais"
                        label="Pais"
                        value={values.pais}
                        onChange = {handleInputChange}
                        error={errors.pais}
                    />
                    <Controls.Input
                        name="palabras_clave"
                        label="Palabras Clave"
                        value={values.palabras_clave}
                        onChange = {handleInputChange}
                        error={errors.palabras_clave}
                    />

                    <Controls.Input
                        name="responsabilidad"
                        label="Responsabilidad"
                        value={values.responsabilidad}
                        onChange = {handleInputChange}
                        error={errors.responsabilidad}
                    />

                    <Controls.Input
                        name="subtipo_publicacion"
                        label="Subtipo de Publicacion"
                        value={values.subtipo_publicacion}
                        onChange = {handleInputChange}
                        error={errors.subtipo_publicacion}
                    />

                    <Controls.Input
                        name="tipo_publicacion"
                        label="Tipo de Publicacion"
                        value={values.tipo_publicacion}
                        onChange = {handleInputChange}
                        error={errors.tipo_publicacion}
                    />

                    <Controls.Input
                        name="tipo_referencia"
                        label="Tipo de Referencia"
                        value={values.tipo_referencia}
                        onChange = {handleInputChange}
                        error={errors.tipo_referencia}
                    />

                    <Controls.Input
                        name="titulo"
                        label="Titulo"
                        value={values.titulo}
                        onChange = {handleInputChange}
                        error={errors.titulo}
                    />

                    <Controls.Input
                        name="tipo_publicacion"
                        label="Tipo de Publicacion"
                        value={values.tipo_publicacion}
                        onChange = {handleInputChange}
                        error={errors.tipo_publicacion}
                    />
                    
                    <Controls.Input
                        name="tipo_referencia"
                        label="Tipo de Referencia"
                        value={values.tipo_referencia}
                        onChange = {handleInputChange}
                        error={errors.tipo_referencia}
                    />

                    <Controls.Input
                        name="url_repositorio"
                        label="URL Repositorio"
                        value={values.url_repositorio}
                        onChange = {handleInputChange}
                        error={errors.url_repositorio}
                    />


                    <Controls.Input
                        name="validacion_preliminar"
                        label="Validación Preliminar"
                        value={values.validacion_preliminar}
                        onChange = {handleInputChange}
                        error={errors.validacion_preliminar}
                    />

                    <Controls.Input
                        name="volumen"
                        label="Volumen"
                        value={values.volumen}
                        onChange = {handleInputChange}
                        error={errors.volumen}
                    />
                    {/*
                    <Controls.Select
                        name="rolID"
                        label="Rol del delegado"
                        value={values.rolID}
                        onChange={handleInputChange}
                        options={getDocentes()}
                        error={errors.rolID} 
                    />
                    */}
                    <Controls.Input
                        name="id_autor"
                        label="ID Autor"
                        value={values.idAutor}
                        onChange = {handleInputChange}
                        error={errors.idAutor}
                    />

                    <Controls.Input
                        name="tipo_publicacion"
                        label="Tipo de Publicacion"
                        value={values.tipo_publicacion}
                        onChange = {handleInputChange}
                        error={errors.tipo_publicacion}
                    />
                </Grid>
                {/*
                <Divider orientation="vertical" flexItem sx={{mt: 9,mb:2, ml:9, mr:5}} />
                <Grid item sx={5} style={ColumnGridItemStyle} align="center">
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
