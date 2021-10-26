import React, {useState} from 'react'
import { Controls } from '../../../components/controls/Controls'
import Popup from '../../../components/util/Popup'
import useTable from "../../../components/useTable"
import ContentHeader from '../../../components/AppMain/ContentHeader';
import { Box, Paper, TableBody, TableRow, TableCell,InputAdornment } from '@mui/material';
import AgregarEditarDepartamento from './AgregarEditarDepartamento'
/* ICONS */
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material'
import { StyledTableRow, StyledTableCell } from '../../../components/controls/StyledTable';

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
                    sx={{ width: .75 }}
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
                title="Nuevo Departamento"
            >
               <AgregarEditarDepartamento />
              {/*  <GestionUsuariosForm/> */}
            </Popup>  
        </>
    )
}
