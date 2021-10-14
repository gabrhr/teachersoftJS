import React, {useState} from 'react'
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

import MessageBoxOK from '../../../components/util/MessageBoxOK';

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
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', message: '', type: ''})
    const [fotoPerfil, setFotoPerfil] = React.useState(null);
    const [fileFoto, setFileFoto] = React.useState(null);
    const [cambio, setCambio] = React.useState(false);
    const ColumnGridItemStyle = {
        padding: theme.spacing(2),
        // align:"left",
    }
    const handleSubmit = e => {
        e.preventDefault()
        setConfirmDialog({
            ...confirmDialog ,
            isOpen: false,
        })
    }

    function onSubmit () {
        setConfirmDialog({
            ...confirmDialog ,
            isOpen: false,
        })
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
                        <Avatar src={fotoPerfil} sx={{ width: 250, height: 250, mb:2}} />
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" 
                                type="file" sx={{display: 'none'}} 
                                onChange={(event) => {
                                    const files = event.target.files
                                    //console.log(files[0]);

                                    setFileFoto(files[0])
                                    setCambio(true)

                                    if (files && files[0]) {
                                        var reader = new FileReader();
                                        reader.onload = function (e) {
                                            setFotoPerfil(e.target.result)
                                        };
                                        reader.readAsDataURL(files[0]);

                                    }
                                }}    
                            />
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
                        onClick = {() => {
                            setConfirmDialog({
                                isOpen: true,
                                title: 'Confirmacion',
                                message: 'Se confirmó la adición',
                                onConfirm: () => {onSubmit()}
                                } )
                            }
                        } 
                        />
                </Box>
            </Form>
            <MessageBoxOK
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}
