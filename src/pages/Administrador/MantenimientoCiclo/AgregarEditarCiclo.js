import React, { useEffect, useState } from 'react'
import { Grid , Input, Divider, Stack,Typography, Avatar} from '@mui/material';
import { useForm, Form } from '../../../components/useForm';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTheme } from '@mui/material/styles'
import { Controls } from "../../../components/controls/Controls"
import SimpleDatePicker from '../../../components/DreamTeam/SimpleDatePicker';
import Notification from '../../../components/util/Notification'
import ValidationBox from '../../../components/DreamTeam/ValidationBox';
/* fake BackEnd */
import * as employeeService from '../../../services/employeeService';
import CicloService from '../../../services/cicloService.js';
import * as DTLocalServices from '../../../services/DTLocalServices';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';


const thisYear = new Date().getFullYear();
const defaultInitDate = thisYear.toString() + '-03-02';
const defaultEndDate = thisYear.toString() + '-07-02';

let yearList = [];

function populateYearList(){
    yearList = [];
    yearList.push({id: 2020 , nombre: (2020).toString()})
    for (let i = 0; i < 5; i++){
        yearList.push({id: (thisYear + i) , nombre: (thisYear + i).toString()});
    }
}

const initialFieldValues = {
    id: 0,
    anho: thisYear.toString(),
    periodo: '1',
    fecha_inicio: defaultInitDate,
    fecha_fin: defaultEndDate,
}


export default function AgregarEditarCiclo(props) {

    const {addOrEdit, recordForEdit, setOpenPopup} = props
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const ColumnGridItemStyle = {
        padding: theme.spacing(2),
        align:"left",
    }

 
    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('anho' in fieldValues)
            temp.anho = DTLocalServices.requiredField(fieldValues.anho)
        if ('periodo' in fieldValues)
            temp.periodo = DTLocalServices.requiredField(fieldValues.periodo)

        const fechaMin = new Date(fieldValues.fecha_inicio);
        const fechaMax = new Date(fieldValues.fecha_fin);
        if (fechaMin >= fechaMax){
            temp.fecha_inicio = "La fecha de Inicio debe ser menor a la fecha Fin";
            temp.fecha_fin = "La fecha de Fin debe ser mayor a la fecha de Inicio";
        }
        if (fechaMin >= fechaMax){
            setOpen(true);
            //alert("La fecha de Inicio debe ser menor a la fecha Fin");
        }

        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x === "")
    }
 

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(recordForEdit? recordForEdit: initialFieldValues, true, validate);

    const handleSubmit = async e => {
        /* e is a "default parameter" */
        e.preventDefault();

        

        let fechaCreacion= "";
        if (validate()){
          //window.alert('valid')
          if(values.id) {
            const ciclo = await CicloService.getCiclo(values.id);
            fechaCreacion = ciclo.fecha_creacion;
          }
          let aux_fecha_inicio = new Date(values.fecha_inicio);
          let aux_fecha_fin = new Date(values.fecha_fin);
          aux_fecha_inicio.setDate(aux_fecha_inicio.getDate() - 1);
          aux_fecha_fin.setDate(aux_fecha_fin.getDate() - 1);
          const newCiclo = {
            id: values.id,
            activo: 1,
            fecha_creacion: fechaCreacion,
            fecha_modificacion: null,
            anho: values.anho,
            periodo: values.periodo,
            fecha_inicio: aux_fecha_inicio,
            fecha_fin: aux_fecha_fin,
          }
          console.log("FECHA INICIO SUBMIT:",values.fecha_inicio)
        //   if(values.fecha_inicio<values.fecha_fin) console.log("CORRECTA COMPARACION")
        //   else console.log("INCORRECTA COMPARACION")
          addOrEdit(newCiclo,resetForm);

        }
    }

    useEffect(() => {

          if (recordForEdit != null) {
              /* object is not empty */

              let aux_fecha_inicio = new Date(recordForEdit.fecha_inicio);
              let aux_fecha_fin = new Date(recordForEdit.fecha_fin);
              aux_fecha_inicio.setDate(aux_fecha_inicio.getDate() + 1);
              aux_fecha_fin.setDate(aux_fecha_fin.getDate() + 1);

              setValues({
                id: recordForEdit.id,
                anho: recordForEdit.anho,
                periodo: recordForEdit.periodo,
                fecha_inicio: aux_fecha_inicio.toString(),
                fecha_fin: aux_fecha_fin.toString(),
                  //...recordForEdit
              })
          }
    }, [recordForEdit]);

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item sx={6} style={ColumnGridItemStyle}>
                    
                    {populateYearList()}
                    <Controls.Select
                        name="anho"
                        label="Año del Ciclo"
                        value={values.anho ? values.anho : yearList[0]}
                        onChange={handleInputChange}
                        options={yearList}
                        error={errors.anho}
                    />
                    <Controls.Select
                        name="periodo"
                        label="Periodo del Ciclo"
                        value={values.periodo}
                        onChange={handleInputChange}
                        options={[{id: '0', nombre: '0'},{id: '1', nombre: '1'},{id: '2',nombre: '2'}]}
                        error={errors.periodo}
                    />
                    
                </Grid>
                <Grid item sx={6} style={ColumnGridItemStyle}>
                    {console.log("FECHA INICIO:",values.fecha_inicio)}
                    <SimpleDatePicker
                        name="fecha_inicio"
                        label="Fecha Inicio"
                        value={values.fecha_inicio}
                        year={values.anho}
                        onChange={handleInputChange}
                        error={errors.fecha_inicio}
                    />
                    <SimpleDatePicker
                        name="fecha_fin" 
                        label="Fecha Fin"
                        value={values.fecha_fin}
                        year={values.anho}
                        onChange={handleInputChange}
                        error={errors.fecha_fin}
                    />
                    <ValidationBox
                        open = {open}
                        setOpen = {setOpen}
                        text = {"Verificar que la fecha de Inicio de ciclo sea menor a la fecha de fin de ciclo."}
                    />
                </Grid>
                
            </Grid>
            <Grid cointainer align="right" mt={5}>
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
        </Form>
    )
}
