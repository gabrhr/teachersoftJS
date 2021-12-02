import React, {useState, useEffect} from 'react'
import { Grid, Typography, Stack } from '@mui/material';
import { Controls } from '../../../components/controls/Controls';
import { Form, useForm } from '../../../components/useForm';
import ContentHeader from '../../../components/AppMain/ContentHeader';
import Divider from '../../../components/controls/Divider';
import { Box } from '@mui/system';
import { TextField, Avatar } from '@mui/material';
import useTable from '../../../components/useTable';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TableBody } from '@mui/material';
import { TableRow, TableCell } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Popup from '../../../components/util/Popup'
import SolicitudDescargaForm from '../../Docente/DeudasYDescargas/SolicitudDescargaForm';
import SaveIcon from '@mui/icons-material/Save';
import ModalGuardarSolicitudActual from './ModalGuardarSolicitudActual'
import {useHistory} from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ModalGuardarAprobados from './ModalGuardarAprobados'
import { Alert } from '@mui/material';
const tableHeaders = [
    
    {
        id: 'seleccionar',
        label: '',
        numeric: false,
        sortable: false
    },
    {
        id: 'nombre',
        label: 'Nombre del docente',
        numeric: false,
        sortable: true
    },
    {
        id: 'justificacion',
        label: 'Justificación',
        numeric: false,
        sortable: false
    },
]

export default function ModalAprobados({setOpenAprobados}){

    const [records, setRecords] = useState([
        {
            nombre: 'Perez',
            correo: '@perez.com',
            justificacion: 'Por favor',
            seleccionado: true,
            tipo_bono: 1
        },
        {
            nombre: 'José',
            correo: '@gmail.com',
            justificacion: 'Por favor1',
            seleccionado: true,
            tipo_bono: 2
        },
        {
            nombre: 'Otro José',
            correo: '@puke.com',
            justificacion: 'Por favor2',
            seleccionado: true,
            tipo_bono: 1
        }
    ])

    const [solicitados, setSolicitados] = React.useState(2)
    const [descargas, setDescargas] = React.useState(records.length)
    

    

    const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records,tableHeaders, filterFn);

    

    const handleSearch = e => {
        let target = e.target;
        /* React "state object" (React.useState()) doens't allow functions, only
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

    const history = useHistory()

    const addDocente = (docente) => {
        docente.seleccionado = !docente.seleccionado
        if(docente.seleccionado === true) setDescargas(descargas + 1)
        else setDescargas(descargas - 1)
        console.log(docente.seleccionado)
        console.log(solicitados)
    }

    return (
        <>
                <div style={{ display: "flex", paddingRight: "5px", marginTop: 20 }}>
                    <div style={{ width: "480px", marginRight: "1px" }}>
                        <Controls.Input
                                label="Buscar Solicitud por Nombre"
                                
                                InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                                }}
                                sx={{ width: .9 }}
                                onChange={handleSearch}
                                type="search"
                            />
                    </div>
                    <div style={{ width: "140px", marginLeft: "50x", paddingTop:'25px' }}>
                            <Controls.DreamTitle
                                title={`Solicitados: ${solicitados}`}
                                size='20px'
                                lineheight='100%'
                                />
                    </div>
                    <div style={{ width: "150px", marginLeft: "50px", paddingTop:'25px' }}>
                            <Controls.DreamTitle
                                title={`N° Descargas: ${descargas}`}
                                size='20px'
                                lineheight='100%'
                                />
                    </div>
                </div>
            
            <BoxTbl>
                <TblContainer>
                    <TblHead/>
                    <TableBody>
                    {
                       recordsAfterPagingAndSorting().map((item,index) => (
                        <TableRow>
                            <TableCell sx = {{width: '70px'}}>
                                <Controls.RowCheckBox sx = '1' onClick = {()=>{addDocente(item)}} checked = {item.seleccionado}>
                                    <EditOutlinedIcon fontSize="small" />
                                </Controls.RowCheckBox>
                            </TableCell>
                            <TableCell sx = {{width: '533px'}}>
                                {item.nombre}
                            </TableCell>
                            <TableCell> 
                                <Alert icon={false} variant="outlined" severity="info" sx={{borderRadius:"25px"}}>
                                    {
                                        item.tipo_bono===1? "Bono de Investigación":"Bono de Docencia"
                                    }
                                </Alert>
                            </TableCell>
                        </TableRow>
                        ))
                    }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </BoxTbl> 
            <Grid conteiner >
                <Grid item align = "right" marginTop={5} >
                    <Controls.Button
                        text="Aprobar descargas"
                        endIcon={<SaveIcon/>} 
                        disabled = {descargas !== solicitados}
                        onClick={(e)=>{
                            // guardarSolicitudActual()
                            setOpenAprobados(false)
                            // history.push("/cord/asignacionCarga/deudaYDescarga");
                        }} 
                        />
                </Grid>
            </Grid>
        </>
    )
}