import React from 'react'
import { Grid , Divider, Stack,Typography, Avatar} from '@mui/material';
import { useForm, Form } from '../../../components/useForm';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTheme } from '@mui/material/styles'
import { Controls } from "../../../components/controls/Controls"
/* fake BackEnd */
import * as employeeService from '../../../services/employeeService';


import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';


const initialFieldValues = {
    id: 0,
    nombre: '',
    correo: '',
}

export default function AgregarEditarDepartamento() {
    const theme = useTheme();
    const ColumnGridItemStyle = {
        padding: theme.spacing(2),
        align:"left",

    }
    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('nombre' in fieldValues)
            temp.nombre = fieldValues.nombre ? "" : "This field is required."
        if ('correo' in fieldValues)
            temp.correo = (/^$|[A-Za-z_]+@[A-Za-z_]+\.[A-Za-z_\.]+$/)
                    .test(fieldValues.correo) ? "" 
                    : "This correo is not vaild."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x === "")
        // Ref:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
    }
    
    const {
        values,
        // setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, true, validate);

    const handleSubmit = e => {
        /* e is a "default parameter" */
        e.preventDefault()
        if (validate())
            window.alert('valid')
        else
            window.alert('invalid')
        console.log(values)
        if (validate())
            employeeService.insertEmployee(values)
            resetForm()
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item sx={6} style={ColumnGridItemStyle}>
                    < Typography variant="h4" mb={2} >
                           DATOS GENERALES  
                    </Typography>
                    
                        <Controls.Input 
                            name="nombre"
                            label="Nombre" 
                            value={values.nombre} 
                            onChange = {handleInputChange}
                            error={errors.nombre}
                        />
                        <Controls.Input 
                            name="correo"
                            label="Correo Electrónico" 
                            value={values.correo} 
                            onChange = {handleInputChange}
                            error={errors.corre}
                        />
                </Grid>
                <Divider orientation="vertical" flexItem sx={{mt: 9,mb:2, ml:9, mr:5}} />
                <Grid item sx={5} style={ColumnGridItemStyle} align="center">
                    <Typography variant="h4" mb={2} >
                        FOTO REFERENCIAL
                    </Typography>
                    <Avatar src="/broken-image.jpg" sx={{ width: 250, height: 250,mb:2}} />
                        {/* <Avatar sx={{ width: 250, height: 250}}> 
                            <img className="userImage" src="assets/img/profile-photo.png" alt="" />
                        </Avatar> */}
                    <Controls.Button
                        text="Subir foto"
                        type="submit"   // html property (not component)
                        endIcon={<AddAPhotoIcon />} //Opcional con imagen
                        size="medium"
                    />
                </Grid>
            </Grid>
            <Grid cointainer align="right" mt={5}>
                <div>
                    <Controls.Button
                        // disabled={true}
                        variant="disabled"
                        text="Cancelar"
                        onClick={resetForm}
                        />
                    <Controls.Button
                        // variant="contained"
                        // color="primary"
                        // size="large"
                        text="Guardar Cambios"
                        type="submit"
                        />
                    
                </div>
            </Grid>
        </Form>
    );
}
