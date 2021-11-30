import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { IconButton, Box, Divider, Paper, TableBody, Grid, TableRow, TableCell,Typography, InputAdornment } from '@mui/material';
import { Controls } from '../../../components/controls/Controls'
import { StyledTableCell, StyledTableRow } from '../../../components/controls/StyledTable';
import { useForm, Form } from '../../../components/useForm';
import useTable from "../../../components/useTable";

import TrabajoService from '../../../services/investigacionService';
import StyleDictionary from '../../../components/DreamTeam/StyleDictionary';

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


    
    const stylish = {
        
        borderBottom: "1px solid gray",
        display: "flex",
        justifyContent: "space-between",
    }

    

    const {values, detail, setDetail} = props;

    const PaperStyle = { borderRadius: '20px', pb: 4, pt: 2, px: 2, color: "primary.light", elevatio: 0 }
    const SubtitulosTable={display:"flex"  }

    useEffect( ()=> {
         

        setDetail(false);
        
      }, [detail])
  
    
      


    return(
        <>
            
            <Paper variant="outlined" sx={PaperStyle}>
                <StyleDictionary title="Código:" text={values.codigo_publicacion}/>
                <StyleDictionary title="Título:" text={values.titulo}/>
                <StyleDictionary title="Tipo:" text={values.tipo_publicacion}/>
                <StyleDictionary title="Indicador de calidad:" text={values.indicador_calidad == 0 ? "Indizada" :
                                       values.indicador_calidad == 1 ? "Arbitrada" : "No Arbitrada"}/>
                <StyleDictionary title="Subtipo:" text={values.subtipo_publicacion == 0 ? "Académica" :
                           values.subtipo_publicacion == 1 ? "Profesional" : "Otros"}/>
                <StyleDictionary title="Año de Producción:" text={values.anho_publicacion}/>
                <StyleDictionary title="Responsabilidad:" text={values.responsabilidad == 0 ? "Autor" :
                                  values.responsabilidad == 1 ? "Editor": "Autor de la parte"}/>
                <StyleDictionary title="Divulgación:" text={values.divulgacion}/>
                <StyleDictionary title="Editorial:" text={values.editorial}/>
                <StyleDictionary title="Idioma:" text={values.idioma}/>
                <StyleDictionary title="Volumen:" text={values.volumen}/>
                <StyleDictionary title="Edición:" text={values.edicion}/>
                <StyleDictionary title="Base de datos:" text={values.motor_busqueda}/>
                
                <StyleDictionary title="Ciudad:" text={values.ciudad}/>
                <StyleDictionary title="País:" text={values.pais}/>
                <StyleDictionary title="ISBN:" text={values.isbn}/>
                
                <StyleDictionary title="ISSN:" text={values.issn}/>
                <StyleDictionary title="DOI:" text={values.doi}/>
                <StyleDictionary title="Medio de publicación:" text={values.medio_publicacion}/>
                <StyleDictionary title="Filiación PUCP:" text={values.filiacion == 1 ? "Si" : "No"}/>
                <StyleDictionary title="Especialidad Unesco:" text={values.especialidad_unesco}/>
                
                

                
            </Paper>
        </>
    );

}