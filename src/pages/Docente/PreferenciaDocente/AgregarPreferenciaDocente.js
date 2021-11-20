import { Avatar, Grid, InputAdornment, ListItem, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'
import { Controls } from '../../../components/controls/Controls'
import Popup from '../../../components/util/Popup'
import useTable from "../../../components/useTable"
import ContentHeader from '../../../components/AppMain/ContentHeader';
import { Input, Stack, Paper} from '@mui/material';
import * as XLSX from 'xlsx'
import horarioService from '../../../services/horarioService';
/* ICONS */
import { useForm, Form } from '../../../components/useForm';
import { useTheme } from '@mui/material/styles'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { set } from 'date-fns';
import personaService from '../../../services/personaService';
import cursoService from '../../../services/cursoService';
import { Box } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';

const tableHeaders = [
    {
      id: 'seleccionar',
      label: 'Seleccionar',
      numeric: false,
      sortable: true
    },
    {
      id: 'clave',
      label: 'Clave',
      numeric: false,
      sortable: false
    },
    {
      id: 'nombre',
      label: 'Nombre',
      numeric: false,
      sortable: true
    },
    {
      id: 'creditos',
      label: 'Créditos',
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
      id: 'horaSesion',
      label: 'Hora - Sesion',
      numeric: false,
      sortable: true
    }
]

const tipos_docente = [
    {
        "id": 0,
        "nombre": "No asignado",
    },
    {
        "id": 1,
        "nombre": "TC - Tiempo Completo",
    },
    {
        "id": 2,
        "nombre": "TPC - Tiempo Parcial Convencional",
    },
    {
        "id": 3,
        "nombre": "TPA - Tiempo Parcial por Asignaturas",
    }
]

export default function CargaMasivaDocente({setOpenPopUp}) {
    const [recordsX, setRecordsX] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const SubtitulosTable={display:"flex"}
    const PaperStyle={ borderRadius: '20px', pb:4,pt:2, px:2, 
    color:"primary.light", elevatio:0, marginTop: 3}
    
    const [open, setOpen] = useState(false);
    
    const theme = useTheme();

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(recordsX, tableHeaders, filterFn);
    
    useEffect(() => {
        //Obtenemos los horarios
        getHorario();
  
    }, [recordsX])

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

    const transformarHorarios = (request) => {
        const recordsX = []
        if(request){
            request.map(hor => {
                if(hor.sesiones){
                    recordsX.push({
                        "Clave": hor.curso_ciclo.curso.codigo,
                        "Nombre": hor.curso_ciclo.curso.nombre,
                        "Unidad": hor.curso_ciclo.curso.seccion.departamento.unidad.nombre,
                        "Creditos": hor.curso_ciclo.curso.creditos,
                        "Carga_Horaria": hor.sesiones[1] ? hor.sesiones[0].horas + hor.sesiones[1].horas : hor.sesiones[0].horas,
                        "Horario": hor.codigo,
                        "Tipo": hor.sesiones[0].secuencia ? "Laboratorio" : "Clase",
                        "Horas": hor.sesiones[0].horas
                    })
                    if(hor.sesiones[1]){
                        recordsX.push({
                            "Clave": hor.curso_ciclo.curso.codigo,
                            "Nombre": hor.curso_ciclo.curso.nombre,
                            "Unidad": hor.curso_ciclo.curso.seccion.departamento.unidad.nombre,
                            "Creditos": hor.curso_ciclo.curso.creditos,
                            "Carga_Horaria": hor.sesiones[1] ? hor.sesiones[0].horas + hor.sesiones[1].horas : hor.sesiones[0].horas,
                            "Horario": hor.codigo,
                            "Tipo": hor.sesiones[1].secuencia ? "Laboratorio" : "Clase",
                            "Horas": hor.sesiones[1].horas
                        })
                    }
                }
          })
        }
        return recordsX;
    }

    const getHorario = async () => {
        const request = await horarioService.getHorarios();
        const recordsX = transformarHorarios(request)
        setRecordsX(recordsX)
    }

    const onInputClick = (event) => {
        event.target.value = ''
    }

    const setEspecialidad = e =>{
        console.log(e.target.value)
    }

    const agregarHorarios = () =>{
        console.log("Se agregan los horarios")
    }

    const handleSubmit = () => {
        console.log("Se agregan los horarios")   
    }

    return (
      <Form onSubmit={handleSubmit}>
            <Grid container sx={{ mb: 3 }} display={recordsX ? "none" : "flex"}>
                <Grid item xs={8} >
                    <Controls.Input
                        label="Buscar Cursos por Nombre o Clave"
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <SearchIcon />
                            </InputAdornment>
                        )
                        }}
                        sx={{ width: .3 }}
                        onChange={handleSearch}
                        type="search"
                    />
                </Grid>
                <Grid item xs={.3} />
                <Grid item xs={3} sx={{ marginRight: theme.spacing(3) }}>
                    <Box sx={{ width: "200px", align: "right" }}>
                        <Controls.Select
                        name="especialidad"
                        label="Especialidad"
                        defaultValue={0}
                        onChange = {(e)=>{
                            setEspecialidad(e.target.value)
                        }}
                        options = {tipos_docente}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Paper variant="outlined" sx={PaperStyle}>
              <Typography variant="h4"
                  color="primary.light" style={SubtitulosTable}
              >
                  Cursos
              </Typography>
              <BoxTbl>
              <TblContainer>
                    <TblHead />
                    <TableBody>
                    {
                       recordsAfterPagingAndSorting().map(item => (
                        <TableRow key={item.id} >
                            <TableCell>
                            <Grid container>
                                <Grid item sm>
                                    <Typography sx={{paddingLeft:2.5}}>
                                        {`${item.nombre}`}
                                    </Typography>
                                </Grid>
                            </Grid>
                            </TableCell>
                            <TableCell>
                                <Typography >
                                    {item.creditos}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography >
                                    {item.horario}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        ))
                    }
                    </TableBody>
                </TblContainer>
                <TblPagination />
              </BoxTbl>
          </Paper>
          <Grid cointainer align="right" mt={5}>
              <div>
                  <Controls.Button
                      // disabled={true}
                      variant="disabled"
                      text="Cancelar"
                      /* onClick={resetForm} */
                      />
                  <Controls.Button
                      // variant="contained"
                      // color="primary"
                      // size="large"
                      text="Aceptar"
                      /* type="submit" */
                      onClick={agregarHorarios}
                  />
                  
              </div>
          </Grid>
          <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
          >
              <CircularProgress color="inherit" />
          </Backdrop>
      </Form>
  )
}
