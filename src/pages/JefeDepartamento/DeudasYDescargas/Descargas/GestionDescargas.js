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
import { Form, useForm } from '../../../../components/useForm';

const initialFieldValues = {
    /* PROCESO */
    seccionID: 0
}

export default function GestionDescargas() {
    const location= useLocation()
    const {procesoinit}=location.state
    const PaperStyle = { borderRadius: '20px', pb: 4, pt: 2, px: 2, color: "primary.light", elevatio: 0 }
    function retornar(){
        window.history.back();
    }
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues);

    const handleSubmit = async e => {
        /* e is a "default parameter" */
        e.preventDefault()
        if (validate()){

        }
            // addOrEdit(values, resetForm)
    }

    // React.useEffect(() => {
    //     if (recordForEdit != null) {
    //         /* object is not empty */
    //         setValues({
    //             ...recordForEdit
    //         })
    //     }
    // }, [recordForEdit])

    const validate = () => {
        let temp = {...errors}
        temp.nombre = values.nombre ? "" : "Campo requerido"
        
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "")
        // Ref:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
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
                    <Grid item xs={1.5}/>
                        <Grid item xs={6} align="center">
                            <TrackinDescarga item={procesoinit}/>
                        </Grid>
                    <Grid item xs={3}/>
                    </Grid>
                <Paper variant="outlined" sx={PaperStyle}>
                    <ListaSolicitudes seccion = ""/>
                    <Grid conteiner >
                    
                </Grid>
                </Paper>
            </Form>
        </>
    )
}
