import React, { useEffect, useState } from 'react'
import { Grid , Input, Divider, Stack,Typography, Avatar} from '@mui/material';
import { useForm, Form } from '../../../components/useForm';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTheme } from '@mui/material/styles'
import { Controls } from "../../../components/controls/Controls"
import horarioService from '../../../services/horarioService';

export default function EditarHorarioCurso(props) {
    const {recordForEdit, setOpenPopup} = props
    
    const [newCodigo, setCodigo] = useState(recordForEdit.codigo);
    const [errorCodigo, setErrorCodigo] = useState(false);
    
    const [newHoras1, setHoras1] = useState(recordForEdit.sesiones[0].horas);
    const [errorHoras1, setErrorHoras1] = useState(false);
    
    const [newHoras2, setHoras2] = useState(recordForEdit.sesiones[1] ? recordForEdit.sesiones[1].horas : -1);
    const [errorHoras2, setErrorHoras2] = useState(false);

    const [newURL, setURL] = useState('');

    const theme = useTheme();
    const ColumnGridItemStyle = {
        padding: theme.spacing(2),
        align:"left",

    }

    function isNumeric(num){
        return !isNaN(num)
    } 

    const validate = () => {
        let errores = 0;
        if(newCodigo === ""){
            setErrorCodigo(true);
            errores++;
        }
        if(!isNumeric(newHoras1) || newHoras1 === "" || parseInt(newHoras1) <= 0){
            setErrorHoras1(true)
            errores++;
        }
        if(!isNumeric(newHoras2) || newHoras2 === "" || parseInt(newHoras2) <= 0){
            setErrorHoras2(true)
            errores++;
        }
        if(parseInt(newHoras2) === -1){
            setErrorHoras2(false)
            errores--
        }
        if(errores){
            return false
        }else{
            return true
        }
    }

    const handleSubmit = async e => {
        /* e is a "default parameter" */
        e.preventDefault();
        if (validate()){
            const updtHor ={
                "id": recordForEdit.id,
                "codigo": newCodigo,
                "curso_ciclo":{
                  "id": recordForEdit.curso_ciclo.id,
                },
                sesiones: [{
                  "id": recordForEdit.sesiones[0].id,
                  "secuencia": recordForEdit.sesiones[0].secuencia,
                  "sesion_docentes": recordForEdit.sesiones[0].sesion_docentes,
                  "horas": parseInt(newHoras1),
                  "tipo_dictado": recordForEdit.sesiones[0].tipo_dictado
                }],
            }
            if(recordForEdit.sesiones[1]){
                updtHor.sesiones.push({
                    "id": recordForEdit.sesiones[1].id,
                    "secuencia": recordForEdit.sesiones[1].secuencia,
                    "sesion_docentes": recordForEdit.sesiones[1].sesion_docentes,
                    "horas": parseInt(newHoras2),
                    "tipo_dictado": recordForEdit.sesiones[1].tipo_dictado
                  })
            }
            const resultado = await horarioService.updateHorario(updtHor)
            console.log(resultado)
            setOpenPopup(false)
            //console.log(updtHor)
        }
//        if (validate())
//            addOrEdit(values,resetForm)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container spacing = {3} direction = "column">
                <Grid item sx={6}>
                    < Typography variant="h4" mb={2} >
                           DATOS DEL HORARIO
                    </Typography>
                        <Controls.Input
                            name="horario"
                            label="Código del horario"
                            defaultValue={recordForEdit.codigo}
                            onChange = {(e)=>{
                                setCodigo(e.target.value)
                            }}
                            error = {errorCodigo}
                            helperText = {errorCodigo && "Este campo está vacío"}
                        />
                    < Typography variant="h4" mb={2} >
                           DATOS DE LAS SESIONES
                    </Typography>
                        <Controls.Input
                            name="horas1"
                            label= {recordForEdit.sesiones[0].secuencia === 0 ? "Horas Clase" 
                            : "Horas Laboratorio"}
                            defaultValue={recordForEdit.sesiones[0].horas}
                            onChange = {(e)=>{
                                setHoras1(e.target.value)
                            }}
                            error = {errorHoras1}
                            helperText = {errorHoras1 && "Este campo es incorrecto"}
                        />
                        <Controls.Input
                            name="horas2"
                            label= {recordForEdit.sesiones[1] ? 
                                    (recordForEdit.sesiones[1].secuencia === 0 ? "Horas Clase" 
                                    : "Horas Laboratorio") :"No disponible" 
                                    }
                            defaultValue={recordForEdit.sesiones[1] ? recordForEdit.sesiones[1].horas : ""
                                          }
                            onChange = {(e)=>{
                                setHoras2(e.target.value)
                            }}
                            error = {errorHoras2}
                            helperText = {errorHoras2 && "Este campo es incorrecto"}
                            disabled = {recordForEdit.sesiones[1] ? false : true}
                        />
                </Grid>
                {/*<Grid item sx={6} md = {6} style={ColumnGridItemStyle}>
                        < Typography variant="h4" mb={2} >
                            &nbsp;
                        </Typography>
                        < Typography variant="h4" mb={2} >
                            &nbsp;
                        </Typography>
                        < Typography variant="h4" mb={2} >
                            &nbsp;
                        </Typography>
                        
                        </Grid>*/}
                <Grid item sx = {6} align = "right">
                    <div>
                        <Controls.Button
                            // disabled={true}
                            variant="disabled"
                            text="Cancelar"
                            onClick={()=> setOpenPopup(false)}
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
            </Grid>
            
        </Form>
    );
}
