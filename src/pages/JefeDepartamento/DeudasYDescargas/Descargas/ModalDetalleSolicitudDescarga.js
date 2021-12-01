import React, {useState, useEffect} from 'react'
import { Grid, Typography, Stack } from '@mui/material';
import { Controls } from '../../../../components/controls/Controls';
import ContentHeader from '../../../../components/AppMain/ContentHeader';
import Divider from '../../../../components/controls/Divider';
import { Box } from '@mui/system';
import { TextField, Avatar } from '@mui/material';

export default function ModalDetalleSolicitudDescarga(){
    const codigo = '23233421'
    const solicitados = '10'

    const [aprobados, setAprobados] = useState(0)

    return(
        <>
            <Typography fontWeight="550"  sx={{color:"primary.light"}}>
                Código: {`${codigo}`}
            </Typography>
            <Divider/>
            <Grid container spacing={{ xs: "10px" }} >
                <Grid item sx={{mt:"10px", mb:"10px", ml:1}}>
                    {/* <Avatar sx={{ width: 50, height: 50}} src={soli}/> */}
                    <Avatar sx={{ width: 50, height: 50}}/>
                </Grid>
                <Grid item sx={{mt:"9px"}}>
                    <Typography variant="h4" display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        {"De: "}
                    </Typography>
                    <Typography variant="h4"   display="inline">
                        {/* Nombre del docente solicitador */}
                        Docente PUCP (correo)
                    </Typography>
                    <div/>
                    <Typography variant="h4" display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        {"Para: \xa0"}
                    </Typography>
                    <Typography variant="body1"  display="inline">
                        {/* Seccion que pertenece */}
                        Seccion
                    </Typography>
                </Grid>
            </Grid>
            <div style={{ display: "flex", paddingRight: "5px", marginTop: 20, marginBottom: 10 }}>
                    <div style={{ width: "650px", marginRight: "50px" }}>
                        <Box ml="75px">
                            <Controls.DreamTitle
                                title={'Justificación: '}
                                size='20px'
                                lineheight='300%'
                            />
                        </Box>
                    </div>
                    <div style={{ width: "140px", marginLeft: "50x", paddingTop:'25px' }}>
                            <Controls.DreamTitle
                                title={`Solicitados: ${solicitados}`}
                                size='20px'
                                lineheight='100%'
                                />
                    </div>
                    <div style={{ width: "120px", marginLeft: "50px", paddingTop:'25px' }}>
                            <Controls.DreamTitle
                                title={`Aprobados: `}
                                size='20px'
                                lineheight='100%'
                            />
                    </div>
                    <div style={{ width: "150px", marginLeft: "2px", paddingTop:'10px' }}>
                            <Controls.Input
                                // label="Buscar Solicitud por Nombre"
                                defaultValue = {aprobados}
                                sx={{ width: .4 }}
                                onChange={(e)=>{setAprobados(e.target.value)}}
                            />
                    </div>
                </div>
            <TextField
                id="outlined-multiline-static"
                fullWidth
                multiline
                rows={6}
                defaultValue={""}
                sx={{
                    pl: "78px",
                    mb: "20px",
                    width: "95%",
                    /* magia negra de gabs */
                    ".css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled": {
                        WebkitTextFillColor: "black"
                    }
                }}
            />
        </>
    )
}