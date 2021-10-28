/* Author: Mitsuo
 * Date: 2021-10-27
 */
import React from 'react'
import { IconButton, Typography, Box } from '@mui/material';
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
    text: 'Please input some text',
    gender: 'male',
    departmentID: '2',
    date: new Date(),
    isPermanent: false
}

function printValues(values) {
    let s = "values:\n"
    for (let key in values) {
        s += `- ${key}: ${values[key]}\n`
    }
    s += "\n"
    return s
}

export default function ControlForm() {
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues);

    return (
        <Form>
            <Typography sx={{
                fontFamily: "monospace",
                whiteSpace: "pre"
            }}>
                {printValues(values)}
            </Typography>
            <Controls.Input 
                name="text"   // name debe ser el mismo nombre de la propiedad 
                              // de initialFieldValues
                label="Text"  
                value={values.text} 
                onChange = {handleInputChange}
            />
            <Controls.RadioGroup
                name="gender"
                label="Radio Group"
                value={values.gender}
                onChange={handleInputChange}
                items={radioGroupValues}
            />
            <Controls.Select
                name="departmentID"
                label="Default value is Marketing"
                value={values.departmentID}
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
                {/* Boton Azul */}
                <Controls.Button
                    text="Submit"
                    type="submit"
                    endIcon={<ErrorOutlineIcon />}
                />
                <Controls.Button
                    variant="disabled"
                    text="Reset"
                    onClick={resetForm}
                />
            </div>
        </Form>
    )
}
