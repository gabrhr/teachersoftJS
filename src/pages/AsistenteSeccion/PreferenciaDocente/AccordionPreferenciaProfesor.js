import React from 'react'
import { Paper, Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { DT } from '../../../components/DreamTeam/DT'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetailsPreferenciaProfesor from './AccordionDetailsPreferenciaProfesor'
import { Grid, Divider, Avatar } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LinearProgress from '@mui/material/LinearProgress';

const headers = [
    { id: '1', title: 'Preferencias de dictado de los docentes' }
]

function HeaderBoxs(props) {
    const { headers } = props
    return (  
        headers.map(x => (
            <Box
                width="100%"
                fontSize="20px" fontWeight="500"    // table header style
                color="#042354"
            >
                {x.title}
            </Box>
        ))
    )
}

function generateRow(docente) {
    let tipoDoc = 1;
      switch (docente.tipo_docente){
      case 1:
        tipoDoc = "TC"
        break;  //Se pasa a otro mapeo - ya que no corresponde como profesor
      case 2:
        tipoDoc = "TPC"
        break;
      case 3:
        tipoDoc = "TPA"
        break;
      default:
        tipoDoc = "No asignado";
        break;  //Se pasa a otro mapeo - ya que no corresponde como profesor
      }
      return (
              <Grid container>
                  <Grid item xs={1}>
                    <Avatar>
                        {docente.foto_URL !== ("static/images/avatar/1.jpg" || "")
                          ? <img height = "125%" width = "125%" text-align ="center" alt = "" 
                            src={docente.foto_URL}></img>
                          :  <AccountCircleIcon/>}
                    </Avatar>
                  </Grid>
                  <Grid item xs={4}>
                      <Typography>
                          {`${docente.nombres}, ${docente.apellidos}`}
                      </Typography>
                      <Typography variant="body2" color="darkGray">
                          {docente.codigo_pucp}
                      </Typography>
                  </Grid>
                  <Grid item xs={5}>
                      <Typography >
                          {docente.seccion.nombre}
                      </Typography>
                      <Typography variant="body2" color="darkGray">
                          {tipoDoc}
                      </Typography>
                  </Grid>
              </Grid>
      )
  }

/* Generates a customized row with the data */
function generateRows(profesores) {
    return (
        profesores.map(docente => (
            <Accordion disableGutters>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon color="secondary" />}
                >
                    {generateRow(docente)}
                </AccordionSummary>
                <AccordionDetails>
                    {/* HERE GOES PREFERENCIA PROF LIST */}
                    {/* <Box bgcolor="darkGrey" width="100%" height="100px" /> */}
                    {docente.preferencia.length ? 
                    <AccordionDetailsPreferenciaProfesor preferencia={docente.preferencia}/>
                    :
                      <Box
                          width="100%"
                          fontSize="20px" fontWeight="500"    // table header style
                          color="#042354"
                      >  
                      <Paper elevation={1} sx={{p: 5}}>
                        <Typography variant="body2" color="secondary" align = "center">
                          El docente vacío su lista de preferencias en el ciclo.
                       </Typography>
                      </Paper>
                      </Box>   
                    }
                </AccordionDetails>
            </Accordion>
        ))
    )
} 

export default function     TestPage({profesores, preferenciaCargados}) {
    // console.log(profesores)
    return (
        <>
            <Accordion disabled>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ visibility: "hidden" }} />}
                >
                    <HeaderBoxs headers={headers} />
                </AccordionSummary>
            </Accordion>
            {preferenciaCargados ? (
              generateRows(profesores)
            ) : (
              <Box sx={{ width: '100%' }}>
                <LinearProgress/>
              </Box>
            )}
        </>
    )
}
