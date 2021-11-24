import React, { useEffect } from 'react'
import { Grid , Input, Divider, Stack,Typography, Avatar} from '@mui/material';
import { useForm, Form } from '../../../components/useForm';
import { useTheme } from '@mui/material/styles'
import { Controls } from "../../../components/controls/Controls"

import * as employeeService from '../../../services/employeeService';
import UnidadService from '../../../services/departamentoService.js';

const initialFieldValues = {
    id: 0,
    nombre: '',
}

export default AgregarEditarUnidad(props) {

    const {addOrEdit, recordForEdit, setOpenPopup} = props;
    const theme = useTheme();
    const ColumnGridItemStyle = {
        padding: theme.spacing(2),
        align:"left",
    }
    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('nombre' in fieldValues)
            temp.nombre = fieldValues.nombre ? "" : "Este campo es requerido."
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
    } = useForm(recordForEdit? recordForEdit: initialFieldValues, true, validate);
    const handleSubmit = async e => {
        e.preventDefault();
        let fechaCreacion= "";
        if (validate()){
            if(values.id){
                const unid = await UnidadService.getUnidad(values.id);
                fechaCreacion = unid.fecha_creacion;
            }
        }
    }
}