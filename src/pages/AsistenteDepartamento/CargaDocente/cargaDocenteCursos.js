import ContentHeader from "../../../components/AppMain/ContentHeader"
import { Controls } from "../../../components/controls/Controls"
import { useForm, Form } from "../../../components/useForm" 
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import useTable from "../../../components/useTable";
import { Alert, Grid, InputAdornment, Paper, TableBody, Typography } from '@mui/material'
import { StyledTableCell, StyledTableRow } from "../../../components/controls/StyledTable";
import IconButton from '../../../components/controls/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React from "react";
import CursoService from "../../../services/cursoService";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import SeccionService from "../../../services/seccionService";
import { Link } from 'react-router-dom';



const tableHeaders = [
  // {
  //   id: 'id',
  //   label: 'DepartamentoID',
  //   numeric: true,
  //   sortable: true
  // },
  {
    id: 'clave',
    label: 'Clave',
    numeric: false,
    sortable: true
  },
  {
    id: 'nombre',
    label: 'Nombre del Curso',
    numeric: false,
    sortable: true
  },
  {
    id: 'facultad',
    label: 'Facultad',
    numeric: false,
    sortable: true
  },
  {
    id: 'sección',
    label: 'Seccion',
    numeric: false,
    sortable: true
  },
  {
    id: 'créditos',
    label: 'Créditos',
    numeric: false,
    sortable: false
  },
]


//LLENADO DE LA LISTA DE SECCIONES
const getSeccionCollection =  async () => {
  //{ id: '1', title: 'Todas las Secciones' },
  const user = JSON.parse(localStorage.getItem("user"))
  let dataSecc = await SeccionService.getSeccionxDepartamento(user.persona.departamento.id);
  
  if(!dataSecc) dataSecc = [];

  const secciones = [];

  secciones.push({
    "id": 0,
    "nombre": "Todas las secciones",
  })
  for(let sec of dataSecc) {
    //Hacemos la creación y verificación de los estados
    secciones.push({
      "id": sec.id,
      "nombre": sec.nombre,
    })
  }

  return secciones;
}

//LLENADO DE LA LISTA DE CURSOS
const fillCursos = async (ciclo, seccion, secciones) => {

  if(!ciclo) ciclo = await window.localStorage.getItem("ciclo");
  if(!seccion) seccion = 0;
  let dataCur = [];

  if(seccion === 0){
    for(let s of secciones){
      const curSeccion = await CursoService.listarPorCicloPorSeccion(parseInt(ciclo), s.id);
      if(curSeccion.length) dataCur.push(curSeccion);
    }
  }
  else{
    const curSeccion = await CursoService.listarPorCicloPorSeccion(parseInt(ciclo), seccion);
    if(curSeccion.length) dataCur.push(curSeccion);
  }
  
  if(!dataCur) dataCur = [];

  const cursos = [];
  for(let itemcur of dataCur){
    for(let cur of itemcur) {
      if(cur.estado_tracking){
        cursos.push({
          "id": cur.curso.id,
          "nombre": cur.curso.nombre,
          "codigo": cur.curso.codigo,
          "creditos": cur.curso.creditos,
          "seccion": {
            "id": cur.curso.seccion.id,
            "nombre": cur.curso.seccion.nombre,
            "departamento":{
              "id":cur.curso.seccion.departamento.id,
              "nombre":cur.curso.seccion.departamento.nombre,
            }
          },

        })
      }
    }
  }
  return cursos;
}

