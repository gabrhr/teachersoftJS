import React, { useEffect, useState } from 'react';
import { IconButton, Box, Divider, Paper, TableBody, Grid, TableRow, TableCell,Typography, InputAdornment } from '@mui/material';
import { Controls } from '../../../components/controls/Controls'
import { StyledTableCell, StyledTableRow } from '../../../components/controls/StyledTable';
import { useForm, Form } from '../../../components/useForm';
import useTable from "../../../components/useTable";

import TrabajoService from '../../../services/investigacionService';

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

    idAutor:  '',
    nombreAutor: '',
}

const getDocumento = async (id_trabajo) => {
    
    const trabajo = initialFieldValues;

    if (id_trabajo == null)
        return 0;

    if (id_trabajo <= 0)
        return 0;
        

    let dataTrabajo = await TrabajoService.getDocumento(id_trabajo);

    trabajo.id = dataTrabajo.id;
    trabajo.titulo = dataTrabajo.titulo;

    return trabajo
}

export default function GestionTrabajosInvestigacionDetalle(props){


    
    

    

    const {values, detail, setDetail} = props;

    const PaperStyle = { borderRadius: '20px', pb: 4, pt: 2, px: 2, color: "primary.light", elevatio: 0 }
    const SubtitulosTable={display:"flex"}

    useEffect( ()=> {
         

        setDetail(false);
        
      }, [detail])
  
    


    return(
        <>
            
            <Paper variant="outlined" sx={PaperStyle}>
            <Typography  style={SubtitulosTable} >
                Código: {values.codigo_publicacion}
            </Typography>
            <Typography  style={SubtitulosTable} >
                Título: {values.titulo}
            </Typography>
            <Typography  style={SubtitulosTable} >
                Tipo: {values.tipo_publicacion}
            </Typography>
            <Typography  style={SubtitulosTable} >
                Indicador de calidad: {values.indicador_calidad == 0 ? "Indizada" :
                                       values.indicador_calidad == 1 ? "Arbitrada" : "No Arbitrada"}
            </Typography>
            <Typography  style={SubtitulosTable} >
                Subtipo:  {values.subtipo_publicacion == 0 ? "Académica" :
                           values.subtipo_publicacion == 1 ? "Profesional" : "Otros"}
            </Typography>
            <Typography  style={SubtitulosTable} >
                Año de Producción: {values.anho_publicacion}
            </Typography>
            <Typography  style={SubtitulosTable} >
                Responsabilidad: {values.responsabilidad == 0 ? "Autor" :
                                  values.responsabilidad == 1 ? "Editor": "Autor de la parte"}
            </Typography>
            <Typography  style={SubtitulosTable} >
                Divulgación: {values.divulgacion}
            </Typography>
            Id: {values.id}
            
            
            </Paper>
        </>
    );

}