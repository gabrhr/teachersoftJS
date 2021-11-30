import React from 'react'
import ContentHeader from '../../components/AppMain/ContentHeader';
import { Box, Paper, Divider, TableRow, TableCell, InputAdornment, Grid, Typography, TextField, Stack } from '@mui/material';
import { Controls } from '../../components/controls/Controls'
import { useForm, Form } from '../../components/useForm';
import { useTheme } from '@mui/material/styles'

const initialFieldValues = {
    id: '',
    title: ''
}

export default function IndicadoresSeccion() {

    const [ciclo, setCiclo] = React.useState ([]);
    const theme= useTheme();

    const {
        values,
        setValues,
        handleInputChange
    } = useForm(initialFieldValues);

    return (
        <>
            <ContentHeader
                text="Dashboard"
                cbo={false}
            />
            <Typography variant="body1" color={"#00008B"} my={2}>
                DATA ACTUAL DEL CICLO
            </Typography>
            <Grid container spacing={1} ml={".3px"} style={{border: "1px solid grey"}}>
                <Grid item xs={3}>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                    Numero de Profesores TC:
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={4}>
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                    Numero de Profesores TPC:
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                    Promedio de Horas TPC:
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={4}>
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                    Numero de Profesores TPA:
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                    Promedio de Horas TPA:
                    </Typography>
                    
                </Grid>
                <Grid item xs={0.75}/>
                <Divider orientation="vertical" flexItem sx={{marginTop : '20px', mr:"10px", ml:"20px"}} />
                <Grid item xs={3.5}>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                    Numero de Profesores con deuda:
                    </Typography>
                </Grid>
                <Grid item xs={0.5}/>
                <Divider orientation="vertical" flexItem sx={{marginTop : '20px', mr:"10px", ml:"20px"}} />
                <Grid item xs={3}>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                    Numero de Investigadores:
                    </Typography>
                </Grid>
            </Grid>
            <Divider flexItem sx={{marginTop : '20px', mr:"10px", ml:"20px"}} />
            <ContentHeader
                text="aea"
                cbo={true}
                records = {ciclo}
                setRecords = {setCiclo}
            />
            <Typography variant="body1" color={"#00008B"} my={.5}>
            
            </Typography>
            <Grid container spacing={1} ml={".3px"} style={{border: "1px solid grey"}}>
                <Grid item xs={3}>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                    Numero de Profesores del Ciclo:
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                    Promedio de horas de Dictado:
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}
