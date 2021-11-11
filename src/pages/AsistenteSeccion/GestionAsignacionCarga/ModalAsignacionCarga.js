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
    /*{
      id: 'id',
      label: 'SeccionID',
      numeric: true,
      sortable: true
    },*/
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
        sortable: true
     },
     {
        id: 'tipoSesion',
        label: 'Tipo',
        numeric: false,
        sortable: true
     },
    {
      id: 'cargaHoraria',
      label: 'Carga Horaria',
      numeric: false,
      sortable: true
    },
]

async function llenarDatosHorarios (otroHorario, postHorario, hor) {
  if(otroHorario === 1){  //Si otorHorario = 1 - entonces si es nuevo horario
    //const dataSes = await horarioService.convertStringtoSesion(hor.sesiones_excel);
    console.log(hor.curso.codigo)
    await cursoService.getCursoCicloxCicloxCodigoNombre(hor.ciclo.id, hor.curso.codigo)
      .then(request => {
        postHorario = {
          "codigo": hor.codigo,
          "curso_ciclo":{
            "id": request[0].id
          },
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

    postHorario.sesiones.push({
      "secuencia": hor.tipo,
      "horas": parseFloat(hor.horas_semanales), //Hora del tipo de sesion [clase - 3 horas: teorico]
    })
    otroHorario = 1;  //El siguiente item a leer si será otro Horario
  }
  console.log(postHorario);
  return [otroHorario, postHorario];
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


    const processData = dataString => {
        
        const dataStringLines = dataString.split(/\r\n|\n/);
        const headers = dataStringLines[0].split(
            /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
        );
          //PROCESAMIENTO DE LA DATA EN LA TABLA
        let list = [];
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

                // remove the blank rows
                if (Object.values(obj).filter(x => x).length > 0) {
                    list.push(obj);
                }
            }
        }

        // prepare columns list from headers
        const columns = headers.map(c => ({
            name: c,
            selector: c
        }));

        //console.log(list)
        setData(list);
        setColumns(columns);

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
            //console.log(file)
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
      let otroHorario = 1;
      let permission = 1;
      let postHorario = {}; //Para poder usar el horario en una segunda vuelta
      //Servicio para cargar los horarios
      for (let hor of recordsX) {
        const resultArray = await llenarDatosHorarios(otroHorario, postHorario, hor);
        otroHorario = resultArray[0];
        postHorario = resultArray[1];
        //Loop finished
        
        if(otroHorario === 1)  {
          if(horarioService.registerHorario(postHorario))
            permission = 0;
        }
      };
      //LOADING - BLOQUEO DE ACTIVIDAD - CLICK BOTON CARGAR DATOS SE CAMBIA EL MODAL Y SE PONE UN LAODER...
      if(permission)  {
        setRecords(recordsX);
        setCargaH(records);
      }
      setOpenPopup(false) 
      console.log(postHorario);
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
                                <TableCell>{recordsX ? item.horas_semanales : item.horas_semanales}</TableCell>
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
    )
}
