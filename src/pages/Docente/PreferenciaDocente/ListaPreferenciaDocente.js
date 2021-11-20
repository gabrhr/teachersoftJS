import { Avatar, Grid, InputAdornment, ListItem, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import React, { useState, useEffect} from 'react'
import { Controls } from '../../../components/controls/Controls'
import useTable from '../../../components/useTable'
import personaService from '../../../services/personaService';
import Popup from '../../../components/util/Popup'
/* ICONS */
import SearchIcon from '@mui/icons-material/Search';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import AgregarPreferenciaDocente from './AgregarPreferenciaDocente';


const tableHeaders = [
    {
      id: 'codigo',
      label: 'Codigo',
      numeric: false,
      sortable: true
    },
    {
      id: 'nombre',
      label: 'Nombre',
      numeric: false,
      sortable: false
    },
    {
      id: 'creditos',
      label: 'Créditos',
      numeric: false,
      sortable: true
    },
    {
      id: 'horario',
      label: 'Horario',
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
  
export default function ListaPreferenciaDocente({openPopup}) {

    const [openPopupAdd, setOpenPopupAdd] = useState(false)
    const [openPopupEdit, setOpenPopupEdit] = useState(false)
    
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
        //getProfesores()
      }, [openPopupEdit, openPopupAdd, openPopup])

    function transformarDocentes (request){
        const recordsX = []
        request.map(doc => {
            recordsX.push({
                "id": doc.id,
                "url_foto": doc.foto_URL ? doc.foto_URL : "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png",
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
    
    const handleRemove = (e) => {
        console.log("Se remueve una(s) preferencia")
    }

    const handleAdd = (e) => {
        console.log("Se agrega una preferencia (?)")
        setOpenPopupAdd(true)
    }

    const handleDelete = async item => {
        console.log("Se borra una fila")
    }

    const handleEdit = item => {
       console.log("Se edita una fila")
    }
    console.log(records);
    return (
        <>
            <div style={{display: "flex", paddingRight: "5px", marginTop:20}}>
                {/* <Toolbar> */}
                <Grid item sm>
                <Typography variant="h5">
                        Cursos Seleccionados
                </Typography>
                <Controls.Button
                        text="Agregar Horario"
                        size="large"
                        onClick = {(e) => handleAdd(e)}
                />
                </Grid>
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
                                <Grid item sm>
                                    <Typography sx={{paddingLeft:2.5}}>
                                        {`${item.nombre}`}
                                    </Typography>
                                </Grid>
                            </Grid>
                            </TableCell>
                            <TableCell>
                                <Typography >
                                    {item.creditos}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography >
                                    {item.horario}
                                </Typography>
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
                <Controls.MinusButton 
                    title="Eliminar Seleccionados"
                    variant="iconoTexto"
                    onClick = {(event) => handleRemove(event)}
                />
            <Popup
                openPopup={openPopupAdd}
                setOpenPopup={setOpenPopupAdd}
                title="Agregar Horarios a Preferencias"
            >
               <AgregarPreferenciaDocente setOpenPopUp = {setOpenPopupAdd}/>
            </Popup>  
        </>
    )
}
