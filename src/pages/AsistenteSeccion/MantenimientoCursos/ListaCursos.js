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
  const dataCur = await CursoService.getCursosxSeccionCodigoNombre(3,"");
  //dataSecc → id, nombre,  fechaFundacion, fechaModificacion,nombreDepartamento
  //const horarios = [];
  if(!dataCur)  {
    console.error("No se puede traer la data del servidor de los cursos")
    return [];
  }

  return dataCur;
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
        setRecords(prevRecords => prevRecords.concat(cursoNew))
      }
      setOpenAddPopup(false)
    }

    const editarCurso = async (editCurso) =>{
      //Agregamos el curso
      const rpta = await CursoService.updateCurso(editCurso);
      if(rpta !== "Error"){
        console.log(rpta);
        records[indexEdit] = editCurso;
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
                <Grid item xs={8}>
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
                {/* FIX:  left align */}
                <Grid item xs={4} align="right">
                          <Controls.AddButton 
                              title="Nuevo Curso"
                              variant="iconoTexto"
                              onClick = {() => {setOpenAddPopup(true);}}
                          />
                    {/* FIX:  DT IconButton */}
                </Grid>
            </Grid>
            <BoxTbl>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                    {/*console.log(records)*/}
                    {records.length > 0 ? 
                        recordsAfterPagingAndSorting().map(item => (
                        <TableRow key={item.id}>
                            {/*<TableCell
                            align="right"
                            >
                            {item.clave}
                            </TableCell>*/}
                            <TableCell>{item.codigo}</TableCell>
                            <TableCell>{item.nombre}</TableCell>
                            <TableCell>{item.seccion.departamento.unidad.nombre}</TableCell>
                            <TableCell>{item.creditos}</TableCell>
                            <TableCell>{moment(item.fecha_modificacion).format('DD MMM, YYYY - HH:MM.SS')}</TableCell>
                            <TableCell>
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
                            </TableCell>
                        </TableRow>
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
                <Controls.Button
                text="Eliminar todos los cursos"
                size = "small"
                color="warning"
                endIcon={<DeleteOutlinedIcon fontSize="small"/>}
                onClick={ () => {setOpenAllPopup(true)}}
                />
            <Popup
                openPopup={openOnePopup}
                setOpenPopup={setOpenOnePopup}
                title={indexDelete > 0?`Eliminar el curso: ${records[indexDelete].codigo}`:`Eliminar curso`}
                size = "sm"
            >
              <EliminarCurso setOpenOnePopup = {setOpenOnePopup} eliminarCurso = {eliminarCurso}/>
            </Popup>
            <Popup
                openPopup={openAllPopup}
                setOpenPopup={setOpenAllPopup}
                title="Eliminar todos los cursos"
                size = "sm"
            >
              <EliminarCursos setOpenAllPopup = {setOpenAllPopup} eliminarCursos = {eliminarCursos}/>
            </Popup>
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
