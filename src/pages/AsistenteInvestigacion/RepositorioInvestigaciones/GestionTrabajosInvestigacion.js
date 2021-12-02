//link: localhost:3000/ai/repoInvestigaciones

import React, {useState, useEffect} from 'react';
import { Controls } from '../../../components/controls/Controls'
import { StyledTableRow, StyledTableCell } from '../../../components/controls/StyledTable';
import useTable from "../../../components/useTable"
import ContentHeader from '../../../components/AppMain/ContentHeader';
import { Link, LBox, Divider, Grid, Typography, Paper, TableBody, TableRow, TableCell,InputAdornment } from '@mui/material';
import { useForm, Form } from '../../../components/useForm';
import { makeStyles } from '@mui/styles'
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { ExportCSV } from '../../../components/PageComponents/ExportCSV';
import Popup from '../../../components/util/Popup'
import Notification from '../../../components/util/Notification';
import ConfirmDialog from '../../../components/util/ConfirmDialog';
/*IMPORTS LOCALES*/
import TrabajosInvestigacion from './TrabajosInvestigacion'
/* SERVICES */
import TrabajoService from '../../../services/investigacionService';
/*ICONS*/
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DetailsIcon from '@mui/icons-material/Details';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { DT } from '../../../components/DreamTeam/DT';
import { ContactPage } from '@mui/icons-material';
import AgregarEditarInvestiga from './AgregarEditarInvestiga'

import GestionTrabajosInvestigacionDetalle from './GestionTrabajosInvestigacionDetalle';


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
  // Autor
  idAutor:  '',
  nombreAutor: '',
  foto_url: '',
  codigo_pucp: '',
}

const useStyles = makeStyles(theme => ({
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  visible: {
    transitionDuration: "0.0s",
    display: "none"
  },
  hidden: {
    transitionDuration: "0.0s"
  },
  collapsible: { transitionDuration: "0.0s" }
}));
//TABLE HEADERS
const tableHeaders = [
//**falta agregar headers
    {
      id: 'codigo_publicacion',
      label: 'Codigo',
      numeric: false,
      sortable: true
    },
    {
      id: 'titulo',
      label: 'Titulo',
      numeric: false,
      sortable: true
    },
    {
      id: 'nombreAutor',
      label: 'Autor',
      numeric: false,
      sortable: true
    },
    {
      id: 'anho_publicacion',
      label: 'Periodo',
      numeric: false,
      sortable: false
    },

    {
      id: 'url_repositorio',
      label: 'URL',
      numeric: false,
      sortable: false
    },
    {
      id: 'actions',
      label: '',
      numeric: false,
      sortable: false
    }
]


const getDocumentos = async () => {

    const trabajos = [];

    let dataTrabajo = await TrabajoService.getDocumentos();
    dataTrabajo = dataTrabajo ?? [];
    if (dataTrabajo){
        dataTrabajo.map(trabajo => (
            trabajos.push({
                id: trabajo.id.toString(),
                activo: trabajo.activo,
                anho_publicacion: trabajo.anho_publicacion,
                ciudad: trabajo.ciudad,
                codigo_publicacion: trabajo.codigo_publicacion,
                codigo_validacion: trabajo.codigo_validacion,
                divulgacion: trabajo.divulgacion,
                doi: trabajo.doi,
                edicion: trabajo.edicion,
                editorial: trabajo.editorial,
                especialidad_UNESCO: trabajo.especialidad_UNESCO,
                fecha_creacion: trabajo.fecha_creacion,
                fecha_modificacion: trabajo.fecha_modificacion,
                filiacion: trabajo.filiacion,
                identificador_produccion: trabajo.identificador_produccion,
                idioma: trabajo.idioma,
                indicador_calidad: trabajo.indicador_calidad,
                isbn: trabajo.isbn,
                issn: trabajo.issn,
                medio_publicacion: trabajo.medio_publicacion,
                motor_busqueda: trabajo.motor_busqueda,
                nro_revista: trabajo.nro_revista,
                observaciones_de_departamento: trabajo.observaciones_de_departamento,
                observaciones_para_departamento: trabajo.observaciones_para_departamento,
                pagina_final: trabajo.pagina_final,
                pagina_inicial: trabajo.pagina_inicial,
                pais: trabajo.pais,
                palabras_clave: trabajo.palabras_clave,
                responsabilidad: trabajo.responsabilidad,
                subtipo_publicacion: trabajo.subtipo_publicacion,
                tipo_publicacion: trabajo.tipo_publicacion,
                tipo_referencia: trabajo.tipo_referencia,
                titulo: trabajo.titulo,
                url_repositorio: trabajo.url_repositorio,
                validacion_preliminar: trabajo.validacion_preliminar,
                volumen: trabajo.volumen,

                //autor
                //utor: trabajo.autor,
                idAutor: trabajo.autor.id,
                nombreAutor: trabajo.autor.nombres + ' ' + trabajo.autor.apellidos,
                foto_url: trabajo.autor.foto_URL,
                codigo_pucp: trabajo.autor.codigo_pucp
            })
        ));
    }
    else console.log("No existen datos en Trabajos de investigación");
    window.localStorage.setItem('listTrabajos',trabajos);

    return trabajos;
}



