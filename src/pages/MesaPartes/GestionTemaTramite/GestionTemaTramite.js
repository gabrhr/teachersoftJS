// URL: localhost:3000/as/gestiontematramite/gestiontematramite 

import React, { useState, useEffect } from 'react'
import ContentHeader from '../../../components/AppMain/ContentHeader';
import { IconButton, Toolbar } from '@mui/material';
import { Box, Paper, TableBody, TableRow, TableCell,Typography, InputAdornment } from '@mui/material';
import { Controls } from '../../../components/controls/Controls';
import { StyledTableCell, StyledTableRow } from '../../../components/controls/StyledTable';

import useTable from "../../../components/useTable";
import { useForm, Form } from '../../../components/useForm';

/* ICONS */
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

/*SERVICES*/ 
import tematramiteService from '../../../services/tematramiteService';
import * as DTLocalServices from '../../../services/DTLocalServices';

const initialFieldValues = {
    seccionID: '',
}

  const tableHeaders = [
    {
    id: 'name',
    label: 'Nombre del tema de Trámite',
    numeric: false,
    sortable: true
    }
 
]

/*
const getUsuario = async () => {

  let usuario = await UserService.getUsuarios();
  usuario = usuario ?? []
  console.log(usuario)
  var str,std,stl,ape1,ape2
  let roles = DTLocalServices.getAllRoles();
  const usuarios = [];

  usuario.map(usr => (
    ape1 = '',
    ape2 = '',
    str = usr.persona.apellidos ? usr.persona.apellidos : -1,
    std = str!=-1 ? str.indexOf(' ') : -1,
    stl = std >= 0 ? usr.persona.apellidos.split(" ") : -1,
    stl != -1 ? (ape1 = stl[0], ape2 = stl[1]) : (ape1 = usr.persona.apellidos, ape2 = ''),
    usuarios.push({
      id: usr.id.toString(),
      idPersona: usr.persona.id.toString(),
      nombre: usr.persona.nombres,
      apellidoPaterno: ape1,
      apellidoMaterno: ape2,
      documento: usr.persona.numero_documento,
      correo: usr.persona.correo_pucp,
      rolName: roles.find(r => r.id === usr.persona.tipo_persona).nombre,
      rol: usr.persona.tipo_persona,
      idDepartamento: usr.persona.departamento ? usr.persona.departamento.id : '',
      nombreDepartamento: usr.persona.departamento ? usr.persona.departamento.nombre : '',
      idSeccion: usr.persona.seccion ? usr.persona.seccion.id : '',
      nombreSeccion: usr.persona.seccion ? usr.persona.seccion.nombre : '',
      foto_URL: usr.persona.foto_URL
    })
    ));
  //console.log(usuarios)
  window.localStorage.setItem('listUsuarios', JSON.stringify(usuario));
  return usuarios;
}
*/

export default function GestionTemaTramite() {

    const [records, setRecords] = useState([])
    const [deleteData, setDeleteData] = useState(false);
    const [changeData, setChangeData] = useState(false);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subtitle: '' })
  
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
      } = useTable(records, tableHeaders, filterFn);

      const {
        values,
        handleInputChange
      } = useForm(initialFieldValues);

    const PaperStyle = { borderRadius: '20px', pb: 4, pt: 2, px: 2, color: "primary.light", elevatio: 0 }
    const SubtitulosTable = { display: "flex" }

    const handleSearch = (e) => {
        let target = e.target;
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

    const handleSearchSeccion = e => {
        let target = e.target;
        handleInputChange(e)
        setFilterFn({
           fn: items => {
            //4 es el valor escrito en bruto para listar todo
            if (target.value == "" || items.length === 0)
              return items
            else
               return items.filter(x => x.nombreSeccion
                   .includes(target.value))
          }
        })
    }

    useEffect(() => {
        /*
        //Descomentar cuando se realice el get Tipo Tramite
        getUsuario()
        .then (newUsr =>{
          setRecords(newUsr);
          setDeleteData(false);
          setChangeData(false);
        });
        */
      }, [recordForEdit,changeData, deleteData])
 

    return (
        <>
          <ContentHeader
            text="Gestionar Tema de Trámites"
            cbo={false}
          />  
         <Paper variant="outlined" sx={PaperStyle}>
            <Typography variant="h4" style={SubtitulosTable} >
            Tipo de Trámite
            </Typography>
            <div style={{ display: "flex", paddingRight: "5px", marginTop: 20 }}>
            {/* <Toolbar> */}
            <Controls.Input
                label="Buscar por tipo de trámite"
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <SearchIcon />
                    </InputAdornment>
                )
                }}
                sx={{ width: .75}}
                onChange={handleSearch}
                type="search"
            />
            </div>
            <BoxTbl>
          <TblContainer>
            <TblHead />
            <TableBody>
              {
                // API devuelve [].  map se cae.  Llamar 2 veces.
                // recordsAfterPagingAndSorting() && recordsAfterPagingAndSorting().map(item => (
                recordsAfterPagingAndSorting().map(item => (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell>
                    {item.nombre.toUpperCase()} {item.apellidoPaterno.toUpperCase()} {item.apellidoMaterno.toUpperCase()}
                    </StyledTableCell>
                    <StyledTableCell>{item.documento}</StyledTableCell>
                    <StyledTableCell>{item.correo}</StyledTableCell>
                    <StyledTableCell>{item.rolName}</StyledTableCell>
                    <StyledTableCell>{item.nombreSeccion}</StyledTableCell>
                    <StyledTableCell>{item.nombreDepartamento}</StyledTableCell>
                    <StyledTableCell>
                      <Controls.ActionButton
                        color="warning"
                        //onClick={ () => {openInPopup(item)}}
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </Controls.ActionButton>
                      <IconButton aria-label="delete">
                        <DeleteIcon
                        color="warning"
                        onClick={() => {
                          // onDelete(item.id)
                          setConfirmDialog({
                            isOpen: true,
                            title: '¿Eliminar usuario permanentemente?',
                            subTitle: 'No es posible deshacer esta accion',
                            //onConfirm: () => {onDelete(item.idPersona,item.id)}
                          })
                        }}/>
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              }
            </TableBody>
          </TblContainer>
          <TblPagination />
        </BoxTbl>
      </Paper>

        </>
    )
}
