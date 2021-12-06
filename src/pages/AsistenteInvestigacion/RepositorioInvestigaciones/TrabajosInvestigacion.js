import React, { useState } from 'react'
import { Input, Paper, Grid, Typography, TableBody, TableRow, TableCell} from '@mui/material';
import InvestigacionService from '../../../services/investigacionService';
import { Controls } from '../../../components/controls/Controls'
import { Form } from '../../../components/useForm';
import useTable from "../../../components/useTable"
import * as XLSX from 'xlsx'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const tableHeaders = [
  {
    id: 'cod_publicacion',
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
    id: 'autor',
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
    id: 'url',
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

const llenarTrabajosInvestigacion = async (anho) => {
  //PREGUNTAR POR EL USO DEL WINDOW.LOCAL.STORAGE.GETITEM
  if(!anho) anho = await window.localStorage.getItem("anho");
  //------------------------------------------------------------
  const dataInvestigaciones = await InvestigacionService.buscarPorAnho(anho);
  const arrInvestigaciones = [];
  if(!dataInvestigaciones)  {
    console.error("No se puede traer la data del servidor de los trabajos de investigacion")
    return [];
  }
  for (let trabajoInvestigacion of dataInvestigaciones){
    if(trabajoInvestigacion){
      arrInvestigaciones.push({
        "id": trabajoInvestigacion.id,
        "activo": trabajoInvestigacion.activo,
        "fecha_creacion": trabajoInvestigacion.fecha_creacion,
        "fecha_modificacion": trabajoInvestigacion.fecha_creacion,
        "fecha_fin": trabajoInvestigacion.fecha_fin,
        "fecha_inicio": trabajoInvestigacion.fecha_inicio,
        "formato": trabajoInvestigacion.formato,
        "idioma": trabajoInvestigacion.idioma,
        "tipo": trabajoInvestigacion.tipo,
        "url_repositorio": trabajoInvestigacion.url_repositorio,
        "doi": trabajoInvestigacion.doi,
        "isbn": trabajoInvestigacion.isbn,
        "issn": trabajoInvestigacion.issn,
        "anho_publicacion": trabajoInvestigacion.anho_publicacion,
        "ciudad": trabajoInvestigacion.ciudad,
        "codigo_validacion": trabajoInvestigacion.codigo_validacion,
        "divulgacion": trabajoInvestigacion.divulgacion,
        "edicion": trabajoInvestigacion.edicion,
        "editorial": trabajoInvestigacion.editorial,
        "especialidad_unesco": trabajoInvestigacion.especialidad_unesco,
        "filiacion": trabajoInvestigacion.filiacion,
        "identificador_produccion": trabajoInvestigacion.identificador_produccion,
        "indicador_calidad": trabajoInvestigacion.indicador_calidad,
        "medio_publicacion": trabajoInvestigacion.medio_publicacion,
        "motor_busqueda": trabajoInvestigacion.motor_busqueda,
        "nro_revista": trabajoInvestigacion.nro_revista,
        "observaciones_de_departamento": trabajoInvestigacion.observaciones_de_departamento,
        "observaciones_para_departamento": trabajoInvestigacion.observaciones_para_departamento,
        "pagina_final": trabajoInvestigacion.pagina_final,
        "pagina_inicial": trabajoInvestigacion.pagina_inicial,
        "pais": trabajoInvestigacion.pais,
        "palabras_clave": trabajoInvestigacion.palabras_clave,
        "responsabilidad": trabajoInvestigacion.responsabilidad,
        "subtipo_publicacion": trabajoInvestigacion.subtipo_publicacion,
        "tipo_publicacion": trabajoInvestigacion.tipo_publicacion,
        "tipo_referencia": trabajoInvestigacion.tipo_referencia,
        "titulo": trabajoInvestigacion.titulo,
        "validacion_preliminar": trabajoInvestigacion.validacion_preliminar,
        "volumen": trabajoInvestigacion.volumen,
        autor:{
          "id_autor": trabajoInvestigacion.id_autor,
        },
        
        "codigo_publicacion": trabajoInvestigacion.codigo_publicacion,
      })
    }
  }
  return arrInvestigaciones;
}

const actualizarTrabajoAnho = async (trabajo_anho)=> {

  const newTrabajoInvestigacion = {
    
  }
  // FALTA IMPLEMENTAR
  // const request = await InvestigacionService.updateDocumentoAnho(newTrabajoInvestigacion);

}

export default function TrabajosInvestigacion({setOpenPopupCargaMasiva, records, setRecords, setCargaTrabajos, cargaTrabajos}) {
  const [recordsX, setRecordsX] = useState([])
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
  const SubtitulosTable = {display:"flex"}
  const PaperStyle={ borderRadius: '20px', pb:4,pt:2, px:2, color:"primary.light", elevation:0}
  
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  let permission = 1; 
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  }

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
    BoxTbl
  } = useTable(recordsX, tableHeaders, filterFn);

  const onInputClick = (event) => {
    event.target.value = ''
  }

  const datosTrabajosInvestigacion = trabajosInvestigacion => {
    const trabajos = []
    trabajosInvestigacion.map(trabajo => (
      trabajos.push({
      
    })
    ));  
    return trabajos;
  }

  const validate = columnas => {
    // COD_FINAL_PUBLICACION esta compuesto de 123-ABC, es necesario verificar cada parte
    let observaciones = [];
    let codigo=columnas.Codigo.split("-");
    let numPublicacion = codigo[0];
    let codRevisor = codigo[1];
    let codRevisorLength=3;
    if(columnas.Codigo === "" || codigo.length === columnas.Codigo.length || isNaN(numPublicacion) || codRevisor.length != codRevisorLength) observaciones.push("Codigo");
    if(columnas.Titulo === "") observaciones.push("Titulo");
    // El autor es dado en el formato APELLIDO, NOMBRE
    let autor=columnas.Codigo.split(",");
    if(columnas.Autor === "" || autor.length === columnas.Autor.length) observaciones.push("Autor");
    if(columnas.Periodo === "" || isNaN(columnas.Periodo)) observaciones.push("Periodo");
    // Una URL posee una extension, en caso no se haya asignado, debe de colocarse el enunciado "Sin imagen"
    let extension = (columnas.URL.split('.')).pop();
    let extensionMaxLength = 4;
    // Consultar sobre si existirá la posibilidad de que por defecto si no se asigna un pdf se guarda como Sin imagen
    if(columnas.URL === "" || extension > extensionMaxLength) observaciones.push("URL");
    return observaciones;
  }

  const processData = dataString => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(
        /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
    );

    let list = [], rowWithData = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(
          /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
      );
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
        if (Object.values(obj).filter(x => x).length > 0) {
          list.push(obj);
          rowWithData.push(i+1);
        }
      }
    }

    const columns = headers.map(c => ({name: c, selector: c}));

    let reporteIncidencias=[], indexErrors = [];
    let filaIncidencias;

    for(let j = 0; j < list.length; j++){
      filaIncidencias = validate(list[j]);
      if(filaIncidencias.length > 0){
        reporteIncidencias.push(`Error en fila ${rowWithData[j]} en los siguientes campos: ${filaIncidencias}`);
        indexErrors.push(j);
      }
    }
    // Creamos un arreglo con los objetos a eliminar
    let listObjIncidencias = indexErrors.map(i => list[i]);
    // Filtramos los datos de la lista de objetos
    list = list.filter(n => !listObjIncidencias.includes(n));
    console.log("Lista de horarios a subir", list);
    console.log("Reporte de incidencias: ", reporteIncidencias);

    
    setData(list);
    setColumns(columns);

    let listaCorrectos = []
    for (let i = 0; i < list.length; i++) {
        listaCorrectos.push(list[i])
    }

    const trabajos = datosTrabajosInvestigacion(listaCorrectos)
    setRecordsX(prevRecords => prevRecords.concat(trabajos));
  };

  const handleUploadFile = e => {
    try {
      const file = e.target.files[0];
      let extension = file.name.split('.')
      if(extension[extension.length - 1] !== "xlsx" && extension[extension.length - 1] !== "xls"){
        alert("Solo se pueden importar archivos .xlsx y .xls")
        return
      }
      const reader = new FileReader();
      reader.onload = evt => {
          const bstr = evt.target.result;
          const wb = XLSX.read(bstr, { type: 'binary' });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
          processData(data);
      };
      reader.readAsBinaryString(file);
    } catch (error) {
      console.log(error);
    }
  };

