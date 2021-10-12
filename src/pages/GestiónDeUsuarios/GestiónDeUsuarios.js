import React from 'react'
import { makeStyles } from '@mui/styles';
import { IconButton, Typography } from '@mui/material';
import { Paper, Grid} from '@mui/material';
import { Controls } from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';
import  ContentHeader from '../../components/AppMain/ContentHeader';
import * as employeeService from '../../services/employeeService';

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
            <Grid container sx={{backgroundColor: 'white'}}>
                
                <Controls.Select
                name="deparmetId"
                label="Sección"
                value={values.departmentId}
                onChange={handleInputChange}
                options={employeeService.getDepartmentCollection()}
                />
            </Grid>
        </>
    )
}