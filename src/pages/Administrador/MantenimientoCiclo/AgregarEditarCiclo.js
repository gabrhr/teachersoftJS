import React, { useEffect } from 'react'
import { Grid , Input, Divider, Stack,Typography, Avatar} from '@mui/material';
import { useForm, Form } from '../../../components/useForm';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTheme } from '@mui/material/styles'
import { Controls } from "../../../components/controls/Controls"
/* fake BackEnd */
import * as employeeService from '../../../services/employeeService';
import CicloService from '../../../services/cicloService.js';
import * as DTLocalServices from '../../../services/DTLocalServices';



const thisYear = new Date().getFullYear();

let yearList = [];

function populateYearList(){
    yearList = [];
    for (let i = 0; i < 10; i++){
        yearList.push({id: (thisYear + i) , nombre: (thisYear + i).toString()});
    }
}

const initialFieldValues = {
    id: 0,
    anho: thisYear.toString(),
    periodo: '1',
    fechaInicio: '',
    fechaFin: '',
}


export default function AgregarEditarCiclo(props) {

    const {addOrEdit, recordForEdit, setOpenPopup} = props

    const theme = useTheme();
    const ColumnGridItemStyle = {
        padding: theme.spacing(2),
        align:"left",
    }

    ///////////////////////////
    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('anho' in fieldValues)
        temp.anho = DTLocalServices.requiredField(fieldValues.anho)
      if ('periodo' in fieldValues)
        temp.periodo = DTLocalServices.requiredField(fieldValues.periodo)
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x === "")
    }
    ///////////////////////////

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
          const newCiclo = {
            id: values.id,
            activo: 1,
            fecha_creacion: fechaCreacion,
            fecha_modificacion: null,
            anho: values.anho,
            periodo: values.periodo,
            fecha_inicio: values.fecha_inicio,
            fecha_fin: values.fecha_fin,
          }

          addOrEdit(newCiclo,resetForm);

        }
    }

    useEffect(() => {

          if (recordForEdit != null) {
              /* object is not empty */
              setValues({
                  ...recordForEdit
              })
          }
    }, [recordForEdit]);

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item sx={6} style={ColumnGridItemStyle}>
                    < Typography variant="h4" mb={2} >
                           DATOS GENERALES
                    </Typography>
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
                    <Controls.DatePicker
                        name="fechaInicio"
                        label="Fecha Inicio"
                        value={values.fechaInicio}
                        onChange={handleInputChange}
                        error={errors.fechaInicio}
                    />
                    <Controls.DatePicker
                        name="fechaFin"
                        label="Fecha Fin"
                        value={values.fechaFin}
                        onChange={handleInputChange}
                        error={errors.fechaFin}
                    />
                    
                </Grid>
                
            </Grid>
            
        </Form>
    )
}
