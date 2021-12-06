import React, {useState} from 'react'
import { Controls } from '../../../components/controls/Controls'
import Popup from '../../../components/util/Popup'
import useTable from "../../../components/useTable"
import ContentHeader from '../../../components/AppMain/ContentHeader';
import { Input, Grid, Stack, Paper, TableBody, TableRow, TableCell,InputAdornment } from '@mui/material';
import * as XLSX from 'xlsx'
/* ICONS */
import { Typography } from '@mui/material'
import { useForm, Form } from '../../../components/useForm';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { set } from 'date-fns';
import horarioService from '../../../services/horarioService';
import cursoService from '../../../services/cursoService';

const tableHeaders = [
    {
      id: 'claveCurso',
      label: 'Clave',
      numeric: false,
      sortable: true
    },
    {
      id: 'nombreCurso',
      label: 'Nombre',
      numeric: false,
      sortable: true
    },
    {
        id: 'horario',
        label: 'Horario',
        numeric: false,
        sortable: false
     },
     {
        id: 'tipoSesion',
        label: 'Tipo',
        numeric: false,
        sortable: false
     },
    {
      id: 'horas',
      label: 'Horas',
      numeric: false,
      sortable: false
    },
]

async function llenarDatosHorarios (otroHorario, postHorario, hor) {
  if(otroHorario === 1){  //Si otorHorario = 1 - entonces si es nuevo horario
    //const dataSes = await horarioService.convertStringtoSesion(hor.sesiones_excel);
    await cursoService.getCursoCicloxCicloxCodigoNombre(hor.ciclo.id, hor.curso.codigo)
      .then(request => {
        postHorario = {
          "codigo": hor.codigo,
          "curso_ciclo": request[0],
          sesiones:[{
            "secuencia": hor.tipo,
            "horas": parseFloat(hor.horas_semanales), //Hora del tipo de sesion [clase - 3 horas: teorico]
          }]
        }
        otroHorario = 0; // Entonces cambiamos el valor a 0 - para continuar en la siguiente i
      })
  }
  
  else{ //Caso en que no es otro Horario el que se lee- se actualiza [].sesion
    //const dataSes = horarioService.convertStringtoSesion(hor.sesiones_excel);
    if(hor.tipo === 1)  //Solo si es laboratorio- sino no se ingresa
      postHorario.sesiones.push({
        "secuencia": hor.tipo,
        "horas": parseFloat(hor.horas_semanales), //Hora del tipo de sesion [clase - 3 horas: teorico]
      })
    otroHorario = 1;  //El siguiente item a leer si será otro Horario
  }
  return [otroHorario, postHorario];
}

const actualizarCursoCiclo = async (curso_ciclo)=> {

    const newCC = {
      "id": curso_ciclo.id,
      "ciclo": {
        "id": curso_ciclo.ciclo.id,
      },
      "curso": {
        "id": curso_ciclo.curso.id,
      },
      "estado_curso": 1, //Se actualiza al nuevo estado - con horarios
      "cantidad_horarios": curso_ciclo.cantidad_horarios +1, //Se actualiza al nuevo estado - con horarios
      "estado_tracking": curso_ciclo.estado_tracking,
    }
    
    const request = await cursoService.updateCursoCiclo(newCC);

}

