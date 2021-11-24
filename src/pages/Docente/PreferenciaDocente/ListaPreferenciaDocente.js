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
import EliminarPreferencias from './EliminarPreferencias';

const tableHeaders = [
    {
      id: 'seleccionar',
      label: 'Seleccionar',
      numeric: false,
      sortable: true
    },
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
    const [openPopupDelete, setOpenPopupDelete] = useState(false)
    const [records, setRecords] = useState([])
    const [idDelRecords, setidDelRecords]  = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records, tableHeaders, filterFn);
    
    useEffect(() => {
        getPreferencias()
    }, [openPopupEdit, openPopupAdd, openPopup, openPopupDelete])

    function transformarPreferencias (request){
        const recordsX = []
        request.map(doc => {
            recordsX.push({
              "Codigo": doc.cursoCiclos[0].curso.codigo,
              "Nombre": doc.cursoCiclos[0].curso.nombre,
              "Creditos": doc.cursoCiclos[0].curso.creditos,
              "Horario": doc.horarios[0].codigo,
              "ID": doc.id,
              "selected": false
            })
        })
        return recordsX;
    }

    const getPreferencias = async () =>{
        const request = await personaService.getPreferencias();
        const recordsX = transformarPreferencias(request)
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

    const handleDelete = () => {
      console.log(idDelRecords)
      for(let i = 0; i < idDelRecords.length; i++){
        personaService.deletePreferencia(idDelRecords[i])
      } 
      setOpenPopupDelete(false)
    }

    const handleAdd = (e) => {
        console.log("Se agrega una preferencia (?)")
        setOpenPopupAdd(true)
    }

    const addCursoBorrar = (item) => {
      item.selected = !item.selected
      if(item.selected){
          idDelRecords.push(item.ID)
          console.log(idDelRecords)
          console.log("Se agrega un horario")
      }else{
          for(let i = 0; i < idDelRecords.length; i++){
              if(idDelRecords[i] === item.ID){
                  idDelRecords.splice(i, 1)
              }
          }
          console.log(idDelRecords)
          console.log("Se quita un horario")
      }
    } 

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
                                <Controls.RowCheckBox onClick = {()=>{addCursoBorrar(item)}}>
                                    {/*<EditOutlinedIcon fontSize="small" />*/}
                                </Controls.RowCheckBox>
                            </TableCell>
                            <TableCell>
                            <Grid container>
                                <Grid item sm>
                                    <Typography sx={{paddingLeft:2.5}}>
                                        {`${item.Codigo}`}
                                    </Typography>
                                </Grid>
                            </Grid>
                            </TableCell>
                            <TableCell>
                                <Typography >
                                    {item.Nombre}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography >
                                    {item.Creditos}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography >
                                    {item.Horario}
                                </Typography>
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
                    onClick = {() => setOpenPopupDelete(true)}
                />
            <Popup
                openPopup={openPopupAdd}
                setOpenPopup={setOpenPopupAdd}
                title="Agregar Horarios a Preferencias"
            >
               <AgregarPreferenciaDocente openPopup = {openPopupAdd} setOpenPopUp = {setOpenPopupAdd}/>
            </Popup>
            <Popup
                openPopup={openPopupDelete}
                setOpenPopup={setOpenPopupDelete}
                title={`Eliminar preferencias: `}
                size = "sm"
            >
              <EliminarPreferencias 
                    setOpenOnePopup = {setOpenPopupDelete}
                    handleDelete = {handleDelete} 
                />
            </Popup>
        </>
    )
}
