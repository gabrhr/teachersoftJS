import {useState, useContext, useEffect} from 'react'
import { Grid, Stack, Typography, TableBody, TableRow, TableCell} from '@mui/material';
import InvestigacionService from '../../../services/investigacionService';
import { Controls } from '../../../components/controls/Controls'
import { useForm, Form } from '../../../components/useForm';
import Popup from '../../../components/util/Popup'
import useTable from "../../../components/useTable"
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../../constants/UserContext';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EliminarUnTrabajoInvestigacion from './EliminarUnTrabajoInvestigacion'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditarTrabajoInvestigacion from './EditarTrabajoInvestigacion'

const initialFieldValues = {
    searchText: ''
}

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
      id: 'nombre',
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
const llenarTrabajos = async (anho) => {
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
        "id_autor": trabajoInvestigacion.id_autor,
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
  const {user, setUser, rol, setRol, setToken} = useContext(UserContext)
  const [recordsX, setRecordsX] = useState([])
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
  const SubtitulosTable = {display:"flex"}
  const PaperStyle={ borderRadius: '20px', pb:4,pt:2, px:2, color:"primary.light", elevation:0}
  
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  let permission = 1; 
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
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

  const datosTrabajos = trabajosInvestigacion => {
    const trabajos = []
    trabajosInvestigacion.map(trabajo => (
      trabajos.push({
      
    })
    ));  
    return trabahjos;
  }

  function isNumeric(num){
    return !isNaN(num)
  }

  const validate = obj => {
    return true
  }

  const processData = dataString => {
        
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(
        /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
    );

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
      const trabajos = datosTrabajos(listaCorrectos)

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
  setRecords(recordsX)
  handleClose()
  setOpenPopup(false)
}


  useEffect(() => {
    llenarTrabajos(anho)
    .then (nuevasInvestigaciones =>{
      setRecords(nuevasInvestigaciones);
      setInvestigaciones(records);
    });
  }, [openPopupEdit])

  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
      fn: items => {
        if (target.value === "")
          return items
        else
          // CONSULTAR SOBRE QUE ALMACENA LA X PARA PODER ACCEDER
          // CORRECTAMENTE A LOS VALORES DEL TRABAJO DE INVESTIGACION
          // ---------------------------------------------------------------------
          return items.filter(x => x.curso_ciclo.curso.nombre.toLowerCase()
              .includes(target.value.toLowerCase()))
      }
    })
  }

  // CONSULTAR SOBRE POR QUE EN HorarioCursos.js SE TIENE UN IF ELSE SI EL ROL
  // SE GARANTIZA AL ACCEDER PREVIAMENTE A LA PANTALLA POR DEFECTO
  // ---------------------------------------------------------------------
  const handleClick = e => {
    // VERIFICAR COMO FUNCIONA HISTORY PUSH PARA REDIRIGIRME AL MODAL DE AGREGAR
    // NO DEJAR PASAR
    if(rol === 9){
      history.push("/cord/asignacionCarga/cursos");
    }else{
      console.log("ERROR: NO POSEE EL ROL 9 PARA INGRESAR");
    }
  }

  const guardarIndex = item => {
    setIndexDelete(item)
    setOpenOnePopup(true)
  }

  const eliminarInvestigaciones = () => {
    records.map(item => {
      InvestigacionService.deleteDocumento(item.id);
    })
    setRecords([]);
    setOpenAllPopup(false);
  }

  const handleEdit = async item => {
    const request = await InvestigacionService.getDocumento(item.id);
    setRecordForEdit(request);
    setOpenPopupEdit(true);
  }

  const eliminarInvestigacion = async () =>{
    //Funcion para elimianr la INVESTIGACION seleccionado
    let pos = records.map(function(e) { return e.id; }).indexOf(indexDelete.id);
    records.splice(pos,1);
    pos = 0;
    InvestigacionService.deleteDocumento(indexDelete.id);
    setOpenOnePopup(false)
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
                      <TableCell>{recordsX ? item. : item.codigo}</TableCell>
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
  )
}
