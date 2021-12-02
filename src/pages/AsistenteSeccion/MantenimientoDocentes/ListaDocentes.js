import { Avatar, Grid, InputAdornment, ListItem, TableBody, TableCell, TableRow, Typography, Box } from '@mui/material'
import React, { useState, useEffect} from 'react'
import { Controls } from '../../../components/controls/Controls'
import useTable from '../../../components/useTable'
import { Form, useForm } from '../../../components/useForm';
import personaService from '../../../services/personaService';
import Popup from '../../../components/util/Popup'
import EditarDocente from './EditarDocente'
import AgregarDocente from './AgregarDocente'
import EliminarDocente from './EliminarDocente'
import EliminarDocentes from './EliminarDocentes'
import { useTheme } from '@mui/material/styles'

/* ICONS */
import SearchIcon from '@mui/icons-material/Search';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LinearProgress from '@mui/material/LinearProgress';
import { SettingsPowerSharp } from '@mui/icons-material';

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
      sortable: false
    },
    {
      id: 'acciones',
      label: 'Acciones',
      numeric: false,
      sortable: false
    }
    /* {
      id: 'bono',
      label: 'Bonos',
      numeric: false,
      sortable: false
    } */
]

const initialFieldValues = {
    id: -1,
    title: ''
}
  