export default function CargaDocenteCursos(){
  const [secciones, setSecciones] = useState([]);
  const [seccion, setSeccion] = useState(0);
  const [cursosCargados, setCursosCargados] = useState(false)
  const [ciclo, setCiclo] = useState ();

  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
  const [records, setRecord] = useState([])
  const SubtitulosTable = { display: "flex" }
  const PaperStyle = { borderRadius: '20px', pb: 4, pt: 2, px: 2, color: "primary.light", elevatio: 0 }
  const [recordsForEdit, setRecordForEdit] = useState()
  const [row, setRow] = useState(false) //Sacamos la linea seleccionada

  const initialFieldValues = {
      id: '',
      nombre: ''
  }

  function getRow({ ...props }) {
      setRow(props)
  }

  const {
      values,
      setValues,
      handleInputChange
    // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useForm(initialFieldValues);

  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
      fn: items => {
        if (target.value === "")
          /* no search text */
          return items
        else
          return items
            .filter(x => x.nombre.toLowerCase()
            .includes(target.value.toLowerCase()))
      }
    })
  }

  const {
      TblContainer,
      TblHead,
      TblPagination,
      recordsAfterPagingAndSorting,
      BoxTbl
  } = useTable(records, tableHeaders, filterFn);

  React.useEffect(() => {
    setCursosCargados(false);
    fillCursos(ciclo, seccion, secciones)
    .then (newCur =>{
      if(newCur)
        setRecord(newCur);
        setCursosCargados(true);
    });
  }, [seccion, ciclo])

  React.useEffect(() => {
    getSeccionCollection()
    .then (newSecc =>{
      if(newSecc){
        setSecciones(newSecc);
        setValues(newSecc[0]);  //Para que se coja predeterminado dicho valor
      }
    });
  }, [] )//Solo al inicio para la carga de secciones

  React.useEffect(()=>{
      if(values)  setSeccion(values.id);
      else{
        if (setValues) setSeccion(0) 
        //Para indicar que se señalan a todas las secciones que le pertencen al departamento
      }  
  },[values]) //Cada que cambia los values para la seccion

  return(
        <Form>
            <ContentHeader 
              text={"Carga docente del Ciclo"} 
              cbo= {true}
              records = {ciclo}
              setRecords = {setCiclo}
            />(
            <Grid container xs spacing = {4}>
            {/* <Stack direction="row" spacing = {4}> */}
                <Grid item xs={6} sx = {{paddingLeft: 3}}>
                    <Controls.Input
                    label="Buscar Cursos por Nombre"
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
                <Grid item xs={3}/>
                <Grid item xs={3}>
                    <Controls.Select
                    name="id"
                    label="Secciones"
                    value={values.id}
                    onChange={handleInputChange}
                    options={secciones}
                    type="contained"
                    // displayNoneOpt
                    />
                </Grid>
            </Grid>

            <Paper variant="outlined" sx={PaperStyle}>
                <Typography variant="h4" style={SubtitulosTable}>
                    Preferencias de dictado por curso
                </Typography>
                <BoxTbl>
                {cursosCargados ? (
                  <TblContainer>
                  <TblHead />
                    <colgroup>
                      <col style={{ width: '5%' }} />
                      <col style={{ width: '30%' }} />
                      <col style={{ width: '25%' }} />
                      <col style={{ width: '25%' }} />
                      <col style={{ width: '5%' }} />
                    </colgroup>
                    <TableBody>
                    {
                        recordsAfterPagingAndSorting().map(item => (
                        <StyledTableRow key={item.id}>
                            <StyledTableCell>{item.codigo}</StyledTableCell>
                            <StyledTableCell>{item.nombre}</StyledTableCell>
                            <StyledTableCell>{item.seccion ? item.seccion.departamento.nombre : ""}</StyledTableCell>
                            <StyledTableCell>{item.seccion ? item.seccion.nombre : ""}</StyledTableCell>  
                            <StyledTableCell align = "center">{item.creditos}</StyledTableCell>
                            <StyledTableCell>
                            <Link to ={{
                                pathname:`/ad/asignacionCarga/Cargadocente/horarios`,
                                state:{
                                    curso: item
                                }
                            }}  style={{ textDecoration: 'none' }}>
                            <IconButton size="small"
                              onClick={() => { getRow(item) }}
                            >
                                <ArrowForwardIosIcon fontSize="small" />

                            </IconButton>
                            </Link>
                            </StyledTableCell>
                          <LinearProgress />
                        </StyledTableRow>
                        ))
                    }
                    </TableBody>
                    </TblContainer>
                ) : (
                  <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                  </Box>
                )}
                </BoxTbl>
                <TblPagination />
            </Paper>
        </Form>
    )
}