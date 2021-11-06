import React, {useState, useEffect} from 'react'
import { Controls } from '../../../components/controls/Controls'
import Popup from '../../../components/util/Popup'
import useTable from "../../../components/useTable"
import ContentHeader from '../../../components/AppMain/ContentHeader';
import { Box, Paper, TableBody, TableRow, TableCell,InputAdornment, Toolbar } from '@mui/material';
/* ICONS */
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material'
import Notification from '../../../components/util/Notification'
import ConfirmDialog from '../../../components/util/ConfirmDialog'
import { StyledTableRow, StyledTableCell } from '../../../components/controls/StyledTable';
import AgregarEditarSeccion from './AgregarEditarSeccion'
import SeccionService from '../../../services/seccionService.js';
//import AuthService from '../../../services/authService.js';
//import * as employeeService from '../../../services/employeeService'

const tableHeaders = [
    {
      id: 'nombre',
      label: 'Nombre de la seccion',
      numeric: false,
      sortable: true
    },
    {
      id: 'fechaModificacion',
      label: 'Última Modificación',
      numeric: false,
      sortable: true
    },
    {
        id: 'nombreDepartamento',
        label: 'Departamento',
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

const getSecciones = async () => {

  let dataSecc = await SeccionService.getSecciones();
  //console.log(dataSecc)
  dataSecc = dataSecc ?? []
  //dataSecc → id, nombre,  fechaFundacion, fechaModificacion,nombreDepartamento
  const secciones = [];
  dataSecc.map(seccion => (
    secciones.push({
      id: seccion.id,
      nombre: seccion.nombre,
      fechaFundacion: seccion.fecha_fundacion,
      fechaModificacion: seccion.fecha_modificacion,
      departamento:{
        idDepartamento: seccion.departamento.id,
        nombreDepartamento: seccion.departamento.nombre
      },
      correo: seccion.correo
    })
    ));
  //console.log(secciones);
  window.localStorage.setItem('listSecciones', JSON.stringify(dataSecc));
  return secciones;
}
export default function GestionSeccion() {
    const [openPopup, setOpenPopup] = useState(false)
    //const [seccion, setSeccion] = useState([])
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [recordForEdit, setRecordForEdit] = useState()
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
    const SubtitulosTable={display:"flex"}
    const PaperStyle={ borderRadius: '20px', pb:4,pt:2, px:2,
    color:"primary.light", elevatio:0}
    const [confirmDialog, setConfirmDialog] = useState(
      { isOpen: false, title: '', subtitle: '' })
    //console.log(records);
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records, tableHeaders, filterFn);

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

    useEffect(() => {
      //Obtenemos las secciones
      getSecciones()
      .then (newSeccion =>{
        setRecords(newSeccion); //Se quiere actualizar todo
        //console.log(newSeccion);
      });

    }, [recordForEdit])

    const addOrEdit = (seccion, resetForm) => {
      
      recordForEdit
        ? SeccionService.updateSeccion(seccion)
        : SeccionService.registerSeccion(seccion)
          .then(idSeccion => {
            if(recordForEdit)
              setRecordForEdit(null);
        })
      setOpenPopup(false)
      resetForm()
      window.location.replace('')
      setNotify({
        isOpen: true,
        message: 'Registro de Cambios Exitoso',
        type: 'success'
      })
    }
    const onDelete = (idSeccion) => {
      // if (!window.confirm('Are you sure to delete this record?'))
      //   return
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false
      })
      console.log(idSeccion)
      //console.log(id)
      SeccionService.deleteSeccion(idSeccion);
      //userService.borrarUsuario(idDepartamento)

      /*DTLocalServices.getUsers().then((response) => {
        setRecords(response.data)
        console.log(response.data);
      });*/
      //setRecords(DTLocalServices.getAllPersonas())

      setNotify({
        isOpen: true,
        message: 'Borrado Exitoso',
        type: 'error'
      })
    }

/*    const onDelete = (idSeccion,id) => {
      // if (!window.confirm('Are you sure to delete this record?'))
      //   return
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false
      })

      SeccionService.deleteSeccion(idSeccion)
      //userService.borrarUsuario(id)
      //DTLocalServices.getUsers().then((response) => {
      SeccionService
        setRecords(response.data)
        console.log(response.data);
      });
      //setRecords(DTLocalServices.getAllPersonas())
      setNotify({
        isOpen: true,
        message: 'Deleted Successfully',
        type: 'error'
      })
    }
*/
    return (
        <>
          <ContentHeader
            text="Gestión de Secciones"
            cbo={false}
          />
          <Paper variant="outlined" sx={PaperStyle}>
            <Typography variant="h4" style={SubtitulosTable}> Secciones</Typography>
            <div style={{display: "flex", paddingRight: "5px", marginTop:20}}>
              <Toolbar>
                <Controls.Input
                  label="Buscar Secciones por Nombre"
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
                  title="Agregar Nueva Sección"
                  variant="iconoTexto"
                  onClick = {() => {setOpenPopup(true); setRecordForEdit(null)}}
                  //openInPopup();^
                />

              </Toolbar>
            </div>
            <BoxTbl>
              <TblContainer>
                <TblHead />
                <TableBody>
                  {
                    recordsAfterPagingAndSorting().map(item => (
                      <StyledTableRow key={item.id}>
                        {/*
                        <StyledTableCell
                          align="right"
                            >
                            {item.id}
                            </StyledTableCell>
                            */}
                            <StyledTableCell>{item.nombre}</StyledTableCell>
                            <StyledTableCell>{item.fechaFundacion}</StyledTableCell>
                            <StyledTableCell>{item.fechaModificacion}</StyledTableCell>
                            <StyledTableCell>{item.departamento.nombreDepartamento}</StyledTableCell>
                            <StyledTableCell>
                              {/* Accion editar */}
                              <Controls.ActionButton
                                color="warning"
                                onClick={ () => {setOpenPopup(true); setRecordForEdit(item)}}
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
                                    title: '¿Eliminar seccion permanentemente?',
                                    subTitle: 'No es posible deshacer esta accion',
                                    onConfirm: () => {onDelete(item.id)}
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
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title={recordForEdit ? "Editar Seccion": "Nueva Seccion"}
            >
              <AgregarEditarSeccion
                recordForEdit={recordForEdit}
                addOrEdit={addOrEdit}
                />
                {/*console.log("Este es el recordforedit ",recordForEdit)*/}
              {/*  <AgregarEditarSeccion/> */}
            </Popup>
            <Notification
              notify={notify}
              setNotify={setNotify}
            />
            <ConfirmDialog
              confirmDialog={confirmDialog}
              setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}
