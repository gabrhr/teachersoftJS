import { Avatar, Grid, InputAdornment, ListItem, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import React, {useState} from 'react'
import { Controls } from '../../../components/controls/Controls'
import Popup from '../../../components/util/Popup'
import useTable from "../../../components/useTable"
import ContentHeader from '../../../components/AppMain/ContentHeader';
import { Input, Stack, Paper} from '@mui/material';
import * as XLSX from 'xlsx'
/* ICONS */
import { useForm, Form } from '../../../components/useForm';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { set } from 'date-fns';
import personaService from '../../../services/personaService';
import cursoService from '../../../services/cursoService';

const tableHeaders = [
    {
      id: 'docente',
      label: 'Docente',
      numeric: false,
      sortable: true
    },
    {
      id: 'especialidad',
      label: 'Especialidad',
      numeric: false,
      sortable: false
    },
    {
      id: 'datos',
      label: 'Datos',
      numeric: false,
      sortable: true
    }
    /* {
      id: 'bono',
      label: 'Bonos',
      numeric: false,
      sortable: false
    } */
]

async function llenarDatosHorarios (otroHorario, postHorario, hor) {
  if(otroHorario === 1){  //Si otorHorario = 1 - entonces si es nuevo horario
    //const dataSes = await horarioService.convertStringtoSesion(hor.sesiones_excel);
    console.log(hor.curso.codigo)
    await cursoService.getCursosxCodigoNombre(hor.curso.codigo)
      .then(request => {
        postHorario = {
          "codigo": hor.codigo,
          //"tipo_sesion_excel": hor.tipo, //Si es clase es 0 - si es laboratorio 1
          //MEJOR MANEJEMOSLO ASI - CON LAS HORAS SEPARADAS POR EL TIPO DE HORARIO
          //"horas_semanales": parseFloat(hor.horas_semanales), //Horas_semanales: cargaHoraria
          ciclo:{
            //"id":AGARRADO DESDE LA SELECCION DE CICLOS - SU ID
            "id": hor.ciclo.id,
          },
          curso:{
            "id": request[0].id,
          },
          /*
          unidad:{
            "id": request_uni[0].id,
          }
          */
          //"sesiones_excel": hor.sesiones_excel,
          //teorico - carga_horaria: suma de horas_sesiones 
          sesiones:[{
            "secuencia": hor.tipo,
            //"sesiones_dictado": null,
              //"persona": - es uno de los docente - es un objeto - objeto persona
              //"hora_sesion_docente:" - lo que dicta este docente - entero 
            "horas": parseFloat(hor.horas_semanales), //Hora del tipo de sesion [clase - 3 horas: teorico]
          }]
        }
        //Analizamos si el siguiente item es el mismo horario pero otro tipo
        otroHorario = 0; // Entonces cambiamos el valor a 0 - para continuar en la siguiente i
        //horarioService.registerHorario(postHorario);
      })
  }
  
  else{ //Caso en que no es otro Horario el que se lee- se actualiza [].sesion
    //const dataSes = horarioService.convertStringtoSesion(hor.sesiones_excel);

    postHorario.sesiones.push({
      "secuencia": hor.tipo,
      //"sesiones_dictado": null,
        //"persona": - es uno de los docente - es un objeto - objeto persona
        //"hora_sesion_docente:" - lo que dicta este docente - entero 
      "horas": parseFloat(hor.horas_semanales), //Hora del tipo de sesion [clase - 3 horas: teorico]
    })
    otroHorario = 1;  //El siguiente item a leer si será otro Horario
  }
  //console.log(postHorario);
  return [otroHorario, postHorario];
}

export default function CargaMasivaDocente({setOpenPopUp, records, setRecords, setCargaH, cargaH}) {
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

    const datosDocente = listDocentes => {
      //const dataSesiones = defragmentarSesiones(listHorarios);
      const docentes = []
      listDocentes.map(doc => (
        docentes.push({
          "foto_URL": doc.foto_URL ? doc.foto_URL : 'static/images/avatar/1.jpg',
          "nombres": doc.nombres,
          "apellidos": doc.apellidos,
          "tipo_persona": 1,
          "tipo_docente": doc.tipo_docente ? doc.tipo_docente: 0, //Agregar al excel
          "seccion": {
              "id": 3,
              "nombre": doc.seccion_nombre,
          },
          "departamento": {
              "id": 3,
              "unidad": {
                  "id": 1,
              }
          },
          "correo_pucp": doc.correo_pucp,
          "telefono": doc.telefono,
          "codigo_pucp": doc.codigo_pucp,
          "numero_documento": doc.numero_documento,
          "tipo_documento": 0
        
      })
      ));
      return docentes;
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
        const docentes = datosDocente(listaCorrectos)
        console.log(docentes)

        setRecordsX(prevRecords => prevRecords.concat(docentes));
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
      let permission = 1;
      //Servicio para cargar los docentes
      console.log("Lista de docentes del excel")
      for (let doc of recordsX) {
          if(personaService.registerPersona(doc))
            permission = 0;
      };
      //LOADING - BLOQUEO DE ACTIVIDAD - CLICK BOTON CARGAR DATOS SE CAMBIA EL MODAL Y SE PONE UN LAODER...
      if(permission)  {
        setRecords(recordsX);
        setCargaH(records);
      }
      setOpenPopUp(false)
    }
    
    const handleSubmit = e => {
      e.preventDefault()
        //UNA VEZ SE SUBA - VAMOS A PROCEDER A REALIZAR LA INSERCION
        //horarioService.registerDepartamento(recordsX);
        // if (validate())
        //window.localStorage.setItem("listHorario", recordsX);
        setRecords(recordsX)
        handleClose()
        setOpenPopUp(false) 
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
                        <TableRow key={item.id} >
                            <TableCell>
                            <Grid container>
                                <Grid item pl={.5}>
                                <Avatar>
                                    <img height = "125%" width = "125%" text-align ="center" src={item.foto_URL} alt=""></img>
                                </Avatar>
                                </Grid>
                                <Grid item sm>
                                    <Typography sx={{paddingLeft:2.5}}>
                                        {`${item.apellidos}, ${item.nombres}`}
                                    </Typography>
                                    <div style={{paddingLeft:20}}>
                                        Código PUCP: {item.codigo_pucp}
                                    </div>
                                    <div style={{paddingLeft:20}}>
                                        DNI: {item.numero_documento}
                                    </div>
                                </Grid>
                            </Grid>
                            </TableCell>
                            <TableCell>
                                <Typography >
                                    {item.seccion.nombre}
                                </Typography>
                                <div >
                                    {(item.tipo_docente === "0") ? "No asignado" : 
                                     (item.tipo_docente === "1") ? "Docencia a tiempo completo" :
                                     (item.tipo_docente === "2") ? "Docencia a tiempo parcial convencional" :
                                                                 "Docencia a tiempo parcial por asignaturas"
                                    }
                                </div>
                            </TableCell>
                            <TableCell>
                                <Typography >
                                    Correo: {item.correo_pucp}
                                </Typography>
                                <div >
                                    Teléfono: {item.telefono}
                                </div>
                            </TableCell>
                            {/* <TableCell>{item.bono}</TableCell> */}
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