export default function ListaDocentes({openPopup}) {

    const [tipos, setTipos] = useState([])
    const [openPopupAdd, setOpenPopupAdd] = useState(false)
    const [openPopupEdit, setOpenPopupEdit] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [editIndex, setEditIndex] = useState(); //No tenemos nada al inicio - debemos seleccionar un indice
    const [recordForDel, setRecordForDel] = useState(null)
    const [openDelOnePopup, setDelOnePopup] = useState(false)
    const [openDelAllPopup, setDelAllPopup] = useState(false)
    const [profesoresCargados, setProfesoresCargados] = useState(false)
    const theme= useTheme();

    
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records, tableHeaders, filterFn);

    const {
      values,
      setValues,
      handleInputChange
    } = useForm(initialFieldValues);
    
    useEffect(() => {
      setTipos([
        {
          id: -1,
          title: "Todos los tipos"
        },
        {
          id: 0,
          title: "No Asignado"
        },
        {
          id: 1,
          title: "TC"
        },
        {
          id: 2,
          title: "TPC"
        },
        {
          id: 3,
          title: "TPA"
        },
      ]);
      setValues({
        id: -1,
        title: "Todos los tipos"
      });
    }, [])

    useEffect(() => {
      setProfesoresCargados(false)
      console.log(values.id);
      getProfesores(values.id)
    }, [values])

    function transformarDocentes (request){
        const recordsX = []
        request.map(doc => {
          if(doc.codigo_pucp)
            recordsX.push({
                "id": doc.id,
                "url_foto": doc.foto_URL,
                "nombres": doc.nombres,
                "apellidos": doc.apellidos,
                "especialidad": doc.seccion.nombre,
                "correo": doc.correo_pucp,
                "telefono": doc.telefono,
                "codigo": doc.codigo_pucp,
                "dni": doc.numero_documento,
                "tipo_docente": doc.tipo_docente,
                "id_seccion": doc.seccion.id,
                "id_departamento": doc.departamento.id,
                "id_unidad": doc.departamento.unidad.id,
                "numero_documento": doc.numero_documento,
                "deuda_docente": doc.deuda_docente,
                "cargaDocente": doc.cargaDocente,
                "tipo_bono": doc.tipo_bono,
                "fecha_ultimo_bono": doc.fecha_ultimo_bono,
            })
        })
        return recordsX;
    }

    const getProfesores = async (tipo_doc = -1) =>{
      //if (!tipo_doc) tipo_doc = -1;
      const request = await personaService.getPersonasxTipo(1);
      const recordsX = transformarDocentes(request);
      if(tipo_doc >= 0){
        const filterX = recordsX.filter(x => x.tipo_docente === tipo_doc);
        setRecords(filterX);
      } 
      else  setRecords(recordsX);
      setProfesoresCargados(true)
    }

    const eliminarDocentes = async () =>{
        records.map(item => {
            personaService.deletePersona(item.id);
          })
        setRecords([])
        setDelAllPopup(false)
    }

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
              return items.filter(x => x.apellidos.toLowerCase()
                  .includes(target.value.toLowerCase()))
          }
        })
     }
      
    const handleAdd = (e) => {
        setOpenPopupAdd(true)
    };

    const handleDeleteAll = () =>{
        setDelAllPopup(true)
    }

    const handleDelete = async (index, item) => {
      setEditIndex(index)
      setRecordForDel(item)
      setDelOnePopup(true)
    }

    const handleEdit = (index, item) => {
       setEditIndex(index)
       setRecordForEdit(item)
       setOpenPopupEdit(true)
    }

    return (
        <Form>
            <Grid container >
                <Grid item xs = {2}>
                {/* <Toolbar> */}
                <Box  sx={{width: "10vw", align: "Right"}}> 
                    <Controls.Select
                        name="id"
                        label="Tipo Docente"
                        value={values.id}
                        onChange={handleInputChange}
                        options={tipos}
                        type="contained"
                    />
                </Box>
                </Grid>
                <Grid item xs={0.5}> </Grid>
                <Grid item xs={5.5}>
                <Controls.Input
                    label="Buscar Docentes por Nombre"
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
                </Grid>
                <Grid item xs={2}> </Grid>
                {/* FIX:  left align */}
                <Grid item xs={2} align="right">
                <Controls.Button
                        variant = "text+icon" 
                        text="Agregar Nuevo Docente"
                        onClick = {(event) => handleAdd(event)}
                />
                </Grid>
            </Grid>
            <BoxTbl>
              {profesoresCargados ? (
                <TblContainer>
                    <TblHead />
                    <TableBody>
                    {
                       recordsAfterPagingAndSorting().map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <Grid container>
                                    <Grid item pl={.5}>
                                      <Avatar>
                                          {item.url_foto !== ("static/images/avatar/1.jpg" || "")
                                            ? <img height = "125%" width = "125%" text-align ="center" alt = "" 
                                              src={item.url_foto}></img>
                                            :  <AccountCircleIcon/>}
                                      </Avatar>
                                    </Grid>
                                    <Grid item sm>
                                        <Typography sx={{paddingLeft:2.5}}>
                                            {`${item.apellidos}, ${item.nombres}`}
                                        </Typography>
                                        <div style={{paddingLeft:20}}>
                                            Código PUCP: {item.codigo}
                                        </div>
                                        <div style={{paddingLeft:20}}>
                                            DNI: {item.numero_documento}
                                        </div>
                                    </Grid>
                            </Grid>
                          </TableCell>
                        <TableCell>
                            <Typography >
                                {item.especialidad}
                            </Typography>
                            <div >
                                {(item.tipo_docente === 0) ? "No asignado" : 
                                 (item.tipo_docente === 1) ? "Docencia a tiempo completo" :
                                 (item.tipo_docente === 2) ? "Docencia a tiempo parcial convencional" :
                                                             "Docencia a tiempo parcial por asignaturas"
                                }
                            </div>
                        </TableCell>
                        <TableCell>
                            <Typography >
                                Correo: {item.correo}
                            </Typography>
                            <div >
                                Teléfono: {item.telefono}
                            </div>
                        </TableCell>
                            {/* <TableCell>{item.bono}</TableCell> */}
                            <TableCell>
                              <Controls.ActionButton
                                color="warning"
                                onClick={ () => {handleEdit(index, item)}}
                              >
                                <EditOutlinedIcon fontSize="small" />
                              </Controls.ActionButton>
                              {/* Accion eliminar */}
                              <Controls.ActionButton
                                color="warning"
                                onClick={ () => {handleDelete(index, item)}}
                              >
                                <DeleteOutlinedIcon fontSize="small" />
                              </Controls.ActionButton>
                            </TableCell>
                      </TableRow>
                    ))
                }
                </TableBody>
            </TblContainer>
            ) : (
              <Box sx={{ width: '100%' }}>
                <LinearProgress />
              </Box>
            )}
              
                <TblPagination />
            </BoxTbl>
                {/* <Controls.Button
                text="Eliminar todos los docentes"
                size = "small"
                color="warning"
                endIcon={<DeleteOutlinedIcon fontSize="small"/>}
                onClick={ () => {handleDeleteAll()}}
                /> */}
            <Popup
                openPopup={openPopupEdit}
                setOpenPopup={setOpenPopupEdit}
                title= {"Editar Docente"}
            >
              <EditarDocente
                recordForEdit={recordForEdit}
                setOpenPopup={setOpenPopupEdit}
                records={records}
                setRecords={setRecords}
                transformarDocentes={transformarDocentes}
                editIndex = {editIndex}
                setEditIndex = {setEditIndex}
                tipo = {values.id}
              />        
            </Popup>

            <Popup
                openPopup={openPopupAdd}
                setOpenPopup={setOpenPopupAdd}
                title= {"Agregar Docente"}
            >
              <AgregarDocente
                setOpenPopup={setOpenPopupAdd}
                records={records}
                setRecords={setRecords}
                transformarDocentes={transformarDocentes}
                tipo = {values.id}
              />        
            </Popup>

            <Popup
                openPopup={openDelOnePopup}
                setOpenPopup={setDelOnePopup}
                title={`Eliminar docente: `}
                size = "sm"
            >
              <EliminarDocente 
                    setOpenOnePopup = {setDelOnePopup}
                    recordForDel = {recordForDel} 
                    records={records}
                    setRecords={setRecords}
                    editIndex = {editIndex}
                    setEditIndex = {setEditIndex}
                />
            </Popup>
            <Popup
                openPopup={openDelAllPopup }
                setOpenPopup={setDelAllPopup}
                title={`Eliminar docente: `}
                size = "sm"
            >
              <EliminarDocentes 
                    setDelAllPopup = {setDelAllPopup}
                    eliminarDocentes = {eliminarDocentes} 
                />
            </Popup>
        </Form>
    )
}
