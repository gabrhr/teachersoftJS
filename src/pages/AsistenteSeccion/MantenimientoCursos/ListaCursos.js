import React, {useState} from 'react'
import { Grid, Stack, Typography } from '@mui/material';
import { DT } from '../../../components/DreamTeam/DT'
import CursoService from '../../../services/cursoService';
import { formatHorario, formatHorarioCursos } from '../../../components/auxFunctions';
import { Controls } from '../../../components/controls/Controls'
import { useForm, Form } from '../../../components/useForm';
import Popup from '../../../components/util/Popup'
import useTable from "../../../components/useTable"
import ContentHeader from '../../../components/AppMain/ContentHeader';
import { useHistory } from 'react-router-dom'
import { Box, Paper, TableBody, TableRow, TableCell,InputAdornment } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../../../components/controls/StyledTable';

/* ICONS */
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import moment from 'moment';
import EliminarCurso from './EliminarCurso'
import EliminarCursos from './EliminarCursos'
import AgregarCurso from './AgregarCurso.js'
import EditarCurso from './EditarCurso.js'

const initialFieldValues = {
    searchText: ''
}

const tableHeaders = [
    {
      id: 'claveCurso',
      label: 'Clave',
      numeric: false,
      sortable: true
    },
    {
      id: 'nombre',
      label: 'Nombre',
      numeric: false,
      sortable: true
    },
    {
        id: 'facultad',
        label: 'Facultad',
        numeric: false,
        sortable: true
    },
    {
      id: 'creditos',
      label: 'Créditos',
      numeric: false,
      sortable: true
    },
    {
        id: 'fechaModificación',
        label: 'Fecha Modificación',
        numeric: false,
        sortable: true
     },
     {
      id: 'actions',
      label: 'Acción',
      numeric: false,
      sortable: false
    }
]

const fillCursos = async () => {
  const dataCur = await CursoService.getCursosxSeccionCodigoNombre(JSON.parse(window.localStorage.getItem("user")).persona.seccion.id,"");
  //dataSecc → id, nombre,  fechaFundacion, fechaModificacion,nombreDepartamento
  //const horarios = [];
  
  if(!dataCur)  {
    console.error("No se puede traer la data del servidor de los cursos")
    return [];
  }
  
  const cursos = []
  for(let cur of dataCur){
    cursos.push({
      id: cur.id,
      codigo: cur.codigo,
      creditos: cur.creditos,
      nombre: cur.nombre,
      seccion: cur.seccion,
      fecha_modificacion: cur.fecha_modificacion,
      unidad: (cur.unidad !== null) ? cur.unidad : {id: 0},
      idUnidad: (cur.unidad !== null) ? cur.unidad.id : 0
    });
  }

  return cursos;
}