const horDataRecords = (dataHor) => {
  const horarios = [];
  for (let hor of dataHor){
      if(hor.curso_ciclo){
      horarios.push({
        "id": hor.id,
        "codigo": hor.codigo,
        "tipo": hor.sesiones[0].secuencia,
        "horas_semanales": hor.sesiones[1] ? hor.sesiones[0].horas + hor.sesiones[1].horas: hor.sesiones[0].horas, 
        "curso_ciclo":{
          "id": hor.curso_ciclo.id,
          ciclo:{
            "id": hor.curso_ciclo.ciclo.id,
          },
          curso:{
            "id": hor.curso_ciclo.curso.id,
            "codigo": hor.curso_ciclo.curso.codigo,
            "nombre": hor.curso_ciclo.curso.nombre,
            "creditos": hor.curso_ciclo.curso.creditos,
            "unidad": hor.curso_ciclo.curso.unidad,
            "facultad": (hor.curso_ciclo.curso.seccion.departamento.unidad) ? hor.curso_ciclo.curso.seccion.departamento.unidad.nombre : '-',
          },
        },
        sesiones:{
          "secuencia": hor.sesiones[0].secuencia,
          "sesiones_dictado": [],
          "hora_sesion": hor.sesiones[0].horas,
        },
      })
      //Si existe un segundo horario - lo vamos a meter - no pueden haber más de 2 horarios.
      if(hor.sesiones[1]){
        //const sesion2 = await HorarioService.convertSesiontoString(hor.sesiones[1].dia_semana,  hor.sesiones[1].hora_inicio, hor.sesiones[1].media_hora_inicio,  hor.sesiones[1].hora_fin, hor.sesiones[1].media_hora_fin);
        //console.log(sesion2);
        horarios.push({
          "id": hor.id,
          "codigo": hor.codigo,
          "tipo": hor.sesiones[0].secuencia,
          "horas_semanales": hor.sesiones[1] ? hor.sesiones[0].horas + hor.sesiones[1].horas: hor.sesiones[0].horas, 
          "curso_ciclo":{
            "id": hor.curso_ciclo.id,
            ciclo:{
              "id": hor.curso_ciclo.ciclo.id,
            },
            curso:{
              "id": hor.curso_ciclo.curso.id,
              "codigo": hor.curso_ciclo.curso.codigo,
              "nombre": hor.curso_ciclo.curso.nombre,
              "creditos": hor.curso_ciclo.curso.creditos,
              "unidad": hor.curso_ciclo.curso.unidad,
              "facultad": (hor.curso_ciclo.curso.seccion.departamento.unidad) ? hor.curso_ciclo.curso.seccion.departamento.unidad.nombre : '-',
            },
          },
          sesiones:{
            "secuencia": hor.sesiones[1].secuencia,
            "sesiones_dictado": [],
            "hora_sesion": hor.sesiones[1].horas,
          },
        })
      }
    }//FIN DE LA VERIFICACION
  }
  console.log(horarios);
  return horarios;
}



