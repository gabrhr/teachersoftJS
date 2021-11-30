import React, {useState, useEffect} from 'react'
import { Grid, Typography, Stack } from '@mui/material';
import { Controls } from '../../../components/controls/Controls';
import { Form, useForm } from '../../../components/useForm';
import ContentHeader from '../../../components/AppMain/ContentHeader';
import Divider from '../../../components/controls/Divider';
import { Box } from '@mui/system';
import { TextField } from '@mui/material';
import useTable from '../../../components/useTable';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TableBody } from '@mui/material';
import { TableRow, TableCell } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

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

export default function NuevoProcesoForm() {
    
    const [records, setRecords] = useState([
        {
            nombre: 'Perez',
            correo: '@perez.com',
            justificacion: 'Por favor',
            seleccionado: false
        }
    ])

    const [row, setRow] = React.useState(false)
    const [solicitados, setSolicitados] = React.useState(0)
    const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records,tableHeaders, filterFn);

    function getRow ({...props}){
        //setOpenDetalle(true)
        setRow(props)
    }

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

    const codigo = '1342221'

    const addDocente = (docente) => {
        docente.seleccionado = !docente.seleccionado
        if(docente.seleccionado === true) setSolicitados(solicitados + 1)
        else setSolicitados(solicitados - 1)
        console.log(docente.seleccionado)
        console.log(solicitados)
    }

    return (
        <Form>
            <ContentHeader
                text="Nueva solicitud de descarga"
                cbo={false}
            />
            <Divider/>
            <Typography fontWeight="550"  sx={{color:"primary.light"}}>
                Código: {`${codigo}`}
            </Typography>
            <Divider/>
            <Box ml="75px">
                <Controls.DreamTitle
                    title={'Justificación: '}
                    size='20px'
                    lineheight='300%'
                    />
            </Box>
            <TextField
                id="outlined-multiline-static"
                fullWidth
                multiline
                rows={6}
                defaultValue={""}
                sx={{
                    pl: "78px",
                    mb: "20px",
                    width: "62.5%",
                    /* magia negra de gabs */
                    ".css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled": {
                        WebkitTextFillColor: "black"
                    }
                }}
            />
            <Grid container>
                <Grid item >
                <div style={{ display: "flex", paddingRight: "5px", marginTop: 20 }}>
                    <div style={{ width: "500px", marginRight: "50px" }}>
                        <Controls.Input
                                label="Buscar Solicitud por Nombre"
                                InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                                }}
                                sx={{ width: .2 }}
                                onChange={handleSearch}
                                type="search"
                            />
                    </div>
                    <div style={{ width: "140px", marginLeft: "850px", paddingTop:'25px' }}>
                            <Controls.DreamTitle
                                title={`Solicitados: ${solicitados}`}
                                size='20px'
                                lineheight='100%'
                                />
                    </div>
                </div>
                </Grid>
                <Grid>
                    
                </Grid>
                
                
            </Grid>
            
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
                            <TableCell sx = {{width: '1200px'}}>
                                {item.nombre}
                            </TableCell>
                            <TableCell> 
                                <Controls.Button
                                    text="Detalle"
                                    onClick = {()=>{}}
                                />
                            </TableCell>
                        </TableRow>
                        ))
                    }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </BoxTbl> 
        </Form>
    )
}
