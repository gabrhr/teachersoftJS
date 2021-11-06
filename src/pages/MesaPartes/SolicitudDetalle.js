/* Author: Manuel
 *
 * Detalle de una solicitud.
 * URL: localhost:3000/doc/solicitudDetalle
 */
import React, {useState, useEffect} from 'react'
import {makeStyles} from '@mui/styles';
import { Controls } from '../../components/controls/Controls'
import ContentHeader from '../../components/AppMain/ContentHeader';
import { Box, Paper, Divider, TableRow, TableCell,InputAdornment, Grid, Typography, TextField } from '@mui/material';

/*ICONS*/
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const initialFieldValues = {
    seccionID: '',
  }
    

export default function SolicitudDetalle() {

    const [records, setRecords] = useState([])
    /* no filter function initially */

    /* STYLES
    * ====== */
    const SubtitulosTable = { display: "flex" }
    const PaperStyle = { borderRadius: '20px', pb: 4, pt: 2, px: 2, color: "primary.light", elevatio: 0 }

  

    return (
        <>
        <Grid
            container
            ml={-1}
            mr={0}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
        >

        <Grid  item xs={6} md={8} >
          <ContentHeader
            text="Mesa de Partes - Detalle de la solicitud"
            cbo={false}
          />
        </Grid>
        <Grid   item xs={6} md={3}     ></Grid>
        <Grid item xs={6} md={1} >
            <Controls.Button
                text ="Volver"
                variant="outlined"
                size='small'
                fullWidth
                
            />
          </Grid>
        </Grid>
        <Paper variant="outlined" sx={PaperStyle}>
         <Grid container spacing={2}>
            <Grid item xs={6} md={8}>
                <Box>
                    <Controls.DreamTitle
                        title ={'Trámite: ' + 'Nombre del trámite - Ejemplo'}
                        size = '25px'
                        lineheight = '150%'
                    />
                    <Typography variant = "subtitle1">
                        Sección: {' ' + 'Ingeniería '}
                    </Typography>
                    
                </Box>
                <Divider  flexItem/>
                <Box>
                    <Controls.DreamTitle
                        title ={'Asunto: ' + 'Ejemplo de Asunto'}
                        size = '20px'
                        lineheight = '300%'
                    />
                </Box>
                <TextField
                    id="outlined-multiline-static"
                    fullWidth 
                    multiline
                    rows={5}
                    defaultValue="Debido a ..."
                />
                <Grid item xs={0.3} md={0.3}/>
                <Divider  flexItem/>
                <Box>
                    <Controls.DreamTitle
                        title ={'Archivos Adjuntos: ' }
                        size = '16px'
                        lineheight = '300%'
                    />
                    <Controls.FileButton
                        
                        text="Iniciar Sesión"
                    />
                </Box>
            </Grid>
            <Grid item xs={0.3} md={0.3}/>
            <Divider orientation="vertical" flexItem sx={{marginTop : '20px'}} />
            <Grid item xs={6} md={3}>
                <Controls.DreamTitle
                    title ={'Respuesta a la Solicitud'}
                    size = '18px'
                    lineheight = '150%'
                />
            </Grid>
        </Grid>
        <Grid item xl={6} md={6} sm={12} xs={12}>
            
        </Grid>
 
        </Paper>
         </>
    )
}