export default function ModalAsignacionCarga({setOpenPopup, records, setRecords, setCargaH, cargaH}) {
    let auxHorario
    //const {horario, getHorario, isNewFile } = props    
    const [xFile, setXFile] = useState('');
    const [recordsX, setRecordsX] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const SubtitulosTable={display:"flex"}
    const PaperStyle={ borderRadius: '20px', pb:4,pt:2, px:2, 
    color:"primary.light", elevatio:0, marginTop: 3}

    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [usuarios, setUsuarios] = useState(null)
    const [usuariosIncorrectos, setUsuariosIncorrectos] = useState(null)
    
    let permission = 1; //Tenemos el permiso de registrar nuevo horario

    const [open, setOpen] = useState(false);
    const handleClose = () => {
      setOpen(false);
    }
    const handleToggle = () => {
      setOpen(!open);
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
/*
    const defragmentarSesiones = listHorarios =>{
      const dataSesiones = {
        "secuencia": 0,
        "dia_semana": 1,
        "hora_inicio": 12,
        "media_hora_inicio": 0,
        "hora_fin": 15,
        "media_hora_fin": 1
      }
      
      return dataSesiones;
    }
*/
    const datosHorarios = listHorarios => {
      //const dataSesiones = defragmentarSesiones(listHorarios);
      const horarios = []
      listHorarios.map(hor => (
        horarios.push({
        "codigo": hor.Horario,
        "tipo": hor.Tipo === "Clase" ? 0 : 1, //Si es clase es 0 - si es laboratorio 1
        //MEJOR MANEJEMOSLO ASI - CON LAS HORAS SEPARADAS POR EL TIPO DE HORARIO
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
      return horarios;
    }

    function isNumeric(num){
      return !isNaN(num)
    } 

    const validate = obj => {
      // console.log(obj);
      let observaciones = [];
      if(obj.Clave === "" || obj.Clave.length !== 6) observaciones.push("Clave");
      if(obj.Horario === "" || obj.Horario.length !== 4) observaciones.push("Horario");
      if(!isNumeric(obj.Horas) || obj.Horas === "") observaciones.push("Horas");
      if(obj.Nombre === "") observaciones.push("Nombre");
      if(obj.Tipo === "") observaciones.push("Tipo");
      return observaciones;
    }

    const processData = dataString => {
        
        const dataStringLines = dataString.split(/\r\n|\n/);
        const headers = dataStringLines[0].split(
            /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
        );
        //PROCESAMIENTO DE LA DATA EN LA TABLA
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
                    // console.log(list);
                    rowWithData.push(i+1);
                }
            }
        }

        const columns = headers.map(c => ({
            name: c,
            selector: c
        }));

        let reporteIncidencias=[], indexErrors = [];
        let filaIncidencias;
        for(let j = 0; j < list.length; j++){
          filaIncidencias = validate(list[j]);
          if(filaIncidencias.length > 0){
            console.log(`Error en fila ${rowWithData[j]} en los siguientes campos: ${filaIncidencias}`)
            reporteIncidencias.push(`Error en fila ${rowWithData[j]} en los siguientes campos: ${filaIncidencias}`);
            indexErrors.push(j);
          }
        }
        // Creamos un arreglo con los objetos a eliminar
        let listObjIncidencias = indexErrors.map(i => list[i]);
        // Filtramos los datos de la lista de objetos
        list = list.filter(n => !listObjIncidencias.includes(n));
        console.log("Reporte de incidencias: ", reporteIncidencias);

        //console.log(list)
        setData(list);
        setColumns(columns);

        //PARA QUE SIRVE ESTO???????????????????????? NO BASTARIA CON LIST?????
        //let listaIncorrectos = []
        let listaCorrectos = []

        for (let i = 0; i < list.length; i++) {
            listaCorrectos.push(list[i])
        }

        //Hacemos el paso de los datos a un objeto
        const horarios = datosHorarios(listaCorrectos)

        setRecordsX(prevRecords => prevRecords.concat(horarios));
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
                /* Parse data */
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                /* Get first worksheet */
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                /* Convert array of arrays */
                const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
                processData(data);
            };
            reader.readAsBinaryString(file);

        } catch (error) {
            console.log(error);
        }
    };

    const actualizarDatos = async e => { 
      e.preventDefault();
      permission = 0;
      let otroHorario = 1;
      let newRecords = [];
      let postHorario = {}; //Para poder usar el horario en una segunda vuelta
      //Servicio para cargar los horarios
      for (let hor of recordsX) {
        const resultArray = await llenarDatosHorarios(otroHorario, postHorario, hor);
        otroHorario = resultArray[0];
        postHorario = resultArray[1];
        //Loop finished
        
        if(otroHorario === 1)  {
          console.log(postHorario);
          const resultado = await horarioService.registerHorario(postHorario)
          if(resultado){
            console.log("Todo bien");
            await actualizarCursoCiclo(postHorario.curso_ciclo);
          }
          newRecords.push(resultado);
        }
      }
      permission = 1;
      //LOADING - BLOQUEO DE ACTIVIDAD - CLICK BOTON CARGAR DATOS SE CAMBIA EL MODAL Y SE PONE UN LAODER...
      if(permission)  {
        setOpenPopup(false);
        newRecords = await horDataRecords(newRecords);
        console.log(newRecords);
        for(let nr of newRecords){
          await setRecords(oldRecords => [...oldRecords, nr]);
        }
        console.log(records);
        await setCargaH(records);
      }
       /*  setRecords(employeeService.getAllEmployees()) */
    }
    
    const handleSubmit = e => {
      e.preventDefault()
        //UNA VEZ SE SUBA - VAMOS A PROCEDER A REALIZAR LA INSERCION
        //horarioService.registerDepartamento(recordsX);
        // if (validate())
        //window.localStorage.setItem("listHorario", recordsX);
        setRecords(recordsX)
        handleClose()
        setOpenPopup(false) 
       /*  setRecords(employeeService.getAllEmployees()) */
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
                        disabled = {permission && recordsX.length ? false : true}
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
    )
}
