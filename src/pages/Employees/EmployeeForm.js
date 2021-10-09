import React from 'react'
import { Grid } from '@mui/material';
import { useForm, Form } from '../../components/useForm';
import { Controls } from '../../components/controls/Controls';
/* fake BackEnd */
import * as employeeService from '../../services/employeeService';

const genderItems = [
    {id: 'male', title: 'Male'},
    {id: 'female', title: 'Female'},
    {id: 'other', title: 'Other'}
]

const initialFieldValues = {
    id: 0,
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    gender: 'male',
    departmentID: '',
    hireDate: new Date(),
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
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input 
                        label="Full Name" 
                        name="fullName"
                        value={values.fullName} 
                        onChange = {handleInputChange}
                        />
                    <Controls.Input 
                        label="Email" 
                        name="email"
                        value={values.email} 
                        onChange = {handleInputChange}
                        />
                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup
                        label="Gender"
                        name="gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                        />
                    <Controls.Select
                        name="departmentId"
                        label="Department"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={employeeService.getDepartmentCollection()}
                        />
                </Grid>
            </Grid>
        </Form>
    )
}
