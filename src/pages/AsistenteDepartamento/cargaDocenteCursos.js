import ContentHeader from "../../components/AppMain/ContentHeader"
import { Controls } from "../../components/controls/Controls"
import { useForm, Form } from "../../components/useForm" 
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import useTable from "../../components/useTable";
import { Alert, Grid, InputAdornment, Paper, TableBody, Typography } from '@mui/material'
import { StyledTableCell, StyledTableRow } from "../../components/controls/StyledTable";
import { DT } from '../../components/DreamTeam/DT'
import IconButton from '../../components/controls/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ExportCSV } from "../../components/PageComponents/ExportCSV";
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { Stack } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CargaDocenteCursoHorarios from './CargaDocenteCursoHorarios'
import React from "react";
import CursoService from "../../services/cursoService";
import HorarioService from "../../services/horarioService";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const getSeccionCollection = [
    { id: '1', title: 'Todas las Facultades' },
    { id: '2', title: 'Departamento Académico de Ciencias' },
  ]

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
      id: 'carga',
      label: 'Carga',
      numeric: false,
      sortable: true
    },
    {
      id: 'horarios',
      label: 'Horarios',
      numeric: false,
      sortable: true
    },
    {
      id: 'detalleCurso',
      label: '',
      numeric: false,
      sortable: false
    },
  ]

