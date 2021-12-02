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


import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import AgregarPreferenciaDocente from './AgregarPreferenciaDocente';
import EliminarPreferencias from './EliminarPreferencias';

const tableHeaders = [
    {
      id: '',
      label: '',
      numeric: false,
      sortable: false
    },
    {
      id: 'clave',
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
      sortable: false
    },
    {
      id: 'horario',
      label: 'Horario',
      numeric: false,
      sortable: false
    },
    {
      id: 'tipo',
      label: 'Tipo',
      numeric: false,
      sortable: false
    },
    {
      id: 'horas',
      label: 'Horas',
      numeric: false,
      sortable: false
    }
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
    
    React.useEffect(() => {
        getPreferencias()
          .then(pref => {
            setRecords(pref);
          })
    }, [])

    async function transformarPreferencias (request){
      const recordsX = [];
      if(request.length){
          for(let i = 0; i < request[0].sesiones.length; i++){
            //Hacemos la verificacion de si es un curso repetido o no
            const newHor = await request[0].horarios.filter(hor => hor.sesiones.some(ses => ses.id === request[0].sesiones[i].id));
            recordsX.push ({
              "ID": request[0].id,
              "ID_Docente": request[0].docente.id,
              "ID_Ciclo": request[0].ciclo.id,
              "Curso_Ciclo": newHor[0].curso_ciclo,
              "Horario": newHor[0],
              "Sesion": request[0].sesiones[i],
              "selected": false
            })
          }
        }
      return recordsX;
    }

    const getPreferencias = async () =>{
      const user = JSON.parse(window.localStorage.getItem("user"));
      const request = await personaService.listarPorDocente(user.persona.id, parseInt(window.localStorage.getItem("ciclo")));
      const recordsX = await transformarPreferencias(request)
      
      return recordsX
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
      let resultado = 0;
      console.log(records);
      let prefFil = records.filter((pref) => (pref.selected===false || !pref.selected))
      const horarios = [], sesiones = [], cursoCiclos = [];

      for(let i = 0; i < prefFil.length; i++){
          cursoCiclos.push({
            "id": prefFil[i].Curso_Ciclo.id,
          })
          horarios.push({
            "id": prefFil[i].Horario.id,
          })
          sesiones.push({
            "id": prefFil[i].Sesion.id,
          })
      }

      //Le damos la forma que requiere
      let preferencia = {
          "id": prefFil[0].ID,
          "docente": {
            "id": prefFil[0].ID_Docente
          },
          "ciclo":{
            "id": prefFil[0].ID_Ciclo
          },
          "cursoCiclos": cursoCiclos,
          "horarios": horarios,
          "sesiones": sesiones
      }

      for(let i = 0; i < idDelRecords.length; i++){
        resultado = personaService.updatePreferencia(preferencia)
      } 
      if(resultado) setRecords(prefFil)
      setOpenPopupDelete(false)
    }

    const handleAdd = (e) => {
        setOpenPopupAdd(true)
    }

    const addCursoBorrar = (item) => {
      item.selected = !item.selected
      let idRecords = idDelRecords; 
      if(item.selected){
        console.log("Se agrega un horario")
        idRecords.push(item.ID)

      }else{
        console.log("Se quita un horario")
        for(let i = 0; i < idRecords.length; i++){
          if(idRecords[i] === item.ID){
            idRecords.splice(i, 1)
            return;
          }
        }
      }
      setidDelRecords(idRecords);
    } 

    return (
        <>
            <div style={{display: "flex", paddingRight: "5px", marginTop:20}}>
                {/* <Toolbar> */}
            <Grid container alignItems="flex-start">
              <Grid item xs= {4} >
                <Typography variant="h5">
                        Preferencias Registradas
                </Typography>
              </Grid>
              <Grid item xs = {6}/>
              <Grid item xs = {2} align = "right">
                  <Controls.Button 
                      title="Asignar Nuevo Horario"
                      variant="text+icon"
                      text = "Asignar Nuevo Horario"
                      onClick = {(e) => handleAdd(e)}
                  />
              </Grid>
            </Grid>
            </div>
          {records.length ? 
          <>
            <BoxTbl>
                <TblContainer>
                <colgroup>
                  <col style={{ width: '2%' }} />
                  <col style={{ width: '5%' }} />
                  <col style={{ width: '40%' }} />
                  <col style={{ width: '40%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '3%' }} />
                </colgroup>
                    <TblHead />
                    <TableBody>
                    { 
                       recordsAfterPagingAndSorting().map(item => (
                        <TableRow key={item.Sesion.id} >
                            <TableCell>
                                <Controls.RowCheckBox 
                                onClick = {()=>{addCursoBorrar(item)}}>
                                    {/*<EditOutlinedIcon fontSize="small" />*/}
                                </Controls.RowCheckBox>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {item.Curso_Ciclo.curso.codigo}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography >
                                    {item.Curso_Ciclo.curso.nombre}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography >
                                    {item.Curso_Ciclo.curso.seccion.departamento.unidad.nombre}
                                </Typography>
                            </TableCell>
                            <TableCell >
                                <Typography >
                                    {item.Horario.codigo}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography >
                                    {item.Sesion.secuencia ? "Laboratorio" : "Clase"}
                                </Typography>
                            </TableCell>
                            <TableCell align = "center">
                                <Typography >
                                    {item.Sesion.horas}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        ))
                    }
                    </TableBody>
                </TblContainer>
                <TblPagination />
              
            </BoxTbl>
                <Controls.Button
                    variant="outlined"
                    text="Borrar seleccionado"
                    size="small"
                    endIcon={<DeleteOutlineOutlinedIcon />}
                    onClick = {() => setOpenPopupDelete(true)}
                    // disabled = {idDelRecords.length ? false : true}
                />
          </>
          : <>
            <BoxTbl>
            <Grid item xs= {12} rowSpacing={20} align = "center">
              <Typography variant="h4" color = "secondary">
                      Aún no tiene preferencias registradas
              </Typography>
            </Grid>
            </BoxTbl>
          </>}
            <Popup
                openPopup={openPopupAdd}
                setOpenPopup={setOpenPopupAdd}
                title="Agregar Horarios a Preferencias"
            >
               <AgregarPreferenciaDocente openPopup = {openPopupAdd} setOpenPopUp = {setOpenPopupAdd} records = {records} setRecords = {setRecords}/>
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