// FALTA IMPLEMENTAR FUNCION ACTUALIZARDATOS
const actualizarDatos = async e => { 
  // e.preventDefault();
  // permission = 0;
  // let otroHorario = 1;
  // let newRecords = [];
  // let postHorario = {}; //Para poder usar el horario en una segunda vuelta
  // //Servicio para cargar los horarios
  // for (let hor of recordsX) {
  //   const resultArray = await llenarTrabajosInvestigacion(otroHorario, postHorario, hor);
  //   otroHorario = resultArray[0];
  //   postHorario = resultArray[1];
  //   //Loop finished
    
  //   if(otroHorario === 1)  {
  //     console.log(postHorario);
  //     const resultado = await horarioService.registerHorario(postHorario)
  //     if(resultado){
  //       console.log("Todo bien");
  //       await actualizarCursoCiclo(postHorario.curso_ciclo);
  //     }
  //     newRecords.push(resultado);
  //   }
  // }
  // permission = 1;
  // //LOADING - BLOQUEO DE ACTIVIDAD - CLICK BOTON CARGAR DATOS SE CAMBIA EL MODAL Y SE PONE UN LAODER...
  // if(permission)  {
  //   setOpenPopupCargaMasiva(false);
  //   newRecords = await horDataRecords(newRecords);
  //   console.log(newRecords);
  //   for(let nr of newRecords){
  //     await setRecords(oldRecords => [...oldRecords, nr]);
  //   }
  //   console.log(records);
  //   await setCargaTrabajos(records);
  // }
}

const handleSubmit = e => {
  e.preventDefault()
  setRecords(recordsX)
  handleClose()
  setOpenPopupCargaMasiva(false)
}

  return (
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
              <col style={{ width: '7.5%' }} />
              <col style={{ width: '40%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '7.5%' }} />
              <col style={{ width: '20%' }} />
            </colgroup>
            <TblHead />
            <TableBody>
              {
                recordsAfterPagingAndSorting().map(item => (
                <TableRow>
                  <TableCell>{recordsX ? item.curso.codigo : item.codigo}</TableCell>
                  <TableCell>{recordsX ? item : item.codigo}</TableCell>
                  <TableCell>{recordsX ? item.id_autor : item.codigo}</TableCell>
                  <TableCell>{recordsX ? item.anho_publicacion === 0 ? "Clase":"Laboratorio" : item.tipo}</TableCell>
                  <TableCell align = "center">{recordsX ? item.horas_semanales : item.horas_semanales}</TableCell>
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
            text="Cancelar"
            variant="disabled"
          />
          <Controls.Button
            text="Cargar Datos"
            disabled = {permission && recordsX.length ? false : true}
            onClick={actualizarDatos}
          />
        </div>
      </Grid>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        openModal={openModal}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Form>
  )
}
