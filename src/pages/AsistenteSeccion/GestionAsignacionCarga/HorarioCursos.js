import React, {useState} from 'react'
import { Grid, Stack, Typography } from '@mui/material';
import { DT } from '../../../components/DreamTeam/DT'
import { Controls } from '../../../components/controls/Controls'
import { useForm, Form } from '../../../components/useForm';
import Popup from '../../../components/util/Popup'
import useTable from "../../../components/useTable"
import ContentHeader from '../../../components/AppMain/ContentHeader';
import { Box, Paper, TableBody, TableRow, TableCell,InputAdornment } from '@mui/material';
/* ICONS */
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const initialFieldValues = {
    searchText: ''
}

const tableHeaders = [
    {
      id: 'id',
      label: 'SeccionID',
      numeric: true,
      sortable: true
    },
    {
      id: 'claveCurso',
      label: 'Clave',
      numeric: false,
      sortable: true
    },
    {
      id: 'nombreCurso',
      label: 'Nombre',
      numeric: false,
      sortable: true
    },
    {
      id: 'cargaHoraria',
      label: 'Carga Horaria',
      numeric: false,
      sortable: true
    },
    {
        id: 'horario',
        label: 'Horario',
        numeric: false,
        sortable: true
     },
     {
        id: 'tipoSesion',
        label: 'Tipo',
        numeric: false,
        sortable: true
     },
     {
        id: 'horaSesion',
        label: 'Hora-Sesion',
        numeric: false,
        sortable: true
     },
]
function createData(id, claveCurso, nombreCurso, cargaHoraria,
     horario, tipoSesion, horaSesion) {
    return {
        id, claveCurso, nombreCurso, cargaHoraria,
     horario, tipoSesion, horaSesion
    }
  }
  
const usuarios2 = [
    createData('0', 'INF231','Curso A',  '3 horas', '801', 'Clase', 'Vie 18:00 - 21:00'),
    createData('1', 'INF111', 'Curso A', '3 horas', '801', 'Clase', 'Vie 18:00 - 21:00'),
    createData('2', 'INF341', 'Curso A', '3 horas', '801', 'Clase', 'Vie 18:00 - 21:00'),
]

export default function HorarioCursos() {
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
    const {
        // values,
        // setValues,
        handleInputChange
    } = useForm(initialFieldValues);
    
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
              return items.filter(x => x.nombreCurso.toLowerCase()
                  .includes(target.value.toLowerCase()))
          }
        })
      }
    return (
        <Form>
            <Typography variant="h4"
                color="primary.light" style={SubtitulosTable}
            >
                Horario de Cursos
            </Typography>
            <Grid container>
                <Grid item xs={8}>
                    <Stack direction="row" align="left" spacing={0}>
                        <Controls.Input
                            name="searchText"
                            label="Buscar Cursos por el nombre"
                            onChange={handleSearch}
                            type="search"
                            size="small"
                            sx = {{
                                maxWidth: .7
                            }}
                        />
                        {/* <Controls.Button  
                            text={<SearchIcon/>}
                            size="small"
                            sx = {{
                                // display: "inline",
                                maxWidth: .05
                            }}
                        /> */}
                    </Stack>
                </Grid>
                {/* FIX:  left align */}
                <Grid item xs={4} align="right">
                    {/* FIX:  DT IconButton */}
                    <Controls.AddButton 
                        title="Agregar Nuevo Horario"
                        variant="iconoTexto"
                        /* onClick = {() => setOpenPopup(true)} */
                    />
                </Grid>
            </Grid>
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
                            <TableCell>{item.claveCurso}</TableCell>
                            <TableCell>{item.nombreCurso}</TableCell>
                            <TableCell>{item.cargaHoraria}</TableCell>
                            <TableCell>{item.horario}</TableCell>
                            <TableCell>{item.tipoSesion}</TableCell>
                            <TableCell>{item.horaSesion}</TableCell>
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
