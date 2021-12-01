import React, {useState, useEffect} from 'react'
import { Grid, Typography, Stack } from '@mui/material';
import { Controls } from '../../../../components/controls/Controls';
import ContentHeader from '../../../../components/AppMain/ContentHeader';
import Divider from '../../../../components/controls/Divider';
import { Box } from '@mui/system';
import { TextField, Avatar } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { Form, useForm } from '../../../../components/useForm';

const initialFieldValues = {
    justificacion: '',
    aprobados: ''
}

export default function ModalDetalleSolicitudDescarga({setOpenDetalle}){
    const codigo = '23233421'
    const solicitados = '10'

    const [aprobados, setAprobados] = useState(0)

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues);

    const validate = () => {
        let temp = {...errors}
        temp.nombre = values.nombre ? "" : "Campo requerido"
        
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "")
        // Ref:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
    }

    const handleSubmit = async e => {
        /* e is a "default parameter" */
        e.preventDefault()
        if (validate()){

        }
            // addOrEdit(values, resetForm)
    }

    return(
        <>
        <Form onSubmit={handleSubmit}>
            <Typography fontWeight="550"  sx={{color:"primary.light"}}>
                Código: {`${codigo}`}
            </Typography>
            <Divider/>
            <Grid container spacing={{ xs: "10px" }} >
                <Grid item sx={{mt:"10px", mb:"10px", ml:1}}>
                    {/* <Avatar sx={{ width: 50, height: 50}} src={soli}/> */}
                    <Avatar sx={{ width: 50, height: 50}}/>
                </Grid>
                <Grid item sx={{mt:"9px"}}>
                    <Typography variant="h4" display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        {"De: "}
                    </Typography>
                    <Typography variant="h4"   display="inline">
                        {/* Nombre del docente solicitador */}
                        Docente PUCP (correo)
                    </Typography>
                    <div/>
                    <Typography variant="h4" display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        {"Para: \xa0"}
                    </Typography>
                    <Typography variant="body1"  display="inline">
                        {/* Seccion que pertenece */}
                        Seccion
                    </Typography>
                </Grid>
            </Grid>
            <div style={{ display: "flex", paddingRight: "5px", marginTop: 20, marginBottom: 10 }}>
                    <div style={{ width: "650px", marginRight: "50px" }}>
                        <Box ml="75px">
                            <Controls.DreamTitle
                                title={'Justificación: '}
                                size='20px'
                                lineheight='300%'
                            />
                        </Box>
                    </div>
                    <div style={{ width: "140px", marginLeft: "50x", paddingTop:'25px' }}>
                            <Controls.DreamTitle
                                title={`Solicitados: ${solicitados}`}
                                size='20px'
                                lineheight='100%'
                                />
                    </div>
                    <div style={{ width: "120px", marginLeft: "50px", paddingTop:'25px' }}>
                            <Controls.DreamTitle
                                title={`Aprobados: `}
                                size='20px'
                                lineheight='100%'
                            />
                    </div>
                    <div style={{ width: "150px", marginLeft: "2px", paddingTop:'10px' }}>
                            <Controls.Input
                                // label="Buscar Solicitud por Nombre"
                                value={values.aprobados}
                                onChange={handleInputChange}
                                sx={{ width: .4 }}
                            />
                    </div>
                </div>
            <TextField
                id="outlined-multiline-static"
                fullWidth
                multiline
                rows={6}
                defaultValue={values.justificacion}
                onChange={handleInputChange}
                sx={{
                    pl: "78px",
                    mb: "20px",
                    width: "95%",
                    /* magia negra de gabs */
                    ".css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled": {
                        WebkitTextFillColor: "black"
                    }
                }}
            />
            <Grid item align = "right" marginTop={5} >
                <Controls.Button
                    text="Guardar"
                    endIcon={<SaveIcon/>} 
                    type="submit"
                    />
            </Grid>
            </Form>
        </>
    )
}