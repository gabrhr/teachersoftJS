import React from 'react'
import { Grid } from '@mui/material';
import { useForm, Form } from '../../components/useForm';
import { Controls } from '../../components/controls/Controls';
/* fake BackEnd */
import * as employeeService from '../../services/employeeService';
/* ICONS */
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTheme } from '@mui/material/styles'

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

    const theme = useTheme();

    const ColumnGridItemStyle = {
        padding: theme.spacing(2)       // :D
        // paddingTop: theme.spacing(2),
        // paddingLeft: theme.spacing(1),
        // paddingRight: theme.spacing(1)
    }

    const validate = () => {
        let temp = {}
        temp.fullName = values.fullName ? "" : "This field is required."
        temp.email = (/$^|.+@.+\..+/).test(values.email) ? "" 
            : "This email is not vaild."
        temp.mobile = values.mobile.length===9 ? "" : "9 digits requiered."
        temp.departmentId = values.departmentID.length!==0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "")
        // Ref:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
    }

    const {
        values,
        // setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(initialFieldValues);

    const handleSubmit = e => {
        /* e is a "default parameter" */
        e.preventDefault()
        if (validate())
            window.alert('valid')
        else
            window.alert('invalid')
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6} style={ColumnGridItemStyle}>
                    <Controls.Input 
                        name="fullName"
                        label="Full Name" 
                        value={values.fullName} 
                        onChange = {handleInputChange}
                        error={errors.fullName}
                        />
                    <Controls.Input 
                        name="email"
                        label="Email" 
                        value={values.email} 
                        onChange = {handleInputChange}
                        error={errors.email}
                        />
                    <Controls.Input 
                        name="mobile"
                        label="Mobile" 
                        value={values.mobile} 
                        onChange = {handleInputChange}
                        error={errors.mobile}
                        />
                    <Controls.Input 
                        name="city"
                        label="City" 
                        value={values.city} 
                        onChange = {handleInputChange}
                        />
                </Grid>
                <Grid item xs={6} style={ColumnGridItemStyle}>
                    <Controls.RadioGroup
                        name="gender"
                        label="Gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                        />
                    <Controls.Select
                        name="departmentID"
                        label="Department"
                        value={values.departmentID}
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
                            endIcon={<ErrorOutlineIcon />}
                            />
                        <Controls.Button
                            // disabled={true}
                            variant="disabled"
                            text="Reset"
                            // sx={{
                            //     backgroundColor:"#00ff00",
                            //     color:"#0000ff"
                            // }}
                            />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