export default function ListaCursos({records, setRecords}) {
    //let hors = (window.localStorage.getItem('listHorario'))
    //const {getHorario, horario, setHorario, isNewFile } = props
    const [openAddPopup, setOpenAddPopup] = useState(false);
    const [openEditPopup, setOpenEditPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openOnePopup, setOpenOnePopup] = useState(false)
    const [openAllPopup, setOpenAllPopup] = useState(false)
    const [indexDelete, setIndexDelete] = useState(-1)
    const [indexEdit, setIndexEdit] = useState(-1)
    const SubtitulosTable={display:"flex"}
    const PaperStyle={ borderRadius: '20px', pb:4,pt:2, px:2, 
    color:"primary.light", elevatio:0}
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records, tableHeaders, filterFn);
    const {
        // values,
        // setValues,
        handleInputChange
    } = useForm(initialFieldValues);

    React.useEffect(() => {
      fillCursos()
      .then (newCur =>{
        setRecords(newCur);
        console.log(newCur);
      });
    }, [])

    //console.log(records);
    //console.log(indexDelete);

    const handleSearch = e => {
        let target = e.target;
        /* React "state object" (useState()) doens't allow functions, only
         * objects.  Thus the function needs to be inside an object. */
        setFilterFn({
          fn: items => {
            if (target.value === "")
              /* no search text */
              return items
            else
              return items.filter(x => x.nombre.toLowerCase()
                  .includes(target.value.toLowerCase()))
          }
        })
      }

    const guardarIndex = item => {
      setIndexDelete(records.indexOf(item))
      setOpenOnePopup(true)
    }

    const guardarIndexforEdit = item => {
      setIndexEdit(records.indexOf(item))
      console.log(item.id , "equivale a: ", indexEdit);
      setOpenEditPopup(true)
    }

    const eliminarCursos = () =>{
      records.map(item => {
        CursoService.deleteCurso(item.id);
      })
      setRecords([])
      setOpenAllPopup(false)
    }

    const agregarCurso = async (newCurso) =>{
      //Agregamos el curso
      const rpta = await CursoService.registerCurso(newCurso);
      if(rpta !== "Error") {
        console.log(rpta);
        const cursoNew = await CursoService.getCursosxCodigoNombre(newCurso.codigo);
        let newCursoX = {
          "id": cursoNew[0].id,
          "codigo": cursoNew[0].codigo,
          "nombre": cursoNew[0].nombre,
          "creditos": parseFloat(cursoNew[0].creditos),
          "seccion": cursoNew[0].seccion,
          "unidad": cursoNew[0].unidad,
          "idUnidad": cursoNew[0].unidad.id
        }
        setRecords(prevRecords => prevRecords.concat(newCursoX))
      }
      setOpenAddPopup(false)
    }

    const editarCurso = async (editCurso) =>{
      //Agregamos el curso
      const rpta = await CursoService.updateCurso(editCurso);
      if(rpta !== "Error"){
        console.log(rpta);
        const cursoNew = await CursoService.getCursosxCodigoNombre(editCurso.codigo);
        let newCurso = {
          "id": cursoNew[0].id,
          "codigo": cursoNew[0].codigo,
          "nombre": cursoNew[0].nombre,
          "creditos": parseFloat(cursoNew[0].creditos),
          "seccion": cursoNew[0].seccion,
          "unidad": cursoNew[0].unidad,
          "idUnidad": cursoNew[0].unidad.id
        }
        records[indexEdit] = newCurso;
        console.log(newCurso);
      }
      //setRecords(prevRecords => prevRecords.concat(editCurso))
      setOpenEditPopup(false)
      setIndexEdit(-1)
    }
    
    const eliminarCurso = async () =>{
      const rpta = await CursoService.deleteCurso(records[indexDelete].id);
      const oldIndex = indexDelete;
      await setIndexDelete(-1);
      if (rpta !== "Error") records.splice(oldIndex,1);
      //setRecords(); 
      setOpenOnePopup(false)
    }

    return (
        <Form>            
            <Typography variant="h4"
                color="primary.light" style={SubtitulosTable}
            >
                Listado de Cursos
            </Typography>
            <Grid container>
                <Grid item xs={5}>
                    <Stack direction="row" align="left" spacing={0}>
                        <Controls.Input
                            name="searchText"
                            label="Buscar Cursos por el nombre"
                            onChange={handleSearch}
                            type="search"
                            size="small"
                            sx = {{
                              maxWidth: .7
                            }}
                        />
                        {/* <Controls.Button  
                            text={<SearchIcon/>}
                            size="small"
                            sx = {{
                              // display: "inline",
                              maxWidth: .05
                            }}
                          /> */}
                    </Stack>
                </Grid>
                <Grid item xs={5}/>
                {/* FIX:  left align */}
                <Grid item xs={2} align="right">
                          <Controls.Button 
                              text="Agregar Nuevo Curso"
                              variant="text+icon"
                              onClick = {() => {setOpenAddPopup(true);}}
                          />
                    {/* FIX:  DT IconButton */}
                </Grid>
            </Grid>
            <BoxTbl>
                <TblContainer>
                    <TblHead />
                    <colgroup>
                      <col style={{ width: '10%' }} />
                      <col style={{ width: '30%' }} />
                      <col style={{ width: '20%' }} />
                      <col style={{ width: '5%' }} />
                      <col style={{ width: '15%' }} />
                      <col style={{ width: '10%' }} />
                    </colgroup>
                    <TableBody>
                    {/*console.log(records)*/}
                    {records.length > 0 ? 
                        recordsAfterPagingAndSorting().map(item => (
                        <StyledTableRow key={item.id}>
                            {/*<TableCell
                            align="right"
                            >
                            {item.clave}
                            </TableCell>*/}
                            <StyledTableCell>{item.codigo}</StyledTableCell>
                            <StyledTableCell>{item.nombre}</StyledTableCell>
                            <StyledTableCell>{(item.unidad.id !== 0) ? item.unidad.nombre : '-'}</StyledTableCell>
                            <StyledTableCell>{item.creditos}</StyledTableCell>
                            <StyledTableCell>{moment(item.fecha_modificacion).format('DD MMM, YYYY - HH:MM.SS')}</StyledTableCell>
                            <StyledTableCell>
                              {/* Accion editar */}
                              <Controls.ActionButton
                                color="warning"
                                onClick={ () => {guardarIndexforEdit(item)}}
                              >
                                <EditOutlinedIcon fontSize="small" />
                              </Controls.ActionButton>
                              {/* Accion eliminar */}
                              <Controls.ActionButton
                                color="warning"
                                
                                onClick={ () => {guardarIndex(item)}}
                              >
                                <DeleteOutlinedIcon fontSize="small" />
                              </Controls.ActionButton>
                            </StyledTableCell>
                        </StyledTableRow>
                        ))
                        :   (
                            <Typography variant="body1" color="primary.light" style={SubtitulosTable}>    
                                No hay elementos en la tabla. 
                            </Typography>  
                            )
                    }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </BoxTbl>
            {/*}
                <Controls.Button
                text="Eliminar todos los cursos"
                size = "small"
                color="warning"
                endIcon={<DeleteOutlinedIcon fontSize="small"/>}
                onClick={ () => {setOpenAllPopup(true)}}
            />*/}
            <Popup
                openPopup={openOnePopup}
                setOpenPopup={setOpenOnePopup}
                title={indexDelete > 0?`Eliminar el curso: ${records[indexDelete].codigo}`:`Eliminar curso`}
                size = "sm"
            >
              <EliminarCurso setOpenOnePopup = {setOpenOnePopup} eliminarCurso = {eliminarCurso}/>
            </Popup>
            {/*<Popup
                openPopup={openAllPopup}
                setOpenPopup={setOpenAllPopup}
                title="Eliminar todos los cursos"
                size = "sm"
            >
              <EliminarCursos setOpenAllPopup = {setOpenAllPopup} eliminarCursos = {eliminarCursos}/>
            </Popup>*/}
            <Popup
                openPopup={openAddPopup}
                setOpenPopup={setOpenAddPopup}
                title="Agregar nuevo curso"
                size = "sm"
            >
              <AgregarCurso setOpenAddPopup = {setOpenAddPopup} agregarCurso = {agregarCurso}/>
            </Popup>
            <Popup
                openPopup={openEditPopup}
                setOpenPopup={setOpenEditPopup}
                title={indexEdit > 0 ?`Editar el curso: ${records[indexEdit].codigo}`:`Editar curso`}
                size = "sm"
            >
              <EditarCurso setOpenEditPopup = {setOpenEditPopup} editarCurso = {editarCurso} item = {records[indexEdit]}/>
            </Popup>
        </Form>
    )
}
