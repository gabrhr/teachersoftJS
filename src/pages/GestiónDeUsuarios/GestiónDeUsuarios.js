import React from 'react'
import { makeStyles } from '@mui/styles';
import { IconButton} from '@mui/material';
import { Paper} from '@mui/material';
import { Controls } from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';
import  ContentHeader from '../../components/AppMain/ContentHeader';
import * as employeeService from '../../services/employeeService';
import { Avatar, Divider, Grid, Stack, Typography } from '@mui/material'

const useStyles = makeStyles(theme => ({
    pageContent: {
        // margin: theme.spacing(10),
        // padding: theme.spacing(3),
    }
}))

const initialFieldValues = {
    id: 0,
    text: '',
    gender: 'male',
    departmentID: '',
    date: new Date(),
    isPermanent: false
}

export default function Employees() {

    const classes = useStyles()
    const {
        values,
        // setValues,
        handleInputChange
    } = useForm(initialFieldValues);

    return (
        <> 
            <ContentHeader 
                text="Gestión de usuarios"
                cbo= {false}
            />
            <Grid container sx={{backgroundColor: 'white', width: '100%', gridTemplateColumns: "1fr 1fr"}}>
                <Grid item xs={3}>
                    <Stack direction = 'column' alignItems = 'left' px = {0}>
                        <Controls.Select
                        name="deparmetId"
                        label="Sección"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={employeeService.getDepartmentCollection()}
                        />
                    </Stack>
                </Grid>
            </Grid>
            <Grid container>
                hola
            </Grid>
        </>
    )
}