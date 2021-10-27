import React, {useState, useEffect} from 'react'
import { Controls } from '../../../components/controls/Controls'
import Popup from '../../../components/util/Popup'
import useTable from "../../../components/useTable"
import ContentHeader from '../../../components/AppMain/ContentHeader';
import { Box, Paper, TableBody, TableRow, TableCell,InputAdornment } from '@mui/material';
/* ICONS */
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material'
import { StyledTableRow, StyledTableCell } from '../../../components/controls/StyledTable';
import AgregarEditarSeccion from './AgregarEditarSeccion'
import SeccionService from '../../../services/seccionService.js';
import * as employeeService from '../../../services/employeeService'



const tableHeaders = [
    {
      id: 'id',
      label: 'SeccionID',
      numeric: true,
      sortable: true
    },
    {
      id: 'nombre',
      label: 'Nombre Completo',
      numeric: false,
      sortable: true
    },
    {
      id: 'fechaFundacion',
      label: 'Fecha de Fundación',
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

function getSecciones(){
  const dataSecc = SeccionService.getSecciones(); 
  //dataSecc → id, nombre,  fechaFundacion, fechaModificacion,nombreDepartamento
  const secciones = [];
  dataSecc.map(seccion => (
    secciones.concat({
      id: seccion.id,
      nombre: seccion.nombre,
      fechaFundacion: seccion.fecha_creacion,
      fechaModificacion: seccion.fecha_modificacion,
      nombreDepartamento: seccion.departamento.nombre,
    })
  ));
  console.log(secciones);
  return dataSecc;
}
/*
function createData(id, nombre, fechaFundacion, fechaModificacion, nombreDepartamento) {
    return {
        id, nombre,  fechaFundacion, fechaModificacion,nombreDepartamento,
    }
  }
  
const usuarios2 = [
    createData('0', 'Seccion Informatica',  '2021-09-30 01:14 pm ', '2021-09-30 01:14 pm ', 'FACI'),
    createData('1', 'Seccion Industrial',  '2021-09-30 01:14 pm ', '2021-09-30 01:14 pm ', 'FACI'),
    createData('2', 'Seccion Electronica',  '2021-09-30 01:14 pm ', '2021-09-30 01:14 pm ', 'FACI'),
]
*/
export default function GestionSeccion() {
    const [openPopup, setOpenPopup] = useState(false)
    const [seccion, setSeccion] = useState([])
    const [records, setRecords] = useState(seccion)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
    const SubtitulosTable={display:"flex"}
    const PaperStyle={ borderRadius: '20px', pb:4,pt:2, px:2, 
    color:"primary.light", elevatio:0}

    useEffect(() => {
      setSeccion(oldSeccion => [...oldSeccion, getSecciones()]);
    }, []);

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
          if (target.value == "")
            /* no search text */
            return items
          else
            return items.filter(x => x.nombre.toLowerCase()
                .includes(target.value.toLowerCase()))
        }
      })
    }
    const openInPopup = item => {
      setRecordForEdit(item)
      setOpenPopup(true)
    }

    /* const addOrEdit = (seccion, resetForm) => {
      if (seccion.id == 0)
        SeccionService.registerSeccion(seccion)
      else
        SeccionService.updateSeccion(seccion)
      resetForm()
      setRecordForEdit(null)
      setOpenPopup(false)
      setRecords(getSecciones.getAllEmployees())
  
      setNotify({
        isOpen: true,
        message: 'Submitted Successfully',
        type: 'success'
      })
    } */
    const addOrEdit = (employee, resetForm) => {
      if (employee.id == 0)
        employeeService.insertEmployee(employee)
      else
        employeeService.updateEmployee(employee)
      resetForm()
      setRecordForEdit(null)
      setOpenPopup(false)
      setRecords(employeeService.getAllEmployees())
  
      setNotify({
        isOpen: true,
        message: 'Submitted Successfully',
        type: 'success'
      })
    }
    return (
        <>
            <ContentHeader
                text="Gestión de Secciones"
                cbo={false}
            />
            <Paper variant="outlined" sx={PaperStyle}>
                <Typography variant="h4" style={SubtitulosTable}> Secciones</Typography>
                <div style={{display: "flex", paddingRight: "5px", marginTop:20}}>
                {/* <Toolbar> */}
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
                    onClick = {() => setOpenPopup(true)}
                />
                {/* </Toolbar> */}
                </div>
                <BoxTbl>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                    {
                        recordsAfterPagingAndSorting().map(item => (
                        <StyledTableRow key={item.id}>
                            <StyledTableCell
                            align="right"
                            >
                            {item.id}
                            </StyledTableCell>
                            <StyledTableCell>{item.nombre}</StyledTableCell>
                            <StyledTableCell>{item.fechaFundacion}</StyledTableCell>
                            <StyledTableCell>{item.fechaModificacion}</StyledTableCell>
                            <StyledTableCell>{item.nombreDepartamento}</StyledTableCell>
                            <StyledTableCell>
                              {/* Accion editar */}
                              <Controls.ActionButton 
                                color="warning"
                                onClick={ () => {openInPopup(item)}}
                              >
                                <EditOutlinedIcon fontSize="small" />
                              </Controls.ActionButton>
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
                title="Nueva Sección"
            >
              <AgregarEditarSeccion 
                recordForEdit={recordForEdit}
                addOrEdit={addOrEdit}
              />
              {/*  <AgregarEditarSeccion/> */}
            </Popup>  
        </>
    )
}
