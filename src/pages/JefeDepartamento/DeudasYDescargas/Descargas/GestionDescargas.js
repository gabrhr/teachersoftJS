import { Grid, Paper, Typography } from '@mui/material';
import { useLocation } from 'react-router';
import ContentHeader from '../../../../components/AppMain/ContentHeader';
import { Controls } from '../../../../components/controls/Controls';
import TrackinDescarga from '../../../../components/DreamTeam/TrackinDescarga';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import moment from 'moment'
import React, { useState, useContext } from 'react'
import { Avatar, InputAdornment, Box, TableCell, TableRow, Divider } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import {  TableBody } from '@mui/material'
import ListaSolicitudes from './ListaSolicitudes'

export default function GestionDescargas() {
    const location= useLocation()
    const {procesoinit}=location.state
    const PaperStyle = { borderRadius: '20px', pb: 4, pt: 2, px: 2, color: "primary.light", elevatio: 0 }
    function retornar(){
        window.history.back();
    }
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })

    const [valueFecha, setValueFecha] = React.useState([null, null]);

    React.useEffect(() => {
        const fechaIni = moment(valueFecha[0]).format('DD/MM/YYYY')
        const fechaFin = moment(valueFecha[1]).format('DD/MM/YYYY')
        setFilterFn({
          fn: items => {
            if (valueFecha[0]== null && valueFecha[1] == null)
              return items
            if (valueFecha[1]==null)
              return items.filter(x => 
                fechaIni <= moment(x.tracking.fecha_enviado).format('DD/MM/YYYY')
              )
            else{
              return items.filter((x) => fechaIni <= moment(x.tracking.fecha_enviado).format('DD/MM/YYYY') &&
                  moment(x.tracking.fecha_enviado).format('DD/MM/YYYY') <= fechaFin
              )
            }
          }
        })
    }, [valueFecha])



    const handleSearch = e => {
        let target = e.target;
        /* React "state object" (useState()) doens't allow functions, only
          * objects.  Thus the function needs to be inside an object. */
        setFilterFn({
           fn: items => {
             if (target.value == "" || items.length === 0)
               /* no search text */
               return items
             else
               return items.filter(x => x.asunto.toLowerCase()
                   .includes(target.value.toLowerCase()))
           }
        })
    }

    return (
        <>
            <ContentHeader
                text="Solicitudes de Descarga de las Secciones"
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
                <Grid item xs={6} mb={3}>
                        <Controls.Button
                            variant="outlined"
                            text="Regresar"
                            size="small"
                            startIcon={<ArrowBackIcon />}
                            onClick={retornar}
                        />
                </Grid>
            </Grid>
            <Grid container >
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Proceso: {'\u00A0'}
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {procesoinit.nombre} 
                    </Typography >
            </Grid>

            <Grid container direction="row" spacing={3} mb="40px" mt="5px">
                <Grid item xs={2}/>
                    <Grid item xs={7} align="center">
                        <TrackinDescarga item={procesoinit}/>
                    </Grid>
                <Grid item xs={2}/>
                </Grid>
            <Paper variant="outlined" sx={PaperStyle}>
                <div style={{ display: "flex", paddingRight: "5px", marginTop: 20 }}>
                    <div style={{ width: "650px", marginRight: "50px" }}>
                        <Controls.Input
                            label="Buscar Solicitud por Nombre"
                            sx={{ width: 1 }}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                             }}
                            onChange={handleSearch}
                            type="search"
                        />
                    </div>
                    <div style={{ width: "360px", marginRight: "50px" }}>
                        <Controls.RangeTimePicker 
                            value = {valueFecha}
                            setValue= {setValueFecha}
                        /> 
                    </div>
                    <div style={{ width: "360px", marginRight: "50px" }}>
                        <Controls.Select
                            name="seccionID"
                            label="Sección"
                            // value={values.temaTramiteID}
                            // onChange={handleSearchTemas}
                            options={[{id: 0, nombre: "Todos los temas"}]}
                                // .concat(comboData.temaTramite
                                // .sort((x1, x2) => x1.nombre - x2.nombre))}
                        />
                    </div>
                </div>
                <ListaSolicitudes seccion = ""/>
                <Grid conteiner >
                
            </Grid>
            </Paper>

        </>
    )
}
