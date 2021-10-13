import React from 'react'
// import ContentHeader from '../../../components/AppMain/ContentHeader'
import ContentHeader from '../../../components/AppMain/ContentHeader'
import { Avatar, Divider, Grid, Input, Stack, Typography } from '@mui/material'
import { DT } from '../../../components/DreamTeam/DT'
import { Controls } from '../../../components/controls/Controls'
import { useForm, Form } from '../../../components/useForm';
import { useTheme } from '@mui/material/styles'
/* fake BackEnd */
import * as employeeService from '../../../services/employeeService';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Box } from '@mui/system'

const initialFieldValues = {
    id: 0,
    nombres: '',
    apellidoMaterno: '',
    apellidoPaterno: '',
    DNI: '',
    correo: '',
    rol: '',
    departamento: '',
    seccion: '',
}

export default function GestionUsuariosForm() {
    const theme = useTheme();
    const ColumnGridItemStyle = {
        padding: theme.spacing(2),
        // align:"left",
    }

    const {
        values,
        // setValues,
        handleInputChange
    } = useForm(initialFieldValues);
    return (
        <>
            <Form>
                <Grid container 
                 sx={{
                    gridTemplateColumns: "1fr 1fr 1fr ",
                }}
                >
                    {/* Datos Personales */}
                    <Grid item xs={4} style ={ColumnGridItemStyle} >
                        <Typography variant="h4" mb={2}>
                            DATOS PERSONALES
                        </Typography>
                        <Controls.Input 
                            name="nombres"   
                            label="Nombre"
                            value={values.nombres} 
                            onChange = {handleInputChange}
                        />
                        <Controls.Input 
                            name="apellidoMaterno"  
                            label="Apellido Materno"  
                            value={values.apellidoMaterno} 
                            onChange = {handleInputChange}
                        />
                        <Controls.Input 
                            name="apellidoPaterno"  
                            label="Apellido Paterno"  
                            value={values.apellidoPaterno} 
                            onChange = {handleInputChange}
                        />
                        <Controls.Input 
                            name="DNI"   
                            label="Documento de Identidad"  
                            value={values.DNI}
                            onChange = {handleInputChange}
                        />
                        <Controls.Input 
                            name="correo"   
                            label="Correo Electrónico"  
                            value={values.correo} 
                            onChange = {handleInputChange}
                        />
                    </Grid>
                    <Divider orientation="vertical" flexItem sx={{mt: 9,mb:2, mx:1}} />
                    
                     {/* Restricciones */}
                    <Grid item xs={4} style={ColumnGridItemStyle} >
                        <Typography variant="h4" marginBottom={2} >
                            RESTRICCIONES  
                        </Typography>
                        <Controls.Select
                            name="rol"
                            label="Rol del Usuario"
                            value={values.rol}
                            onChange={handleInputChange}
                            options={employeeService.getDepartmentCollection()}
                        />
                        <Controls.Select
                            name="departamento"
                            label="Departamento"
                            value={values.departamento}
                            onChange={handleInputChange}
                            options={employeeService.getDepartmentCollection()}
                        />
                        <Controls.Select
                            name="seccion"
                            label="Sección Principal"
                            value={values.seccion}
                            onChange={handleInputChange}
                            options={employeeService.getDepartmentCollection()}
                        />
                    </Grid>
                    <Divider orientation="vertical" flexItem sx={{mt: 9,mb:2, mx:1}} />
                     {/* Foto del usuario */}
                    <Grid item xs style={ColumnGridItemStyle} align="center" >
                        <Typography variant="h4" marginBottom={2}>
                            FOTO REFERENCIAL
                        </Typography>
                        <Avatar src="/broken-image.jpg" sx={{ width: 250, height: 250, mb:2}} />
                        {/* <Avatar sx={{ width: 250, height: 250}}> 
                            <img className="userImage" src="assets/img/profile-photo.png" alt="" />
                        </Avatar> */}
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" 
                                type="file" sx={{display: 'none'}} />
                            <Controls.Button
                                text="Subir foto"
                                // type="submit"   // html property (not component)
                                endIcon={<AddAPhotoIcon />} //Opcional con imagen
                                size="medium"
                                component="span"
                                />
                        </label>
                    </Grid>                 
                </Grid>
                {/* <Grid align="right" marginY={5} > */}
                <Box display="flex" justifyContent="flex-end" mt={5} width={1} >
                    <Controls.Button
                        variant="outlined"
                        text="cancelar"
                        />
                        
                    <Controls.Button
                        text="guardar cambios"
                        type="submit"   
                        />
                </Box>
            </Form>
        </>
    )
}