export default function GestionTrabajosInvestigacion() {
	const [openPopup, setOpenPopup] = useState(false);
  const [openPopupCargaMasiva, setOpenPopupCargaMasiva] = useState(false);
  const [deleteData, setDeleteData] = useState(false);
  const [createData, setCreateData] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [records, setRecords] = useState([]);
  // const [record, setRecord] = useState(null);
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''});
  const [detail, setDetail] = useState(false);
  const [isViewActivityMode, setIsViewActivityMode] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  // const [selectedRow, setSelectedRow] = useState(50);

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  const vacio = [{
    "COD_FINAL_PUBLICACION": " ",
    "COD_DOCENTE": " ",
    "APELLIDOS_NOMBRES": " ",
    "DES_TIPO": " ",
    "TIPO_REFERENCIA": " ",
    "DES_INDICADOR_CALIDAD": " ",
    "DES_SUBTIPO": " ",
    "ANIO_PRODUCCION": " ",
    "RESPONSABILIDAD": " ",
    "TITULO": " ",
    "DES_DIVULGACION": " ",
    "PUB_EDITORIAL": " ",
    "DES_IDIOMA": " ",
    "PUB_EDICION": " ",
    "DES_CIUDAD": " ",
    "DES_PAIS": " ",
    "PUB_ISBN": " ",
    "PUB_ISSN": " ",
    "PUB_DOI": " ",
    "MED_PUBLICACION": " ",
    "PALABRAS_CLAVE": " ",
    "TEXTO_COMPLETO": " ",
    "PUBLICACION_FILIACION_PUCP": " ",
    "ESPECIALIDAD_UNESCO": " ",
    "PUB_VOLUMEN": " ",
    "PUB_NRO_REVISTA": " ",
    "PAGINA_INI_ARTICULO_REVISTA": " ",
    "PAGINA_FIN_ARTICULO_REVISTA": " ",
    "MOTOR_BUSQUEDA": " ",
    "IDENTIFICADOR_PRODUCCION": " ",
    "VALIDACION_PRELIMINAR_PUBLICACION": " ",
    "COD_PUBLICACION_VALIDADA": " ",
    "OBSERVACIONES_PARA_DPTO_ACADEMICO": " ",
    "OBSERVACIONES_DE_DPTO_ACADEMICO": " ",
    "URL": " "
  }];

  // CSV components
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'Trabajo_Investigacion': ws }, SheetNames: ['Trabajo_Investigacion'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, fileName + fileExtension);
  }

  const validate = columnas => {
    // COD_FINAL_PUBLICACION esta compuesto de 123-ABC, es necesario verificar cada parte
    let codigo=columnas.Codigo.split("-");
    let numPublicacion = codigo[0];
    let codRevisor = codigo[1];
    let codRevisorLength=3;
    if(columnas.Codigo === "" || codigo.length === columnas.Codigo.length || isNaN(numPublicacion) || codRevisor.length != codRevisorLength){
      if(columnas.Codigo === "") alert("Error en la plantilla: COD_FINAL_PUBLICACION - Campo vacío");
      else if(codigo.length === columnas.Codigo.length) alert("Error en la plantilla: COD_FINAL_PUBLICACION - No existe ningún guión de separación");
      else if(isNaN(numPublicacion)) alert("Error en la plantilla: COD_FINAL_PUBLICACION - Primer fragmento no numérico");
      else alert("Error en la plantilla: COD_FINAL_PUBLICACION - Segundo fragmento no contiene la longitud esperada");
      return false
    }
    if(columnas.Titulo === ""){
      alert("Error en la plantilla: TITULO - Campo vacío")
      return false
    }
    // El autor es dado en el formato APELLIDO, NOMBRE
    let autor=columnas.Codigo.split(",");
    if(columnas.Autor === "" || autor.length === columnas.Autor.length){
      if(columnas.Autor === "") alert("Error en la plantilla: APELLIDOS_NOMBRES - Campo vacío")
      else alert("Error en la plantilla: APELLIDOS_NOMBRES - No existe una separación entre apellido y nombre")
      return false
    }
    if(columnas.Periodo === "" || isNaN(columnas.Periodo)){
      if(columnas.Periodo === "") alert("Error en la plantilla: ANIO_PRODUCCION - Campo vacío")
      else alert("Error en la plantilla: ANIO_PRODUCCION - No es un número")
      return false
    }
    // Una URL posee una extension, en caso no se haya asignado, debe de colocarse el enunciado "Sin imagen"
    let extension = (columnas.URL.split('.')).pop();
    let extensionMaxLength = 4;
    // Consultar sobre si existirá la posibilidad de que por defecto si no se asigna un pdf se guarda como Sin imagen
    if(columnas.URL === "" || extension > extensionMaxLength){
      if(columnas.URL === "") alert("Error en la plantilla: URL - Campo vacío");
      else alert("Error en la plantilla: URL - Extensión inválida")
      return false
    }
    return true
  }

  // FALTA IMPLEMENTAR
  const datosPublicaciones = listaPublicaciones => {
    const publicaciones = []
    listaPublicaciones.map(hor => (
      publicaciones.push({
      "codigo": hor.Horario,
      "tipo": hor.Tipo === "Clase" ? 0 : 1, //Si es clase es 0 - si es laboratorio 1
      "horas_semanales": hor.Horas, //Horas_semanales: cargaHoraria
      ciclo:{
        //"id":AGARRADO DESDE LA SELECCION DE CICLOS - SU ID
        "id": parseInt(window.localStorage.getItem('ciclo')),
      },
      curso:{
        "codigo": hor.Clave, //INF...
        "nombre": hor.Nombre, //NOMBRE DEL CURSO
        //"creditos": hor.Creditos, //Creditos del Curso
        //"unidad": hor.Unidad, //Creditos del Curso
        //"carga": hor.Carga_Horaria, //Creditos del Curso
      },
      //El backend manejo esta sesion - como si un horario - tiene un arreglo de horas y tipos:
      profesor: {}, //Se llenará cuando se cargen los profesores al curso - item 3
      //"sesiones_excel": hor.Hora_Sesion
        //AQUI SOLO SE CONSIDERARÁ LAS HORAS DE LA HORA_SESION  - Como String - sesiones ya no va
      /*LOS PROFESORES SE AÑADEN LUEGO TODAVÍA*/
      //claveCurso	nombreCurso	cargaHoraria	horario	tipoSesion	horaSesion
    })
    ));
    //horario = horarios;
    return publicaciones;
  }

  const processData = dataString => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

    let list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      if (headers && row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] === '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] === '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
              obj[headers[j]] = d;
          }
        }
        console.log(obj)
        if(!validate(obj)){
          return
        }
        if (Object.values(obj).filter(x => x).length > 0) {
          list.push(obj);
        }
      }
    }

    const columns = headers.map(c => ({
        name: c,
        selector: c
    }));

    setData(list);
    setColumns(columns);

    let listaCorrectos = []
    for (let i = 0; i < list.length; i++) {
        listaCorrectos.push(list[i])
    }

    //Hacemos el paso de los datos a un objeto
    const publicaciones = datosPublicaciones(listaCorrectos)

    setRecords(prevRecords => prevRecords.concat(publicaciones));
  };

  const handleUploadFile = e => {
    try{
      const file = e.target.files[0];
      let extension = (file.name.split('.')).pop();
      if(extension !== "xlsx" && extension !== "xls"){
        alert("Solo se pueden importar archivos .xlsx y .xls");
        return;
      }
      const reader = new FileReader();
      reader.onload = evt => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, {type: "binary"});
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_csv(ws, {header: 1});
        processData(data);
      }
      reader.readAsBinaryString(file);
    } catch(error){
      console.log(error);
    }
  }

    const {values, setValues} = useForm(initialFieldValues);

    const classes = {
      ...useStyles()
    };

    const [confirmDialog, setConfirmDialog] = useState(
        { isOpen: false, title: '', subtitle: '' });

	  const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records, tableHeaders, filterFn);

    const handleSearch = e => {
        let target = e.target;
        /* React "state object" (useState()) doens't allow functions, only
          * objects.  Thus the function needs to be inside an object. */
        setFilterFn({
          fn: items => {
            if (target.value == "")
              /* no search text */
              return items
            else
              return items.filter(x => x.titulo.toLowerCase()
                  .includes(target.value.toLowerCase()))
          }
        })
    }

    const handleSubmit = e => {
      e.preventDefault();
      setRecords(records);
      handleClose();
      setOpenPopupCargaMasivaup(false);
    }

    useEffect(() => {
        getDocumentos()
        .then (newTrabjo =>{
          setRecords(newTrabjo);

          console.log(newTrabjo);
          setDeleteData(false);
          setCreateData(false);
        });
    }, [recordForEdit, deleteData, createData])

    useEffect(() => {
      setIsViewActivityMode(prev => !prev);
    }, [isVisible]);

    const handleChange = (id_trabajo) => {
      if (isVisible){
        setIsVisible(prev => !prev);
      }
      else if (id_trabajo == localStorage.getItem("id_trabajo")){
        setIsVisible(prev => !prev);
      }

    };

    const addOrEdit = (trabajo, resetForm) => {
      //puede que se modifique, revisar Gestion USuario

      recordForEdit
      ? TrabajoService.updateDocumento(trabajo,trabajo.id)
      : TrabajoService.registerDocumento(trabajo)
      .then(idTrabajo=> {
        if(recordForEdit){
          setRecordForEdit(null);
          setUpdateData(true);}
      })

      setOpenPopup(false)
      resetForm()
      setCreateData(true);
      console.log(updateData);
      console.log(createData);
      if(!updateData){
        setNotify({
          isOpen: true,
          message: 'Cambios Guardados Exitosamente',
          type: 'success'
        });
        setUpdateData(false);
      } else {
        setNotify({
          isOpen: true,
          message: 'Registro de Trabajo Exitoso',
          type: 'success'
        });
        setUpdateData(false);
      }
    }

    const onDelete = (idTrabajo) => {
        // if (!window.confirm('Are you sure to delete this record?'))
        //   return
        setDeleteData(true);
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false
        })

        //console.log(id)
        const nuevaTabla = records.filter(trabajoPorEliminar => trabajoPorEliminar.id !== idTrabajo)
        console.log(nuevaTabla)
        //TrabajoService.deleteTrabajo(idTrabajo);

        setNotify({
          isOpen: true,
          message: 'Borrado Exitoso',
          type: 'success'
        })

    }

    const onView = async (trabajo, id_trabajo) => {

      //
      selectedID = id_trabajo;
      //await localStorage.setItem("localTrabajo", trabajo);
      await localStorage.setItem("id_trabajo", id_trabajo);

      setValues({
        ...trabajo
      })
      //let auxTema = await temaTramiteService.getTemaTramites();

      setDetail(true);
      //this.forceUpdate();
        //tematramiteService.deleteTemaTramite(id_tramite);


  }
  /*Styles*/
  const PaperStyle = { borderRadius: '20x', pb: 4, pt:0.7, px: 0.7, color: "primary.light", elevatio: 0 }
  const SubtitulosTable = { display: "flex" }

	return (
		<>
		  <ContentHeader
            text="Gestión del repositorio de investigación"
            cbo={false}
      />
      <Grid container spacing={2} maxWidth={1}>
        <Grid item xs>
          <Typography variant="body1"> Puedes&nbsp;
            <Link
                style={{ fontSize: '15px', color:"#41B9E4"}}
                href="#"
                underline = "hover"
                variant="button"
                onClick = {() => exportToCSV(vacio, 'Modelo_TrabajoInvestigacion')}
            >
                descargar la plantilla en Excel
            </Link>
              &nbsp;para subir la carga de horario de un determinado curso.
          </Typography>
        </Grid>
        <Grid item xs={3} align="right" m={1}>
          <Controls.Button
            text="Importar"
            size="large"
            endIcon={<CloudUploadOutlinedIcon/>}
            onClick = {() => setOpenPopup(true)}
          />
        </Grid>
      </Grid>
      <Paper variant="outlined" sx={PaperStyle}>
        <Grid container spacing={2} >
            <Grid item xs={isViewActivityMode ? 6 :12} className={classes.collapsible} >

                  <Typography variant="h4" style={SubtitulosTable}>
                        Repositorio de Investigación
                  </Typography>
                  <div style={{display: "flex", paddingRight: "5px", marginTop:20}}>
                    {/* <Toolbar> */}
                    <Controls.Input
                      label="Buscar Trabajos de Investigación por Título"
                      InputProps={{
                          startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            )
                          }}
                      sx={{ width: .75 }}
                      onChange={handleSearch}
                      type="search"
                      />
                      <Controls.AddButton
                        title="Nuevo Trabajo de Investigación"
                        variant="iconoTexto"
                        onClick = {() => {setOpenPopup(true); setRecordForEdit(null)}}
                      />
                        {/* </Toolbar> */}
                  </div>

              <BoxTbl>
              <TblContainer>
                <TblHead />
                  <TableBody>
                  {
                    recordsAfterPagingAndSorting().map(item => (
                      <StyledTableRow key={item.id}>
                        <StyledTableCell >{item.codigo_publicacion}</StyledTableCell>
                        <StyledTableCell >{item.titulo}</StyledTableCell>
                        <StyledTableCell >{item.nombreAutor}</StyledTableCell>
                        <StyledTableCell >{item.anho_publicacion}</StyledTableCell>
                        <StyledTableCell component="a" href={item.url_repositorio.indexOf("http") == 0 ? item.url_repositorio : "http://" + item.url_repositorio }>{item.url_repositorio}</StyledTableCell>
                        <StyledTableCell>
                          <Controls.ActionButton
                            color="warning"
                            onClick={ () => {setOpenPopup(true);setRecordForEdit(item)}}
                          >
                            <EditOutlinedIcon fontSize="small" />
                          </Controls.ActionButton>
                            <IconButton aria-label="delete">
                              <DeleteIcon
                                color="warning"
                                onClick={() => {
                                setConfirmDialog({
                                        isOpen: true,
                                        title: '¿Eliminar este trabajo permanentemente?',
                                        subTitle: 'No es posible deshacer esta accion',
                                        onConfirm: () => {onDelete(item.id)}
                                })
                              }}/>
                              </IconButton>
                              <IconButton aria-label="view">
                                <ContactPage
                                  color="warning"
                                  onClick={() => {
                                    handleChange(item.id);
                                    onView(item, item.id);
                                }}/>
                          </IconButton>
                            </StyledTableCell>
                            </StyledTableRow>
                        ))
                    }
                    </TableBody>
                </TblContainer>

                </BoxTbl>

            </Grid>
            <Divider orientation="vertical" flexItem sx={{marginTop : '20px', mr:"10px", ml:"20px"}} />
            <Grid item xs={5.5} className={isVisible ? classes.visible : classes.hidden} >
                <br></br>
                <br></br>
                <br></br>
                <Typography variant="h4" style={SubtitulosTable} >
                        Detalles del Trabajo de Inpvestigación
                </Typography>
                <div style={{ display: "flex", paddingRight: "5px", marginTop: 20 }}/>
                <GestionTrabajosInvestigacionDetalle values = {values} detail = {detail} setDetail = {setDetail}/>
            </Grid>
        </Grid>
		  </Paper>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title={recordForEdit ? "Editar Trabajo Investigación": "Nueva Trabajo Investigación"}
      >
        <AgregarEditarInvestiga
          addOrEdit={addOrEdit}
          recordForEdit={recordForEdit}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
      <Popup
        openPopup={openPopupCargaMasiva}
        setOpenPopup={setOpenPopupCargaMasiva}
        title="Carga masiva de trabajos de investigación">













        
        <Form onSubmit={handleSubmit}>
            <Grid align="right">
                <label htmlFor="contained-button-file" >
                    <Input accept=".csv,.xlsx,.xls" id="contained-button-file" 
                        type="file" sx={{display: 'none'}} 
                        onChange={handleUploadFile}
                        onClick={onInputClick}
                    />
                    <Controls.Button
                        text="Subir archivo"
                        endIcon={<AttachFileIcon />}
                        size="medium"
                        component="span"
                        align="right"
                    />
                </label>
            </Grid>
            <Paper variant="outlined" sx={PaperStyle}>
                <Typography variant="h4"
                    color="primary.light" style={SubtitulosTable}
                >
                    Vista Previa
                </Typography>
                <BoxTbl>
                    <TblContainer>
                      <colgroup>
                        <col style={{ width: '5%' }} />
                        <col style={{ width: '50%' }} />
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '10%' }} />
                      </colgroup>
                        <TblHead />
                        <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item => (
                            <TableRow>
                                {/*<TableCell
                                align="right"
                                >
                             
                                {item.id}
                                </TableCell>*/}
                                <TableCell>{recordsX ? item.curso.codigo : item.codigo}</TableCell>
                                <TableCell>{recordsX ? item.curso.nombre : item.codigo}</TableCell>
                                <TableCell>{recordsX ? item.codigo : item.codigo}</TableCell>
                                <TableCell>{recordsX ? item.tipo === 0 ? "Clase":"Laboratorio" : item.tipo}</TableCell>
                                <TableCell align = "center">{recordsX ? item.horas_semanales : item.horas_semanales}</TableCell>
                                {/*<TableCell>{recordsX ? item.sesiones_excel : item.sesiones_excel}</TableCell>*/}
                            </TableRow>
                            ))
                        }
                        </TableBody>
                    </TblContainer>
                    <TblPagination />
                </BoxTbl>
            </Paper>
            <Grid cointainer align="right" mt={5}>
                <div>
                    <Controls.Button
                        // disabled={true}
                        variant="disabled"
                        text="Cancelar"
                        /* onClick={resetForm} */
                        />
                    <Controls.Button
                        // variant="contained"
                        // color="primary"
                        // size="large"
                        text="Cargar Datos"
                        /* type="submit" */
                        onClick={actualizarDatos}
                    />
                    
                </div>
            </Grid>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Form>
        


















      </Popup>
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
		</>
	);
}