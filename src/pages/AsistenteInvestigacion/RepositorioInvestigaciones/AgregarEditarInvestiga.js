
import React, { useEffect , useState} from 'react'
import esLocale from 'date-fns/locale/es';
import { Grid , Input, Divider, Stack,Typography, TextField, Avatar} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useForm, Form } from '../../../components/useForm';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTheme } from '@mui/material/styles'
import { Controls } from "../../../components/controls/Controls"
/* fake BackEnd */
import * as DTLocalServices from '../../../services/DTLocalServices';
import DepartamentoService from '../../../services/departamentoService.js';
import UnidadService from '../../../services/unidadService.js';
import Notification from '../../../components/util/Notification';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useRadioGroup } from '@mui/material/RadioGroup';
import SimpleDatePicker from '../../../components/DreamTeam/SimpleDatePicker';
import SimpleYearPicker from '../../../components/DreamTeam/SimpleYearPicker';
import { populateCountryList, populateYearList } from '../../../components/auxFunctions';
import UserService from '../../../services/userService';
import InvestigacionService from '../../../services/investigacionService';

/*Items selectbox */ 
let countryList = []; 
let yearList = []; 


const listTipos = [

    {id: 0, title: 'Académica'},
    {id: 1, title: 'Profesional'},
    {id: 2, title: 'Otros'},
    
]


const listCodVal = [

    {id: 0, title: 'A1'},
    {id: 1, title: 'L1'},
    {id: 2, title: 'L2'},
    {id: 3, title: 'P1'},
    {id: 4, title: 'A2'},
    {id: 5, title: 'L3'},
    {id: 6, title: 'P2'}

]

const radioYesNo = [
    {id: 0, title: 'No'},
    {id: 1, title: 'Si'},
]

const radioReferencia = [
    {id: 0, title: 'Terceros'},
    {id: 1, title: 'Por Docente'},
]

const radioCalidad = [
    {id: 0, title: 'Indizada'},
    {id: 1, title: 'Arbitrada'},
    {id: 2, title: 'No Arbitrada'},
]


const valoresValidacion = [
    {id: 0, title: 'Terceros'},
    {id: 1, title: 'Por Docente'},
]


function populateThings(){
    yearList = populateYearList();
    countryList = populateCountryList();
}

const styles = {
    columnGridItem: {
      padding: 2
    }
  }
  
let selectedID = 0;