export default function CargaDocenteCursos(){

  const [openBackDrop, setOpenBackDrop] = useState(false);

  //LLENADO DE LA LISTA DE CURSOS1
  const fillCursos = async () => {
    setOpenBackDrop(true)
    //En este caso la seccion sería unicamente el de ing informática - MUST: Hacerlo dinámico
    let dataCur = await CursoService.getCursosxSeccionCodigoNombre(3,"");
    const ciclo = window.localStorage.getItem("ciclo"); 
    let horarios, horCiclo = []; //los horarios y los horarios que se meterán al ciclo
    //dataSecc → id, nombre,  fechaFundacion, fechaModificacion,nombreDepartamento
    const cursos = [];
    if(!dataCur) dataCur = []
    for(let cur of dataCur) {
      horCiclo = [];  //se reinician los horarios
      horarios = await HorarioService.listarPorCursoCiclo(cur.id , ciclo);
      if(!horarios)  continue; //Si se retorna un promise vacio - no se lista el curso
      
      //Adicionalmente a esto
      for(let hor of horarios){
        horCiclo.push({
          "id": hor.id,
          "codigo": hor.codigo,
          "ciclo":{
            "id": ciclo,
          } ,
          "curso":{
            "id": cur.id,
          },
          "sesiones": hor.sesiones
        })
      }
      let horasCurso = 0
      const horasC = horCiclo[0]? horCiclo[0].sesiones.map(ses=>ses.horas) : []

      for(let i = 0; i < horasC.length; i++){
        horasCurso += horasC[i]
      }
      //Hacemos la creación y verificación de los estados
      cursos.push({
        "id": cur.id,
        "nombre": cur.nombre,
        "codigo": cur.codigo,
        "creditos": cur.creditos,
        "seccion": {
          "id": cur.seccion.id,
          "nombre": cur.seccion.nombre,
          "departamento":{
            "id":cur.seccion.departamento.id,
            "nombre":cur.seccion.departamento.nombre,
          }
        },
        "carga": horasCurso,
        "horarios": horCiclo
      })
  
    }
    console.log(cursos);
    setOpenBackDrop(false)
    return cursos;
  }

  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
  const [records, setRecord] = useState([])
  const SubtitulosTable = { display: "flex" }
  const PaperStyle = { borderRadius: '20px', pb: 4, pt: 2, px: 2, color: "primary.light", elevatio: 0 }
  const [recordsForEdit, setRecordForEdit] = useState()
  const [horarios, setHorarios] = useState(false)   // Mostrar la tabla horarios

    const {
        values,
        // setValues,
        handleInputChange
      // eslint-disable-next-line react-hooks/rules-of-hooks
      } = useForm(getSeccionCollection[0]);

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

          const openInPopup = item => {
            setRecordForEdit(item)
            setHorarios(true)
            console.log("curso seleccionado: ", item)
          }

          React.useEffect(() => {
            fillCursos()
            .then (newCur =>{
              if(newCur)
                setRecord(newCur);
              //console.log(newCur);
            });
          }, [])

    // const cursosExportar = (rec) => {
    //   let cursos = []
    //   cursos=(rec.map(cur=>[cursos, {
    //                 "Clave": cur.codigo,
    //                 "Nombre": cur.nombre,
    //                 "Facultad": cur.seccion ? cur.seccion.departamento.nombre : "",
    //                 "Carga": cur.carga,
    //                 "Horarios": cur.horarios? cur.horarios.length : 0
    //   }]))
      
    //   return cursos
    // }

    return(
      <>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={openBackDrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Form>
            <ContentHeader text={horarios?"Carga docente - Curso":"Carga docente"} cbo={false}/>
            {horarios? (
                <>
                <Controls.Button
                  variant="outlined"
                  text="Regresar"
                  size="small"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => { setHorarios(false) }}
                />
                <div style={{ marginLeft: 3, marginTop: 20, marginBottom: 20 }}>
                  <Controls.Input
                    label="Curso"
                    // value={`${recordsForEdit.codigo} - ${recordsForEdit.nombre}`}
                    // disabled
                  />
                </div>
              </>
            ):(
                <Grid container xs spacing = {0}>
                {/* <Stack direction="row" spacing = {4}> */}
                    <Grid item xs={3.7}>
                        <Controls.Select
                        name="id"
                        label="Facultades"
                        value={values.id}
                        onChange={handleInputChange}
                        options={getSeccionCollection}
                        type="contained"
                        // displayNoneOpt
                        />
                    </Grid>
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
                    <Grid item xs={1} sx = {{paddingLeft: 9}} justifyContent = 'end' alignItems = 'end'>
                        <ExportCSV csvData={/*cursosExportar(records)*/ records} fileName={'Carga Horaria'} text="Exportar" size="large"
                                    endIcon={<CloudDownloadOutlinedIcon/>}/>
                    </Grid>
                {/* </Stack> */}
            </Grid>
            )}
            
            <Paper variant="outlined" sx={PaperStyle}>
                {horarios? (
                    <>
                        <Typography variant="h4" style={SubtitulosTable}>
                        Lista de Horarios
                        </Typography>
                        {console.log(recordsForEdit)}
                        <CargaDocenteCursoHorarios recordForEdit = {recordsForEdit} setRecordForEdit = {setRecordForEdit} />
                    </>
                ):(
                    <>
                        <Typography variant="h4" style={SubtitulosTable}>
                            Preferencias de dictado por curso
                        </Typography>
                        <BoxTbl>
                        <TblContainer>
                            <TblHead />
                            <colgroup>
                                <col style={{ width: '5%' }} />
                                <col style={{ width: '30%' }} />
                                <col style={{ width: '25%' }} />
                                <col style={{ width: '12%' }} />
                                <col style={{ width: '23%' }} />
                            </colgroup>
                            <TableBody>
                            {
                                recordsAfterPagingAndSorting().map(item => (
                                <StyledTableRow key={item.id}>
                                    <StyledTableCell>{item.codigo}</StyledTableCell>
                                    <StyledTableCell>{item.nombre}</StyledTableCell>
                                    <StyledTableCell>{item.seccion ? item.seccion.departamento.nombre : ""}</StyledTableCell>
                                    <StyledTableCell>{item.carga}</StyledTableCell>  
                                    <StyledTableCell>{item.horarios.length}</StyledTableCell>
                                    <StyledTableCell>
                                    <IconButton size="small"
                                        onClick={() => { openInPopup(item) }}
                                    >
                                        <ArrowForwardIosIcon fontSize="small" />

                                    </IconButton>
                                    </StyledTableCell>

                                </StyledTableRow>
                                ))
                            }
                            </TableBody>
                        </TblContainer>
                        <TblPagination />
                        </BoxTbl>
                    </>
                )}
            </Paper>
        </Form>
      </>
    )
}