import {DT} from '../../../components/DreamTeam/DT';
import { Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { Box, Divider, TableRow, TableCell,InputAdornment } from '@mui/material';
import { Controls } from '../../../components/controls/Controls'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Popup from '../../../components/util/Popup';
import ModalConfirmacionValidacion from './ModalConfirmacionValidacion';
import { useState } from 'react';

export default function ModalValidarYEnviarSolicitud({solicitud, asunto, setAsunto, cuerpo, setCuerpo, setOpenValYEnvSolPopup,
                                                    openValYEnvSolPopup}){
    const correo = "@efekoefkeof"
    const seccion = "Ingeniería - Informática"
    const [openConfVal, setOpenConfVal] = useState(false)
    return(
        <>
            <DT.Title size="medium" text={'Correo de la unidad: ' + `${correo}`} />
            <Typography variant = "subtitle1">
                Sección: {seccion} 
            </Typography>
            <Divider  flexItem/>
            {/* <DT.HeaderSolicitud solicitud={solicitud} solicitador={true}/> */}
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
            <Divider  flexItem/>
            <Grid container>
                <Grid item xs={6} align="left" mt={5}>
                    <div>
                        <Controls.Button
                            // variant="contained"
                            // color="primary"
                            // size="large"
                            text="Generar reporte"
                            endIcon = {<EmailOutlinedIcon/>}
                        >
                        </Controls.Button>
                    </div>
                </Grid>
                <Grid item xs={6} align="right" mt={5}>
                    <div>
                        <Controls.Button
                            // variant="contained"
                            // color="primary"
                            // size="large"
                            text="Enviar y validar"
                            endIcon = {<EmailOutlinedIcon/>}
                            onClick = {()=>{
                                setOpenConfVal(true)
                                setOpenValYEnvSolPopup(false)
                            }}
                        >
                        </Controls.Button>
                    </div>
                </Grid>
            </Grid>
            <Popup
                openPopup={openConfVal}
                setOpenPopup={setOpenConfVal}
                title="Confirmación"
            >
               <ModalConfirmacionValidacion asunto={asunto} cuerpo={cuerpo} setAsunto={setAsunto} setCuerpo={setCuerpo}
                                            setOpenValYEnvSolPopup={setOpenValYEnvSolPopup} setOpenConfVal={setOpenConfVal}
                                            openValYEnvSolPopup={openValYEnvSolPopup}/>
            </Popup>
        </>
    )
}