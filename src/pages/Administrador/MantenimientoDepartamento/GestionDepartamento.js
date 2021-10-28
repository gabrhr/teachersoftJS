import React, {useState} from 'react'
import { Controls } from '../../../components/controls/Controls'
import Popup from '../../../components/util/Popup'
import useTable from "../../../components/useTable"
import ContentHeader from '../../../components/AppMain/ContentHeader';
import { Box, Paper, TableBody, TableRow, TableCell,InputAdornment } from '@mui/material';
import AgregarEditarDepartamento from './AgregarEditarDepartamento'
/* ICONS */
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material'
import { StyledTableRow, StyledTableCell } from '../../../components/controls/StyledTable';
import departamentoService from '../../../services/departamentoService';
import * as employeeService from '../../../services/employeeService'
import { Form } from '../../../components/useForm'

const tableHeaders = [
    {
      id: 'id',
      label: 'DepartamentoID',
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
      id: 'correo',
      label: 'Correo Electrónico',
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
      id: 'actions',
      label: 'Acción',
      numeric: false,
      sortable: false
    }
]
  
function createData(id, nombre, correo, fechaFundacion, fechaModificacion) {
    return {
        id, nombre, correo, fechaFundacion, fechaModificacion,
    }
  }
  
const usuarios2 = [
    createData('0', 'Departamento 1', 'dep1@pucp.edu.pe', '2021-09-30 01:14 pm ', '2021-09-30 01:14 pm '),
    createData('1', 'Departamento 2', 'dep1@pucp.edu.pe', '2021-09-30 01:14 pm ', '2021-09-30 01:14 pm '),
    createData('2', 'Departamento 3', 'dep1@pucp.edu.pe', '2021-09-30 01:14 pm ', '2021-09-30 01:14 pm '),
]

export default function GestionDepartamento() {
    const [openPopup, setOpenPopup] = useState(false)
    const [records, setRecords] = useState(usuarios2)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
    const SubtitulosTable={display:"flex"}
    const PaperStyle={ borderRadius: '20px', pb:4,pt:2, px:2, 
    color:"primary.light", elevation:0}
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records, tableHeaders, filterFn);

    const openInPopup = item => {
      setRecordForEdit(item)
      setOpenPopup(true)
    }

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
    
    /* const addOrEdit = (departamento, resetForm) => {
      if (departamento.id == 0)
        departamentoService.registerDepartamento(departamento)
      else
        departamentoService.updateDepartamento(departamento)
      resetForm()
      setRecordForEdit(null)
      setOpenPopup(false)
      setRecords(getDepartamentos.getAllEmployees())
  
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
                text="Gestión de Departamentos"
                cbo={false}
            />
            <Paper variant="outlined" sx={PaperStyle}>
                <Typography variant="h4" style={SubtitulosTable}>
                   Departamentos
                </Typography>
                <div style={{display: "flex", paddingRight: "5px", marginTop:20}}>
                {/* <Toolbar> */}
                <Controls.Input
                    label="Buscar Departamentos por Nombre"
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                    }}
                    sx={{ width: .75, visibility: "hidden" }}
                    onChange={handleSearch}
                    type="search"
                />
 
                {/* <Controls.AddButton 
                    title="Agregar Nuevo Departamento"
                    variant="iconoTexto"
                    onClick = {() => setOpenPopup(true)}
                /> */}
      
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
                            <StyledTableCell>{item.correo}</StyledTableCell>
                            <StyledTableCell>{item.fechaFundacion}</StyledTableCell>
                            <StyledTableCell>{item.fechaModificacion}</StyledTableCell>
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
            {/* Modal */}
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Nuevo Departamento"
            >
              <AgregarEditarDepartamento 
                recordForEdit={recordForEdit}
                addOrEdit={addOrEdit}
              />
              {/*  <GestionUsuariosForm/> */}
            </Popup>  
        </>
    )
}
