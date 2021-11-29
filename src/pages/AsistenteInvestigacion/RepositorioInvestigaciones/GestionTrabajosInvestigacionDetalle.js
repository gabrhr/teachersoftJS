import React, { useEffect, useState } from 'react';
import { IconButton, Box, Divider, Paper, TableBody, Grid, TableRow, TableCell,Typography, InputAdornment } from '@mui/material';
import { Controls } from '../../../components/controls/Controls'
import { StyledTableCell, StyledTableRow } from '../../../components/controls/StyledTable';
import { useForm, Form } from '../../../components/useForm';
import useTable from "../../../components/useTable";

const initialFieldValues = {
    id: 0,
    activo: 0,
    anho_publicacion: '',
    ciudad:  '',
    codigo_publicacion:  '',
    codigo_validacion:  '',
    divulgacion:  '',
    doi:  '',
    edicion:  '',
    editorial:  '',
    especialidad_unesco:  '',
    fecha_creacion:  '',
    fecha_modificacion:  '',
    filiacion:  '',
    identificador_produccion:  '',
    idioma:  '',
    indicador_calidad:  '',
    isbn:  '',
    issn:  '',
    medio_publicacion: '',
    motor_busqueda:  '',
    nro_revista:  '',
    observaciones_de_departamento:  '',
    observaciones_para_departamento:  '',
    pagina_final:  '',
    pagina_inicial:  '',
    pais:  '',
    palabras_clave:  '',
    responsabilidad:  '',
    subtipo_publicacion:  '',
    tipo_publicacion:  '',
    tipo_referencia:  '',
    titulo:  '',
    url_repositorio:  '',
    validacion_preliminar:  '',
    volumen:  '',
    
    //autor
    autor:  '',
    idAutor:  '',
    nombreAutor: '',
}

export default function GestionTrabajosInvestigacionDetalle(props){


    

    const {recordForView, detail, setDetail} = props;

    const {
        values,
        setValues
    } = useForm(recordForView ? recordForView : initialFieldValues )





    const PaperStyle = { borderRadius: '20px', pb: 4, pt: 2, px: 2, color: "primary.light", elevatio: 0 }

    useEffect(() => {
         
          
        if (recordForView != null) {
            
            setValues(
            ...recordForView
            )
          
          }
          setDetail(false);
      }, [ detail])
  
    


    return(
        <>
            <Paper variant="outlined" sx={PaperStyle}>
               Título:  {values.title}
            </Paper>
        </>
    );

}