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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


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

export default function CargaMasivaDocente({setOpenPopUp, records, setRecords, setCargaH, cargaH}) {
    const [recordsX, setRecordsX] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const SubtitulosTable={display:"flex"}
    const PaperStyle={ borderRadius: '20px', pb:4,pt:2, px:2, 
    color:"primary.light", elevatio:0, marginTop: 3}

    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    
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
      const  user = JSON.parse(localStorage.getItem("user"))

      const docentes = []
      listDocentes.map(doc => (
        docentes.push({
          "foto_URL": 'static/images/avatar/1.jpg',
          "nombres": doc.Nombres,
          "apellidos": doc.Apellidos,
          "tipo_persona": 1,
          "tipo_docente": doc.Tipo_Docente === "TC" ? 1 : (doc.Tipo_Docente === "TPC" ? 2 : (doc.Tipo_Docente === "TPA" ? 3 : 0)) , //Agregar al excel
          "seccion": {
              "id": user.persona.seccion.id,
              "nombre": doc.Sección,
          },
          "departamento": {
              "id": user.persona.departamento.id,
              "unidad": {
                  "id": 1,
              }
          },
          "correo_pucp": doc.Correo,
          "telefono": doc.Teléfono,
          "codigo_pucp": doc.Código,
          "numero_documento": doc.Documento,
          "tipo_documento": 0
        
      })
      ));
      return docentes;
    }

    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    function isNumeric(num){
      return !isNaN(num)
    } 

    const validate = (obj) => {
      if(obj.Nombres === ""){
        alert("Error en la plantilla - Campo Nombres")
        return false
      }
      if(obj.Apellidos === ""){
        alert("Error en la plantilla - Campo Apellidos")
        return false
      }
      if(obj.Sección === ""){
        alert("Error en la plantilla - Campo Sección")
        return false
      }
      if (!validateEmail(obj.Correo) || obj.Correo === "") {
        alert("Error en la plantilla - Campo Correo")
        return false
      }
      if(!isNumeric(obj.Código) || obj.Código.length !== 8 || obj.Código === ""){
        alert("Error en la plantilla - Campo Código")
        return false
      }
      if(!isNumeric(obj.Documento) || obj.Documento.length !== 8 || obj.Documento === ""){
        alert("Error en la plantilla - Campo numero_documento")
        return false
      }
      if(!isNumeric(obj.Teléfono) || (obj.Teléfono.length !== 9 && obj.Teléfono.length !== 7) || obj.telefono === ""){
        alert("Error en la plantilla - Campo telefono")
        return false
      }
      return true
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
                if(!validate(obj)){
                  return
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
    let permission = 1; //Tenemos el permiso de registrar nuevo horario

    const actualizarDatos = async e => { 
      permission = 0;
      //Servicio para cargar los docentes
      console.log("Lista de docentes del excel:", recordsX)
      for (let doc of recordsX) {
          if(personaService.registerPersona(doc))
            permission = 1;

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
                                    {item.foto_URL !== ("static/images/avatar/1.jpg" || "") 
                                      ? <img height = "125%" width = "125%" text-align ="center" src={item.foto_URL} alt=""></img>
                                      :  <AccountCircleIcon/>}
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
