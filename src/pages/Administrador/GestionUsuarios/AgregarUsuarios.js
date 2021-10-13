import React from 'react'
import ContentHeader from '../../components/AppMain/ContentHeader'
import { Avatar, Divider, Grid, Stack, Typography } from '@mui/material'
import { DT } from '../../components/DreamTeam/DT'
import { Controls } from '../../components/controls/Controls'
import { useForm } from '../../components/useForm';
/* fake BackEnd */
import * as employeeService from '../../services/employeeService';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

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

export default function AgregarUsuarios() {
    const {
        values,
        // setValues,
        handleInputChange
    } = useForm(initialFieldValues);
    return (
        <>
            <ContentHeader 
                text="Gestión de Usuario"
                cbo= {false}
            />
            <DT.BorderBox>
                <Grid container spacing={2} maxWidth={1}
                    sx={{
                        gridTemplateColumns: "1fr 1fr 1fr ",
                    }}
                >
                    {/* Datos Personales */}
                    <Grid item xs={4} marginY={3} >
                        <Typography variant="h4" marginBottom={2} pl={9}>
                            DATOS PERSONALES
                        </Typography>
                        <Stack direction="column" alignItems="top" spacing={3} px={9}>
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
                        </Stack>
                    </Grid>
                    <Divider orientation="vertical" flexItem sx={{my: 5}} />
                    
                     {/* Restricciones */}
                    <Grid item xs={4} align="left" marginY={3} >
                        <Typography variant="h4" marginBottom={2} pl={9}>
                            RESTRICCIONES  
                        </Typography>
                        <Stack direction="column" alignItems="top" spacing={3} px={9}>
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
                        </Stack>
                    </Grid>
                    <Divider orientation="vertical" flexItem sx={{my: 5}} />

                     {/* Foto del usuario */}
                    <Grid item xs={3.9} align="center" marginY={3} >
                        <Typography variant="h4" marginBottom={2}  pl={6} pr={3}>
                            FOTO REFERENCIAL
                        </Typography>
                        <Stack direction="column" alignItems="center" spacing={3} pl={6} pr={3}>
                            <Avatar src="/broken-image.jpg" sx={{ width: 250, height: 250}} />
                            {/* <Avatar sx={{ width: 250, height: 250}}> 
                                <img className="userImage" src="assets/img/profile-photo.png" alt="" />
                            </Avatar> */}
                            <Controls.Button
                                text="Subir foto"
                                type="submit"   // html property (not component)
                                endIcon={<AddAPhotoIcon />} //Opcional con imagen
                                size="medium"
                                />
                        </Stack>   
                    </Grid>                 
                </Grid>
            </DT.BorderBox>
            <Grid conteiner >
                <Grid item align="right" marginY={3} >
                    <Controls.Button
                        variant="outlined"
                        text="cancelar"
                        />
                        
                    <Controls.Button
                        text="guardar cambios"
                        type="submit"   
                        />
                </Grid>
            </Grid>
        </>
    )
}
