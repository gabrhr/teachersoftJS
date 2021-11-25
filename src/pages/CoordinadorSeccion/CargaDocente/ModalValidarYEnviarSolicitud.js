import {DT} from '../../../components/DreamTeam/DT';
import { Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { Box, Divider, TableRow, TableCell,InputAdornment } from '@mui/material';
import { Controls } from '../../../components/controls/Controls'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Popup from '../../../components/util/Popup';
import ModalConfirmacionValidacion from './ModalConfirmacionValidacion';
import { useState } from 'react';
import {PDFDownloadLink} from '@react-pdf/renderer'
import ReporteCargaHorarios from './ReporteCargaHorarios'
import HorarioService from '../../../services/horarioService';
import CursoService from '../../../services/cursoService';
import React from 'react'

const hallarDetalle = (sesiones) => {
    let hor_clases = 0, hor_labs = 0;
    //Vamos a desintegrar el horario para hallar su detalle
    for (let ses of sesiones) {
      ses.secuencia ? (hor_clases = ses.horas) : (hor_labs = ses.horas);
    }
    const detalle_lab = hor_labs ? `\n Horas de Laboratorio: ${hor_labs}` : ``;
    const detalle = `Horas de Clase: ${hor_clases} ${detalle_lab}`;
    return detalle;
  }
  
  const hallarEstado = (sesiones) => {
    let estado;
    //Vamos a desintegrar el horario para hallar su estado
    for (let ses of sesiones) {
      let sumaHorasdoc = 0;
      if(ses.sesion_docentes){
        for (let docente of ses.sesion_docentes){
          sumaHorasdoc += docente.horas_dictado_docente_sesion; 
        }
      }
      //En el caso de que sea mayor o igual - las horas se han cumplido - caso contrario o = 0.
      (sumaHorasdoc >= sesiones[0].horas) ? estado = "Horas Asignadas"  : estado = "Faltan Horas"
  
      if(estado === "Faltan Horas") break;
    }
  
    return estado;
  }
  
  const actualizarCursoCiclo = async (curso_ciclo)=> {
  
    if(curso_ciclo.cantidad_horarios !== 2){
      const newCC = {
        "id": curso_ciclo.id,
        "ciclo": {
          "id": curso_ciclo.ciclo.id,
        },
        "curso": {
          "id": curso_ciclo.curso.id,
        },
        "cantidad_horarios": 2, //Se actualiza al nuevo estado
        "estado_tracking": curso_ciclo.estado_tracking,
      }
      
      const request = await CursoService.updateCursoCiclo(newCC);
  
    }
  }

  const fillHorarios = async (curso) => {

    const dataHor = await HorarioService.listarPorCursoCiclo(curso.id , window.localStorage.getItem("ciclo"));
  
    const dataHorarios = [];
    let horMoment = 0, horTotal = 0;
    for(let hor of dataHor){
        //Haremos el detalle
        const detalle = await hallarDetalle(hor.sesiones);
        //Haremos el estado
        const estado = await hallarEstado(hor.sesiones);
  
        if(estado === "Horas Asignadas"){
          //Sumamos un contador que coincida con la cantidad de horarios
          horMoment++;
        }
        dataHorarios.push({
          "id": hor.id,
          "codigo": hor.codigo,
          "curso_ciclo": hor.curso_ciclo,
          "ciclo": hor.curso_ciclo.ciclo,
          "curso": hor.curso_ciclo.curso,
          "sesiones": hor.sesiones,
          "detalle": detalle,
          "estado": estado,
        })
        horTotal++;
    }
    if(horTotal === horMoment && horTotal > 0)  
        await actualizarCursoCiclo(dataHor[0].curso_ciclo);
  
    return dataHorarios;
  }

const validateItems = (cursos) => { 
  for(let cur of cursos){
    if(cur.estado !== "Sin horarios"){
      const cursocicloValidado = {
        "id": cur.id_cursociclo,
        "curso": cur.curso,
        "ciclo": cur.ciclo,
        "estado_tracking": 1,
        "cantidad_horarios": cur.cantidad_horarios,
      }
      console.log(cursocicloValidado);
    }
  }

  console.log(cursos);
}

export default function ModalValidarYEnviarSolicitud({solicitud, asunto, setAsunto, cuerpo, setCuerpo, setOpenValYEnvSolPopup,
                                                    openValYEnvSolPopup, openConfVal, setOpenConfVal, cursos}){
    const correo = "@efekoefkeof"
    const seccion = "Ingeniería - Informática"
    // const [openConfVal, setOpenConfVal] = useState(false)
    const [cursosHorarios, setCursosHorarios] = useState([])
    const [openReporte, setOpenReporte] = useState(false)

    let curHor = []

    React.useEffect(() => {
        cursos.map((curso)=>
        fillHorarios(curso)
          .then(horarios => {
            curHor.push(
                {
                    curso: curso,
                    horarios: horarios
                }
            )      
          }))
        const oficial = curHor  
        //setCursosHorarios([{curso:{nombre: 'h'}}, {curso:{nombre: 'h2'}}, {curso:{nombre: 'h3'}}])
        setCursosHorarios(oficial)
        
        //console.log("POPEODPEODPSODPASODPSODAPO: ", cursosHorarios)  
      }, [])

    return(
        <>
            {/* <DT.Title size="medium" text={'Correo de la unidad: ' + `${correo}`} />
            <Typography variant = "subtitle1">
                Sección: {seccion} 
            </Typography>
            <Divider  flexItem/>
            <Box ml="75px" sx={{paddingTop: '2%'}}>
                <Grid container>
                    <Grid item xs={0.1}>
                        <Controls.DreamTitle
                            title ={'Asunto: '}
                            size = '20px'
                            lineheight = '300%'
                        />
                    </Grid>
                    <Grid item xs={11}>
                        <TextField
                            id="outlined-multiline-static"
                            fullWidth 
                            multiline
                            rows={1}
                            sx={{
                                pl:"78px",
                                mb:"20px"
                            }}
                            value = {asunto}
                            onChange = {(e)=>{setAsunto(e.target.value)}}
                        />
                    </Grid>
                </Grid>
            </Box>
            <TextField
                id="outlined-multiline-static"
                fullWidth 
                multiline
                rows={5}
                sx={{
                    pl:"78px",
                    mb:"20px"
                }}
                value = {cuerpo}
                onChange = {(e)=>{setCuerpo(e.target.value)}}
            />
            <Divider  flexItem/> */}
             <Typography variant = "h4" color = "primary">
                Sección: {seccion} 
            </Typography>

            <Divider  flexItem/>

             <Typography variant = "subtitle1" align = "Center">
                Para la finalización del proceso, se procederá a Generar el Reporte y Validar los horarios asignados. 
            </Typography>

            <Grid container>
                <Grid item xs={6} align="left" mt={5}>
                    <div>
                        {/* {console.log("POPEODPEODPSODPASODPSODAPO DOS: ", cursosHorarios)} */}
                            <Controls.Button
                                // variant="contained"
                                // color="primary"
                                // size="large"
                                text="Generar reporte"
                                endIcon = {<EmailOutlinedIcon/>}
                            >
                            </Controls.Button>
                    </div>
                    {openReporte ? (
                        <Box sx={{paddingRight: '3%'}}>
                        <Typography variant = "subtitle1" sx={{color: 'red', paddingLeft: '5%'}}>
                            ¿Está seguro?
                        </Typography>
                        <PDFDownloadLink document = {<ReporteCargaHorarios cursos={cursosHorarios}/>} fileName = "Reporte-de-horarios.pdf">
                          <Controls.Button
                              text="Sí"
                              onClick={() => {}}
                          />
                        </PDFDownloadLink>
                        <Controls.Button
                            text="No"
                            onClick={()=>{
                                setOpenReporte(false)
                            }}
                        />
                        </Box>
                    ) : (<></>)}
                </Grid>
                <Grid item xs={6} align="right" mt={5}>
                    <div>
                        <Controls.Button
                            // variant="contained"
                            // color="primary"
                            // size="large"
                            text="Enviar y validar"
                            endIcon = {<EmailOutlinedIcon/>}
                            onClick = {()=>{validateItems(cursos)}}
                        >
                        </Controls.Button>
                    </div>
                    {openConfVal ? (
                        <Box sx={{paddingRight: '3%'}}>
                        <Typography variant = "subtitle1" sx={{color: 'red', paddingRight: '5%'}}>
                            ¿Está seguro?
                        </Typography>
                        <Controls.Button
                            text="Sí"
                            onClick={() => {setOpenConfVal(false)}}
                        />
                        <Controls.Button
                            text="No"
                            onClick={()=>{
                                setOpenConfVal(false)
                            }}
                        />
                        </Box>
                    ) : (<></>)}
                </Grid>
            </Grid>
        </>
    )
}