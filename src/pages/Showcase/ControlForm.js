import React from 'react'
import { Grid, IconButton, Typography } from '@mui/material';
import { useForm, Form } from '../../components/useForm';
import { Controls } from '../../components/controls/Controls';
/* fake BackEnd */
import * as employeeService from '../../services/employeeService';
/* ICONS */
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AddIcon from '@mui/icons-material/Add';

const radioGroupValues = [
    {id: 'male', title: 'Male'},
    {id: 'female', title: 'Female'},
    {id: 'other', title: 'Other'}
]

const initialFieldValues = {
    id: 0,
    text: '',
    gender: 'male',
    departmentID: '',
    date: new Date(),
    isPermanent: false
}

export default function EmployeeForm() {
    const {
        values,
        setValues,
        handleInputChange
    } = useForm(initialFieldValues);

    return (
        <Form>
            <Typography variant="h2" component="div">
                Showcasing DreamTeam Components
            </Typography>
            <Typography variant="body" component="div" my={2} >
                Values: 
                - text: {values.text}
            </Typography>
            <Controls.Input 
                name="text"   // name debe ser el mismo nombre de la propiedad 
                              // de initialFieldValues
                label="Text"  
                value={values.text} 
                onChange = {handleInputChange}
                />
            <Controls.RadioGroup
                name="radioGroupShowcase"
                label="Radio Group"
                value={values.radioGroupShowcase}
                onChange={handleInputChange}
                items={radioGroupValues}
                />
            <Controls.Select
                name="deparmetId"
                label="Select"
                value={values.departmentId}
                onChange={handleInputChange}
                options={employeeService.getDepartmentCollection()}
                />
            <Controls.DatePicker
                name="date"
                label="Date Picker"
                value={values.date}
                onChange={handleInputChange}
                />
            <Controls.Checkbox
                name="isPermanent"
                label="Permanent Employee"
                value={values.isPermanent}
                onChange={handleInputChange}
                />
            <div>   
                <Controls.Button
                    color="primary"
                    text="Submit"
                    type="submit"   // html property (not component)
                    endIcon={<ErrorOutlineIcon />}
                    />
                <Controls.Button
                    variant="contained"
                    disabled
                    text="Disabled"
                    size="medium"
                    />
                <Controls.Button
                    variant="outlined"
                    text="outlined"
                    size="small"
                    />
                <IconButton 
                    aria-label="add"
                    color="secondary"
                    size="large"
                    >
                    <AddIcon />
                </IconButton>
            </div>
        </Form>
    )
}
