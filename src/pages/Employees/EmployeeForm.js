import React, { useEffect } from 'react'
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

export default function EmployeeForm(props) {

    const { addOrEdit, recordForEdit } = props

    const theme = useTheme();

    const ColumnGridItemStyle = {
        padding: theme.spacing(2)       // :D
        // paddingTop: theme.spacing(2),
        // paddingLeft: theme.spacing(1),
        // paddingRight: theme.spacing(1)
    }
    /* for "onSubmit" validation */
    const validateOG = () => {
        let temp = {...errors}
        temp.fullName = values.fullName ? "" : "This field is required."
        // FIX:  pepe1@asdf.com  should be valid and a@a.com.  not
        temp.email = (/^$|[A-Za-z0-9_]+@([A-Za-z0-9_]+\.)+[A-Za-z_]+$/)
                .test(values.email) ? "" 
                : "This email is not vaild."
        // temp.mobile = values.mobile.length===9 ? "" : "Minimum 9 digits requiered."
        temp.mobile = (/^\d\d\d\d\d\d\d\d\d$/).test(values.mobile) ? "" 
                : "Minimum 9 digits requiered."
        temp.departmentID = values.departmentID.length!==0 ? "" 
                : "This field is required."
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "")
        // Ref:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
    }

    /* for "onChange" validation (real time validation) */
    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/^$|[A-Za-z_]+@[A-Za-z_]+\.[A-Za-z_\.]+$/)
                    .test(fieldValues.email) ? "" 
                    : "This email is not vaild."
        // temp.mobile = values.mobile.length===9 ? "" : "Minimum 9 digits requiered."
        if ('mobile' in fieldValues)
            temp.mobile = (/^\d\d\d\d\d\d\d\d\d$/).test(fieldValues.mobile) ? "" 
                    : "Minimum 9 digits requiered."
        if ('departmentID' in fieldValues)
            temp.departmentID = fieldValues.departmentID.length!==0 ? "" 
                    : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x === "")
        // Ref:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues)//, true, validate);

    const handleSubmit = e => {
        /* e is a "default parameter" */
        e.preventDefault()
        // if (validate())
        //     window.alert('valid')
        // else
        //     window.alert('invalid')
        if (validateOG())
            addOrEdit(values, resetForm)
    }

    /* "detect the change of recordForEdit inside this bottom component" */
    useEffect(() => {
        if (recordForEdit != null) {
            /* object is not empty */
            setValues({
                ...recordForEdit
            })
        }
    }, [recordForEdit])

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
                        error={errors.departmentID}
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
                            type="submit"
                            endIcon={<ErrorOutlineIcon />}
                            />
                        <Controls.Button
                            // disabled={true}
                            variant="disabled"
                            text="Reset"
                            onClick={resetForm}
                            />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