const initialFieldValues = {
  id: 0,
  activo: 0,
  anho_publicacion:  new Date().getFullYear().toString(),
  ciudad:  '',
  codigo_publicacion:  '',
  codigo_validacion:  0,
  divulgacion:  '',
  doi:  '',
  edicion:  '',
  editorial:  '',
  especialidad_UNESCO:  '',
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
  pais:  'Perú',
  palabras_clave:  '',
  responsabilidad:  0,
  subtipo_publicacion:  0,
  tipo_publicacion:  0,
  filiacion: 0,
  tipo_referencia:  0,
  titulo:  '',
  url_repositorio:  '',
  validacion_preliminar:  0,
  indicador_calidad: 0,
  volumen:  '',
  //valoresValidacion:0,
  
  //autor

  //idAutor:  '',
  
  autorId: 0,
  nombreAutor: '',
  codigo_pucp: '',
 
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


let initialDocumento = initialFieldValues;

const getUsuario = async () => {

    let usuario = await UserService.getUsuarios();
    usuario = usuario ?? []
    console.log(usuario)
    var str, std, stl, ape1, ape2
    let roles = DTLocalServices.getAllRoles();
    const usuarios = [];
  
    usuario.map(usr => (
    
    
      usuarios.push({
        id: usr.id.toString(),
 
        nombre:  usr.persona.nombres + ' ' + usr.persona.apellidos,
       
      })
    ));
    //console.log(usuarios)
    window.localStorage.setItem('listUsuarios', JSON.stringify(usuario));
    return usuarios;

}

const getDocumento = async (id) => {

    let auxDocumento = await InvestigacionService.getDocumento(id);

    const documento = {
        id: auxDocumento.id,
        
        codigo_publicacion: auxDocumento.codigo_publicacion,
        tipo_publicacion: auxDocumento.tipo_publicacion,
        tipo_referencia: auxDocumento.tipo_referencia,
        indicador_calidad: auxDocumento.indicador_calidad,
        subtipo_publicacion: auxDocumento.subtipo_publicacion,
        anho_publicacion: auxDocumento.anho_publicacion,
        responsabilidad: auxDocumento.responsabilidad,
        titulo: auxDocumento.titulo,
        divulgacion: auxDocumento.divulgacion,
        editorial: auxDocumento.editorial,
        idioma: auxDocumento.idioma,
        edicion: auxDocumento.edicion,
        ciudad: auxDocumento.ciudad,
        pais: auxDocumento.pais,
        medio_publicacion: auxDocumento.medio_publicacion,
        palabras_clave: null, //auxDocumento.palabras_clave,
        url_repositorio: auxDocumento.url_repositorio,
        filiacion: auxDocumento.filiacion,
        especialidad_UNESCO: auxDocumento.especialidad_UNESCO,
        volumen: auxDocumento.volumen,
        nro_revista: auxDocumento.nro_revista,
        pagina_inicial: auxDocumento.pagina_inicial,
        pagina_final: auxDocumento.pagina_final,
        motor_busqueda: auxDocumento.motor_busqueda,
        identificador_produccion: auxDocumento.motor_busqueda,
        observaciones_para_departamento: auxDocumento.observaciones_para_departamento,
        observaciones_de_departamento: auxDocumento.observaciones_de_departamento,
        validacion_preliminar: auxDocumento.validacion_preliminar,
        codigo_validacion: (auxDocumento.validacion_preliminar != 0 ?  auxDocumento.codigo_validacion : 0),
        issn: auxDocumento.issn,
        doi: auxDocumento.url_repositorio,
        isbn: auxDocumento.isbn,
  
        idAutor: auxDocumento.autor.id, 
        nombreAutor: auxDocumento.autor.nombre,
        
    }
    initialDocumento = documento
    return documento;
}


export default function AgregarEditarInvestiga(props) {

    const {addOrEdit, recordForEdit, handleLinkClick, change, notify, setNotify} = props
    const theme = useTheme();
    const [fotoPerfil, setFotoPerfil] = React.useState(null);
    const [fileFoto, setFileFoto] = React.useState(null);
    const [cambio, setCambio] = React.useState(false);
    const [usuarios, setUsuarios] = React.useState([]);
    const [enableValidation, setEnableValidation] = React.useState(false);
    
    
    const ColumnGridItemStyle = {
        padding: theme.spacing(2),
        align:"left",

    }
    const validate = (fieldValues = values) => {
        let temp = {...errors}
        let defaultError = "Este campo es requerido"
        if ('titulo' in fieldValues)
            temp.titulo = fieldValues.titulo ? "" : "Este campo es requeridos"
        if ('anho_publicacion' in fieldValues)
            temp.anho_publicacion = fieldValues.anho_publicacion ? "" : "Este campo es requerido"
        if (fieldValues.anho_publicacion)
            if (!isNaN(fieldValues.anho_publicacion))
                temp.anho_publicacion = ""
            else
                temp.anho_publicacion = "Año de Publicación tiene que ser un número"
        if ('codigo_publicacion' in fieldValues)
            temp.codigo_publicacion = fieldValues.codigo_publicacion ? "" : "Este campo es requerido"
        if(fieldValues.codigo_publicacion)
                temp.codigo_publicacion = (/^[0-9]{3}(-){1}[a-zA-Z]{3}$/).test(fieldValues.codigo_publicacion) ? "" : "Tiene que tener el formato: 123-ABC"
        if(fieldValues.nro_revista)
                temp.nro_revista = (/^\d+$/).test(fieldValues.nro_revista) ? "" : "Tiene que ser numérico"
        if(fieldValues.volumen)
            temp.volumen = (/^\d+$/).test(fieldValues.volumen) ? "" : "Tiene que ser numérico"
        if ('idioma' in fieldValues)
            temp.idioma = fieldValues.idioma ? "" : "Este campo es requerido"
        if (fieldValues.idioma)
            if (isNaN(fieldValues.idioma))
                temp.idioma = ""
            else
                temp.idioma = "Idioma no puede ser un número"
        if ('ciudad' in fieldValues)
            if (fieldValues.ciudad){
                if (isNaN(fieldValues.ciudad))
                    temp.ciudad = ""
                else
                    temp.ciudad = "Ciudad no puede ser un número"
            }else{
                temp.ciudad = "Este campo es requerido"
            }
        if ('pais' in fieldValues)
            temp.pais = fieldValues.pais ? "" : "Este campo es requerido"
        if ('url_repositorio' in fieldValues)
            temp.url_repositorio = fieldValues.url_repositorio ? "" : "Este campo es obligatorio"
        if (fieldValues.url_repositorio)
            temp.url_repositorio = (/^(ftp|http|https):\/\/[^ "]+$/).test(fieldValues.url_repositorio) ? "" : "Este URL no es válido"
        if ('divulgacion' in fieldValues)
            temp.divulgacion = fieldValues.divulgacion ? "" : "Este campo es obligatorio"
        if ('pagina_inicial' in fieldValues)
            temp.pagina_inicial = fieldValues.pagina_inicial ? "" : "Este campo es obligatorio"
        if ('pagina_final' in fieldValues)
            temp.pagina_final = fieldValues.pagina_final ? "" : "Este campo es obligatorio"
        if(fieldValues.pagina_inicial && fieldValues.pagina_final)
            temp.pagina_final = (fieldValues.pagina_final>=fieldValues.pagina_inicial) ? "" : "La página final deber ser mayor a la página inicial"
        if ('correo' in fieldValues)
            temp.correo = (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                    .test(fieldValues.correo) ? ""
                    : "Este correo no es válido."
        //if(!fieldValues.isbn && !fieldValues.issn)
        //    temp.isbn = "Se requiere al menos ISBN o ISSN"
            
        // temp.idDepartamento = values.departmentId !== 0 ? "" : defaultError
        /*
        if(recordForEdit){
          temp.idAutor = values.autorId !== 0 ? "" : defaultError;
        } else{
          temp.autorId = values.autorId !== 0 ? "":defaultError;
        } 
        */   
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
    } = useForm(addOrEdit > 0 ? recordForEdit : initialFieldValues, true, validate);

    const handleSubmit = async e => {
        e.preventDefault();
        let fechaCreacion= "";
        //Definicio de validaciones
        if (values.autorId > 0)
        values.idAutor = values.autorId;
        if (validate()){

          const newTrabjo = {

            id: (  values.id ),
            autor: {
                id: values.idAutor ,
            },
            codigo_publicacion: values.codigo_publicacion,
            tipo_publicacion: values.tipo_publicacion,
            tipo_referencia: values.tipo_referencia,
            indicador_calidad: values.indicador_calidad,
            subtipo_publicacion: values.subtipo_publicacion,
            anho_publicacion: values.anho_publicacion,
            responsabilidad: values.responsabilidad,
            titulo: values.titulo,
            divulgacion: values.divulgacion,
            editorial: values.editorial,
            idioma: values.idioma,
            edicion: values.edicion,
            ciudad: values.ciudad,
            pais: values.pais,
            medio_publicacion: values.medio_publicacion,
            palabras_clave: null, //values.palabras_clave,
            url_repositorio: values.url_repositorio,
            filiacion: values.filiacion,
            especialidad_UNESCO: values.especialidad_UNESCO,
            volumen: values.volumen,
            nro_revista: values.nro_revista,
            pagina_inicial: values.pagina_inicial,
            pagina_final: values.pagina_final,
            motor_busqueda: values.motor_busqueda,
            identificador_produccion: values.motor_busqueda,
            observaciones_para_departamento: values.observaciones_para_departamento,
            observaciones_de_departamento: values.observaciones_de_departamento,
            validacion_preliminar: values.validacion_preliminar,
            codigo_validacion: (values.validacion_preliminar != 0 ?  values.codigo_validacion : 0),
            issn: values.issn,
            doi: values.url_repositorio,
            isbn: values.isbn

          }
          console.log(newTrabjo);
          let rpta

          if (addOrEdit < 1){
            try {
                rpta = await InvestigacionService.registerDocumento(newTrabjo);
                setNotify({
                    isOpen: true,
                    message: 'Registro de Documento Éxitoso',
                    type: 'success'
                });
                await sleep(2000);
                handleLinkClick()
            }
            catch(excep){
                setNotify({
                    isOpen: true,
                    message: 'Error en el ingreso de datos:  ' + rpta.toString(),
                    type: 'error'
                });
            }
          }
          else {
            try {
                rpta = await InvestigacionService.updateDocumento(newTrabjo, addOrEdit);
                setNotify({
                    isOpen: true,
                    message: 'Cambios Guardados Exitosamente',
                    type: 'success'
                });
                await sleep(2000);
                handleLinkClick()
            }
            catch(excep){
                setNotify({
                    isOpen: true,
                    message: 'Error en la modificación de datos:  ' + rpta.toString(),
                    type: 'error'
                });
            }
          }
          
          //console.log(rpta);
          
          //resetForm()
        }
    }

    useEffect(() => {

        setEnableValidation(false)
     }, [enableValidation])
    

    useEffect(() => {
       getUsuario()
      .then (newUsr =>{
        setUsuarios(prevUsr => prevUsr.concat(newUsr));
      });
      

     }, [addOrEdit, recordForEdit])

    useEffect(() => {

        if (addOrEdit > 0)
        setValues({
            ...recordForEdit
        })

    }, [change])

    const convertToDefaultEventParameter = (name, value) => ({
        target: {
            name, value
        }
    })
    const PaperStyle = { borderRadius: '20x', pb: 4, pt:0.7, px: 0.7, color: "primary.light", elevatio: 0 }
    const SubtitulosTable = { display: "flex", color: "primary.light" }
    return (

      <Form onSubmit={handleSubmit}>

    
                {populateThings()}
                <Grid item sx={6}>
                    <Typography variant="h4" style={SubtitulosTable}>
                           Información General de la Publicación:
                    </Typography>
                    <Controls.Select
                        name={recordForEdit ? "idAutor" : "autorId"}
                        label="Autor"
                        value={recordForEdit ? values.idAutor : values.autorId}
                        onChange={handleInputChange}
                        options={usuarios}
                        options={[{ id: 0, nombre: "Seleccionar" }]
                        .concat(usuarios)
                        }
                        error={recordForEdit ? errors.idAutor : errors.autorId}
                    />
 

                    
                    <Controls.Input
                        name="titulo"
                        label="Titulo"
                        value={values.titulo}
                        onChange = {handleInputChange}
                        error={errors.titulo}
                    />
                    <Grid container sx={{ gridTemplateColumns: "1fr 1fr 1fr ",}}>
                        <Grid item xs={4} sx={styles.columnGridItem}>
                            <Controls.Input
                                name="codigo_publicacion"
                                label="Código de Publicación"
                                value={values.codigo_publicacion}
                                onChange = {handleInputChange}
                                error={errors.codigo_publicacion}
                            />
                            <Controls.Select
                                name="tipo_publicacion"
                                label="Tipo de Publicación"
                                value={values.tipo_publicacion  }
                                onChange={handleInputChange}
                                options={listTipos}
                                error={errors.tipo_publicacion}
                            />
 
                            <Controls.Select
                                name="anho_publicacion"
                                label="Año de publicación"
                                value={values.anho_publicacion ? values.anho_publicacion : yearList[0]}
                                onChange={handleInputChange}
                                options={yearList}
                                error={errors.anho_publicacion}
                            />
           
                        </Grid>
                        <Grid item xs={3} sx={styles.columnGridItem}/>
                        <Grid item xs={4} sx={styles.columnGridItem}>
                            <Controls.Input
                                name="idioma"
                                label="Idioma"
                                value={values.idioma}
                                onChange = {handleInputChange}
                                error={errors.idioma}
                            />
                            <Controls.Input
                                name="ciudad"
                                label="Ciudad"
                                value={values.ciudad}
                                onChange = {handleInputChange}
                                error={errors.ciudad}
                            />
                            <Controls.Select
                                name="pais"
                                label="País"
                                value={values.pais ? values.pais : countryList[0]}
                                onChange={handleInputChange}
                                options={countryList}
                                error={errors.pais}
                            />
                        </Grid>

                    </Grid>
                    <Divider      />   
                    <Typography variant="h4" style={SubtitulosTable}>
                        Información de Identificación de la publicación:
                    </Typography>

                    <Grid container sx={{ gridTemplateColumns: "1fr 1fr"}}>
                    <Controls.Input
                            name="url_repositorio"
                            label="DOI (URL del documento)"
                            value={values.url_repositorio}
                            onChange = {handleInputChange}
                            error={errors.url_repositorio}
                        />
                        <Grid item xs={4} sx={styles.columnGridItem}>
                            <Controls.Input
                            name="isbn"
                            label="ISBN"
                            value={values.isbn}
                            onChange = {handleInputChange}
                            error={errors.isbn}
                        />
                        </Grid>
                        <Grid item xs={4} sx={styles.columnGridItem}>
                            <Controls.Input
                                name="issn"
                                label="ISSN"
                                value={values.issn}
                                onChange = {handleInputChange}
                                error={errors.issn}
                            /> 
                        </Grid>

                    </Grid>           

                    <Divider      />   
                    <Typography variant="h4" style={SubtitulosTable}>
                        Información del Medio de Publicación:
                    </Typography>
                    <Grid container sx={{ gridTemplateColumns: "1fr 1fr"}}>
                        <Controls.Input
                            name="divulgacion"
                            label="Divulgación"
                            multiline
                            rows={2}
                            value={values.divulgacion}
                            onChange = {handleInputChange}
                            error={errors.divulgacion}
                        />
                        <Grid item xs={4} sx={styles.columnGridItem}>
                            <Controls.Input
                                name="medio_publicacion"
                                label="Medio de Publicación"
                                value={values.medio_publicacion}
                                onChange = {handleInputChange}
                                error={errors.medio_publicacion}
                            />
                            <Controls.Input
                                name="motor_busqueda"
                                label="Base de datos"
                                value={values.motor_busqueda}
                                onChange = {handleInputChange}
                                error={errors.motor_busqueda}
                            />
                            <Controls.Input
                                name="especialidad_UNESCO"
                                label="Especialidad Unesco"
                                value={values.especialidad_UNESCO}
                                onChange = {handleInputChange}
                                error={errors.especialidad_UNESCO}
                            />
                            <Controls.Input
                                name="editorial"
                                label="Editorial"
                                value={values.editorial}
                                onChange = {handleInputChange}
                                error={errors.editorial}
                            />
                        </Grid>
                        <Grid item xs={4} sx={styles.columnGridItem}>
                            <Controls.Input
                                name="edicion"
                                label="Edicion"
                                value={values.edicion}
                                onChange = {handleInputChange}
                                error={errors.edicion}
                            /> 
                            <Controls.Input
                                name="volumen"
                                label="Volumen"
                                value={values.volumen}
                                onChange = {handleInputChange}
                                error={errors.volumen}
                            /> 
                            <Controls.Input
                                name="nro_revista"
                                label="N° Revista"
                                value={values.nro_revista}
                                onChange = {handleInputChange}
                                error={errors.nro_revista}
                            /> 
                            <Grid container spacing={2}>
                                <Grid item  xs={5}>
                                    <Controls.Input
                                        name="pagina_inicial"
                                        label="Pág. Inicial"
                                        value={values.pagina_inicial}
                                        onChange = {handleInputChange}
                                        error={errors.pagina_inicial}
                                    />     
                                </Grid>
                                
                                <Grid item  xs={5}>
                                    <Controls.Input
                                        name="pagina_final"
                                        label="Pág. Final"
                                        value={values.pagina_final}
                                        onChange = {handleInputChange}
                                        error={errors.pagina_final}
                                    />     
                                </Grid>
                                </Grid>
                        </Grid>

                    </Grid>        
                    <Divider      />   
                    <Typography variant="h4" style={SubtitulosTable}>
                        Información PUCP de la publicación:
                    </Typography>
                    <Grid container sx={{ gridTemplateColumns: "1fr 1fr"}}>
                        <Grid item xs={4} sx={styles.columnGridItem}>
                            <Controls.RadioGroup
                                name="filiacion"
                                label="Filiación PUCP"
                                value={values.filiacion}
                                onChange={handleInputChange}
                                items={radioYesNo}
                            />
                            <Controls.RadioGroup
                                name="tipo_referencia"
                                label="Tipo Referencia"
                                value={values.tipo_referencia}
                                onChange={handleInputChange}
                                items={radioReferencia}
                            />
                            <Controls.RadioGroup
                                name="validacion_preliminar"
                                label="Publicación Validada"
                                value={values.validacion_preliminar}
                                onChange={handleInputChange}
                                items={radioYesNo}
                            />
                        </Grid>
                        <Grid item xs={6} sx={styles.columnGridItem}>
                            <Controls.RadioGroup
                                name="indicador_calidad"
                                label="Calidad"
                                value={values.indicador_calidad}
                                onChange={handleInputChange}
                                items={radioCalidad}
                            /> 
                            <Controls.Input
                                name="identificador_produccion"
                                label="Identificador de Producción"
                                value={values.identificador_produccion}
                                onChange={handleInputChange}
                                /*setEnableValidation(true);*/
                                error={errors.identificador_produccion}
                            />     
                           <Controls.Select
                                name="codigo_validacion"
                                label="Código de Validación"
                                value={values.codigo_validacion}
                                onChange={handleInputChange}
                                disabled={values.validacion_preliminar == '0' ? true : false}
                                options={listCodVal}
                                error={errors.codigo_validacion}
                            />
                        </Grid>

                    </Grid>      
                    <Divider      />   
                    <Typography variant="h4" style={SubtitulosTable}>
                        Observaciones:
                    </Typography> 
                    <Controls.Input
                            name="observaciones_para_departamento"
                            label="Observaciones para el Departamento"
                            multiline
                            rows={2}
                            value={values.observaciones_para_departamento}
                            onChange = {handleInputChange}
                            error={errors.observaciones_para_departamento}
                    />
                    <Controls.Input
                            name="observaciones_de_departamento"
                            label="Observaciones del Departamento"
                            multiline
                            rows={2}
                            value={values.observaciones_de_departamento}
                            onChange = {handleInputChange}
                            error={errors.observaciones_de_departamento}
                    />
            </Grid>
            <Grid cointainer align="right" mt={5}>
                <div>
                    <Controls.Button
                        // disabled={true}
                        variant="disabled"
                        text="Cancelar"
                        onClick={()=> handleLinkClick()}
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
