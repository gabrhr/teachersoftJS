import React, {useState, useEffect} from 'react'
import { Controls } from '../../../components/controls/Controls'
import Popup from '../../../components/util/Popup'
import useTable from "../../../components/useTable"
import ContentHeader from '../../../components/AppMain/ContentHeader';
import { Box, Paper, TableBody, TableRow, TableCell,InputAdornment } from '@mui/material';
/* ICONS */
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material'
import AgregarEditarSeccion from './AgregarEditarSeccion'
import SeccionService from '../../../services/seccionService.js';
//import AuthService from '../../../services/authService.js';

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
]

const getSecciones = async () => {

  const dataSecc = await SeccionService.getSecciones(); 
  //dataSecc → id, nombre,  fechaFundacion, fechaModificacion,nombreDepartamento
  const secciones = [];
  dataSecc.map(seccion => (
    secciones.push({
      id: seccion.id.toString(),
      nombre: seccion.nombre,
      fechaFundacion: seccion.fecha_fundacion,
      fechaModificacion: seccion.fecha_modificacion,
      nombreDepartamento: seccion.departamento.nombre,
    })
    ));
  console.log(secciones);
  return secciones;
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
    //const [seccion, setSeccion] = useState([])
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const SubtitulosTable={display:"flex"}
    const PaperStyle={ borderRadius: '20px', pb:4,pt:2, px:2, 
    color:"primary.light", elevatio:0}

    useEffect(() => {
      getSecciones()
      .then (newSeccion =>{
        setRecords(prevRecords => prevRecords.concat(newSeccion));
        
        console.log(newSeccion);
        
        console.log(records);
      });
    }, [])
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
                <Box sx={{width: .25, display: "flex", justifyContent: 'flex-end'}}>
                    <Controls.Button 
                    text="Nueva Sección"
                    variant="iconoTexto"
                    startIcon={<AddIcon/>}
                    onClick = {() => setOpenPopup(true)}
                    />
                </Box>
                {/* </Toolbar> */}
                </div>
                <BoxTbl>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                    {
                        recordsAfterPagingAndSorting().map(item => (
                        <TableRow key={item.id}>
                            <TableCell
                            align="right"
                            >
                            {item.id}
                            </TableCell>
                            <TableCell>{item.nombre}</TableCell>
                            <TableCell>{item.fechaFundacion}</TableCell>
                            <TableCell>{item.fechaModificacion}</TableCell>
                            <TableCell>{item.nombreDepartamento}</TableCell>
                        </TableRow>
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
               <AgregarEditarSeccion />
              {/*  <AgregarEditarSeccion/> */}
            </Popup>  
        </>
    )
}
