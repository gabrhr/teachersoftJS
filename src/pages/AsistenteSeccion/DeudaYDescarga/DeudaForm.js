import { Avatar, Grid, InputAdornment, ListItem, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import React, { useState, useEffect} from 'react'
import { Controls } from '../../../components/controls/Controls'
import useTable from '../../../components/useTable'
import personaService from '../../../services/personaService';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
/* ICONS */
import SearchIcon from '@mui/icons-material/Search';

const tableHeaders = [
    {
      id: 'docente',
      label: 'Docente',
      numeric: false,
      sortable: true
    },
    {
      id: 'especialidad',
      label: 'Especialidad',
      numeric: false,
      sortable: false
    },
    {
      id: 'carga',
      label: 'Carga Horaria',
      numeric: false,
      sortable: true
    },{
      id: 'deuda',
      label: 'Deuda Horaria',
      numeric: false,
      sortable: true
    },
    /* {
      id: 'bono',
      label: 'Bonos',
      numeric: false,
      sortable: false
    } */
]
  
export default function DeudaForm() {
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records, tableHeaders, filterFn);
    
    useEffect(() => {
        //Obtenemos las secciones
        
        getProfesores();
  
      }, [records])

      function transformarDocentes (request){
        const recordsX = []
        request.map(hor => {
            recordsX.push({
                "id": hor.id,
                "url_foto": hor.foto_URL ? hor.foto_URL : 'static/images/avatar/1.jpg',
                "nombres": hor.nombres,
                "apellidos": hor.apellidos,
                "especialidad": hor.seccion.nombre,
                "correo": hor.correo,
                "deuda": hor.deuda_docente,
                "carga": hor.cargaDocente
            })
        })
        return recordsX;
    }

    const getProfesores = async () =>{
        const request = await personaService.getPersonasxTipo(1);
        const recordsX = transformarDocentes(request);
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
      
    return (
        <>
            <div style={{display: "flex", paddingRight: "5px", marginTop:20}}>
                {/* <Toolbar> */}
                <Controls.Input
                    label="Buscar Docentes por Nombre"
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
            </div>
            <BoxTbl>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                    {
                       recordsAfterPagingAndSorting().map(item => (
                        <TableRow key={item.id}>
                            <TableCell>
                            <Grid container>
                                <Grid item pl={.5}>
                            <Avatar>
                                {item.url_foto !== ("static/images/avatar/1.jpg" || "")
                                  ? <img height = "125%" width = "125%" text-align ="center" alt = "" 
                                    src={item.url_foto}></img>
                                  :  <AccountCircleIcon/>}
                            </Avatar>
                                </Grid>
                                <Grid item sm>
                                    <Typography sx={{paddingLeft:2.5}}>
                                        {`${item.apellidos}, ${item.nombres}`}
                                    </Typography>
                                    <div style={{paddingLeft:20}}>
                                        {item.codigo}
                                    </div>
                                </Grid>
                            </Grid>
                            </TableCell>
                            <TableCell>
                                <Typography >
                                    {item.especialidad}
                                </Typography>
                                <div >
                                    {item.correo}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Typography display="inline">
                                    Carga del ciclo: {'\u00A0'}
                                </Typography>
                                <Typography display="inline" sx={{color:"#41B9E4"}}>
                                    {item.carga} horas
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography style={{color:"red"}}>
                                    Deuda horaria: {item.deuda} hora(s)
                                </Typography>
                            </TableCell>
                            {/* <TableCell>{item.bono}</TableCell> */}
                            
                        </TableRow>
                        ))
                    }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </BoxTbl>
        </>
    )
}
