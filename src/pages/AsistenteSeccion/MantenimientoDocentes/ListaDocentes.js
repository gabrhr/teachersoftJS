import { Avatar, Grid, InputAdornment, ListItem, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import React, { useState, useEffect} from 'react'
import { Controls } from '../../../components/controls/Controls'
import useTable from '../../../components/useTable'
import personaService from '../../../services/personaService';
import Popup from '../../../components/util/Popup'
import EditarDocente from './EditarDocente'
import AgregarDocente from './AgregarDocente'
import EliminarDocente from './EliminarDocente'
/* ICONS */
import SearchIcon from '@mui/icons-material/Search';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

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
    },
    {
      id: 'acciones',
      label: 'Acciones',
      numeric: false,
      sortable: true
    },
    /* {
      id: 'bono',
      label: 'Bonos',
      numeric: false,
      sortable: false
    } */
]
  
export default function ListaDocentes() {

    const [openPopupAdd, setOpenPopupAdd] = useState(false)
    const [openPopupEdit, setOpenPopupEdit] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [openDelOnePopup, setDelOnePopup] = useState(false)
    const [indexDelete, setIndexDelete] = useState(-1)
    const [indexEdit, setIndexEdit] = useState(-1)

    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records, tableHeaders, filterFn);
    
    useEffect(() => {
        //Obtenemos las secciones
        
        getProfesores();
  
      }, [records])

    function transformarDocentes (request){
        const recordsX = []
        request.map(doc => {
            recordsX.push({
                "id": doc.id,
                "url_foto": doc.foto_URL ? doc.foto_URL : 'static/images/avatar/1.jpg',
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
            })
        })
        return recordsX;
    }

    const getProfesores = async () =>{
        const request = await personaService.getPersonasxTipo(1);
        
        const recordsX = transformarDocentes(request)
        setRecords(recordsX)
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

    const handleDelete = async item => {
        await setIndexDelete(records.indexOf(item))
        console.log(records.indexOf(item))
        console.log(item)
        console.log(indexDelete)
        console.log(records[indexDelete].id)
        setDelOnePopup(true)
    }

    const handleEdit = item => {
       console.log(item)
       setRecordForEdit(item)
       setOpenPopupEdit(true)
    }

    const eliminarDocente = async () =>{
        const rpta = await personaService.deletePersona(records[indexDelete].id);
        console.log(rpta)
        console.log(records[indexDelete].id)
        const oldIndex = indexDelete;
        await setIndexDelete(-1);
        if (rpta !== "Error") records.splice(oldIndex,1);
        //setRecords(); 
        setDelOnePopup(false)
      }

    return (
        <>
            <div style={{display: "flex", paddingRight: "5px", marginTop:20}}>
                {/* <Toolbar> */}
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
                <Controls.AddButton 
                        title="Agregar Nuevo Docente"
                        variant="iconoTexto"
                        onClick = {(event) => handleAdd(event)}
                />
            </div>
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
                                    <img height = "125%" width = "125%" text-align ="center" src={item.url_foto} alt=""></img>
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
                                    {item.correo}
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
                                onClick={ () => {handleEdit(item)}}
                              >
                                <EditOutlinedIcon fontSize="small" />
                              </Controls.ActionButton>
                              {/* Accion eliminar */}
                              <Controls.ActionButton
                                color="warning"
                                onClick={ () => {handleDelete(item)}}
                              >
                                <DeleteOutlinedIcon fontSize="small" />
                              </Controls.ActionButton>
                            </TableCell>
                        </TableRow>
                        ))
                    }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </BoxTbl>

            <Popup
                openPopup={openPopupEdit}
                setOpenPopup={setOpenPopupEdit}
                title= {"Editar Docente"}
            >
              <EditarDocente
                recordForEdit={recordForEdit}
                setOpenPopup={setOpenPopupEdit}
              />        
            </Popup>

            <Popup
                openPopup={openPopupAdd}
                setOpenPopup={setOpenPopupAdd}
                title= {"Editar Docente"}
            >
              <AgregarDocente
                setOpenPopup={setOpenPopupAdd}
              />        
            </Popup>

            <Popup
                openPopup={openDelOnePopup}
                setOpenPopup={setDelOnePopup}
                title={indexDelete > 0?`Eliminar el Docente: ${records[indexDelete].codigo}`:`Eliminar docente`}
                size = "sm"
            >
              <EliminarDocente setOpenOnePopup = {setDelOnePopup} eliminarDocente = {eliminarDocente}/>
            </Popup>
        </>
    )
}
