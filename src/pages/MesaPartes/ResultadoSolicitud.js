import React from 'react'
import { Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Controls } from '../../components/controls/Controls'
import { DT } from '../../components/DreamTeam/DT'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

function getColorIcon(resultado){
    if(resultado===1)
        return {color:"#43DB7F"} //Verde de aceptado
    return {color:"#DC395F"} //Verde de aceptado

}

function obtenerResultadoBox(resultado){
    return (
        <Box
            sx={{
                width:"180px",
                height: "40px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "50px",
                padding:"2px"
            }}
        >
            <Stack direction="row" spacing={2} p={1} ml={2}>
                <PanoramaFishEyeIcon sx={getColorIcon(resultado)}/>
                <Typography variant="body2" style={{pt:"20px"}}>
                    {resultado===1? "Aprobado":"Rechazado"}
                </Typography> 
            </Stack>
        </Box> 
    )
}

export default function ResultadoSolicitud(props) {
    // TODO: display:
    // - solicitud.fecha_atendido
    // - solicitud.delegado.rolName
    const {solicitud}=props

    return (
        <div style={{marginTop:"5px"}}>
            <Controls.Divider/>
            <Typography variant="h5" mx={2} mt={2}>
                Resultado de la Solicitud
            </Typography>
            <DT.HeaderSolicitud solicitud={solicitud} solicitador={false}/>
            <Stack direction="row" spacing={2} p={1} ml={"52px"}>
                <Typography variant="body1" mx={2} mt={1} fontWeight="550">
                    Resultado:
                </Typography>
                {obtenerResultadoBox(solicitud.resultado)}
            </Stack>
            <Typography variant="body1" mx={2} my={1} ml={"76px"} fontWeight="550">
                    Observación a la Solicitud:
            </Typography>
            <TextField
                id="outlined-multiline-static"
                multiline
                rows={6}
                // value={solicitud.observacion}
                defaultValue={solicitud.observacion}
                disabled
                sx={{
                    ml:"75px",
                    mr: "20px",
                    width: "62.5%",
                    ".css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled":{
                        WebkitTextFillColor:"black"
                    }
                }}
            />
        </div>
    )
}
