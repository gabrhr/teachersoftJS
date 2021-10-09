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
                        name="fullName"
                        label="Full Name" 
                        value={values.fullName} 
                        onChange = {handleInputChange}
                        />
                    <Controls.Input 
                        name="email"
                        label="Email" 
                        value={values.email} 
                        onChange = {handleInputChange}
                        />
                    <Controls.Input 
                        name="mobile"
                        label="Mobile" 
                        value={values.mobile} 
                        onChange = {handleInputChange}
                        />
                    <Controls.Input 
                        name="city"
                        label="City" 
                        value={values.city} 
                        onChange = {handleInputChange}
                        />
                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup
                        name="gender"
                        label="Gender"
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
                    <Controls.DatePicker type="date"
                        name="hireDate"
                        label="Hire Date"
                        value={values.hireDate}
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
                            // variant="contained"
                            // color="primary"
                            // size="large"
                            text="Submit"
                            type="submit"   // html property (not component)
                            />
                        <Controls.Button
                            // disabled={true}
                            variant="asdf"
                            text="Reset"
                            sx={{
                                backgroundColor:"#00ff00",
                                color:"#0000ff"
                            }}
                            />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
