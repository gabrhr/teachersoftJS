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
  
  //autor

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
      label: 'Código',
      numeric: false,
      sortable: true
    },
    {
      id: 'titulo',
      label: 'Título',
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
        label: 'Año',
        numeric: false,
        sortable: false
    },

    {
        id: 'url_repositorio',
        label: 'Texto Completo',
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
    const [cargaTrabajos, setCargaTrabajos] = useState([])
    const [deleteData, setDeleteData] = useState(false);
    const [createData, setCreateData] = useState(false);
    const [updateData, setUpdateData] = useState(false);
    const [records, setRecords] = useState([]);
    const [record, setRecord] = useState(null);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''});
	  const [detail, setDetail] = useState(false);
    const [isViewActivityMode, setIsViewActivityMode] = useState(true);
    const [isVisible, setIsVisible] = useState(true);
    const [selectedRow, setSelectedRow] = useState(50) //Se tiene que cambiar

    //CSV components
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const exportToCSV = (csvData, fileName) => {
      const ws = XLSX.utils.json_to_sheet(csvData);
      const wb = { Sheets: { 'Trabajo_Investigacion': ws }, SheetNames: ['Trabajo_Investigacion'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], {type: fileType});
      FileSaver.saveAs(data, fileName + fileExtension);
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
        let pos = records.map(function(e) { return e.id; }).indexOf(idTrabajo);
        records.splice(pos,1);
        TrabajoService.deleteDocumento(idTrabajo);
        setDeleteData(true);

        //console.log(id)
        //const nuevaTabla = records.filter(trabajoPorEliminar => trabajoPorEliminar.id !== idTrabajo)
        //console.log(nuevaTabla)
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
      const a = await TrabajoService.documentsByLang();
      console.log(a);
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
                onClick = {() => window.open("https://docs.google.com/spreadsheets/d/1icIuPsGBSd8k3eAF_lFy5x5pAmdVEO7U/edit?usp=sharing&ouid=100344065590955470663&rtpof=true&sd=true")}
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
            onClick = {() => setOpenPopupCargaMasiva(true)}
          />
          {console.log(openPopupCargaMasiva)}
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
                        <StyledTableCell style={{width:'7.5%'}} >{item.codigo_publicacion}</StyledTableCell>
                        <StyledTableCell style={{width:'20%'}} >{item.titulo}</StyledTableCell>
                        <StyledTableCell style={{width:'20%'}} >{item.nombreAutor}</StyledTableCell>
                        <StyledTableCell style={{width:'7.5%'}} >{item.anho_publicacion}</StyledTableCell>
                        <StyledTableCell style={{width:'20%'}} component="a" href={item.url_repositorio.indexOf("http") == 0 ? item.url_repositorio : "http://" + item.url_repositorio }>{item.url_repositorio}</StyledTableCell>
                        <StyledTableCell style={{width:'25%'}}>
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
                                        title: '¿Eliminar ciclo permanentemente?',
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
              <TblPagination/>
              </BoxTbl>
            
            </Grid>
            <Divider orientation="vertical" flexItem sx={{marginTop : '20px', mr:"10px", ml:"20px"}} />
            <Grid item xs={5.5} className={isVisible ? classes.visible : classes.hidden} >
                <br></br>
                <br></br>
                <br></br>
                <Typography variant="h4" style={SubtitulosTable} >
                        Detalles del Trabajo de Investigación
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
          openPopupCargaMasiva={openPopupCargaMasiva}
          setOpenPopupCargaMasiva={setOpenPopupCargaMasiva}
          title="Carga masiva de trabajos de investigación"
      >
          <TrabajosInvestigacion setOpenPopupCargaMasiva={setOpenPopupCargaMasiva} records={records} setRecords={setRecords} setCargaTrabajos = {setCargaTrabajos} 
          cargaTrabajos = {cargaTrabajos}/>
      </Popup>  
      {/* <Notification
        notify={notify}
        setNotify={setNotify}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      /> */}
		</>
	);
}