/* Author: Manuel
 *
 * Detalle de una solicitud.
 * URL: localhost:3000/doc/solicitudDetalle
 */
import { Grid, Paper} from '@mui/material';
import React, {useContext} from 'react'
import { useLocation } from 'react-router';
import ContentHeader from '../../components/AppMain/ContentHeader';
import { Controls } from '../../components/controls/Controls';
import { UserContext } from '../../constants/UserContext';
import DetalleSoliOrganism from './DetalleSoliOrganism';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ResultadoSolicitud from './ResultadoSolicitud';


export default function SolicitudDetalle() {
    const location= useLocation()
    const {solicitudinit}=location.state
    const { rol} = useContext(UserContext);
    const PaperStyle = { borderRadius: '20px', pb: 4, pt: 2, px: 2, color: "primary.light", elevatio: 0 }
    function retornar(){
        window.history.back();
    }
    return (
        <>
            {/* Encabezado y boton de regreso */}
            <ContentHeader
                text="Mesa de Partes - Detalle de la solicitud"
                cbo={false}
            />
            <Grid
                container
                ml={-1}
                mr={0}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
            <Grid item xs={6} md={1} mb={3}>
                    <Controls.Button
                        variant="outlined"
                        text="Regresar"
                        size="small"
                        startIcon={<ArrowBackIcon />}
                        onClick={retornar}
                    />
            </Grid>
            </Grid>
            <Paper variant="outlined" sx={PaperStyle}>
                {/* Tabla de solicitud y tracking */}
                <DetalleSoliOrganism solicitud={solicitudinit}/>
                {/* Respuesta */}
                { solicitudinit.resultado==0? <> </>:
                    <ResultadoSolicitud solicitud={solicitudinit}/>
                }
            </Paper>
        </>
    )
}
