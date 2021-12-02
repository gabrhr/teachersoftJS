import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { IconButton, Box, Divider, Paper, TableBody, Grid, TableRow, TableCell,Typography, InputAdornment, Avatar } from '@mui/material';
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
    especialidad_UNESCO:  '',
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
    foto_url: '',
    codigo_pucp: '20160500',
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
        
      //  borderTop: "1px solid gray",
        borderBottom: "2px solid gray",
 
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
                <div style={stylish}>
                    < Typography variant="h4" mb={2} > Información del Autor: </Typography>
                    <Grid align="center">   
                        <Avatar src={values.foto_url} sx={{ width: 200, height: 200, mb: 2 }} />
                    </Grid>
                    <StyleDictionary title="Código:" text={values.codigo_pucp}/>
                    <StyleDictionary title="Nombre Completo:" text={values.nombreAutor}/>
                    <StyleDictionary title="Responsabilidad:" text={values.responsabilidad == 0 ? "Autor" :
                                  values.responsabilidad == 1 ? "Editor": "Autor de la parte"}/>
                </div>
                <br />
                <div style={stylish}>
                    <Typography variant="h4" mb={2} > Información General de la Publicación: </Typography>
                    <StyleDictionary title="Código:" text={values.codigo_publicacion}/>
                    <StyleDictionary title="Título:" text={values.titulo}/>
                    <StyleDictionary title="Tipo:" text={values.tipo_publicacion}/>
                    <StyleDictionary title="Año de Producción:" text={values.anho_publicacion}/>
                    <StyleDictionary title="Idioma:" text={values.idioma}/>
                    <StyleDictionary title="Ciudad:" text={values.ciudad}/>
                    <StyleDictionary title="País:" text={values.pais}/>
                    <StyleDictionary title="URL:" text={values.url_repositorio} url={values.url_repositorio}/>
                    
                    
                </div>
                
                <br />
                <div style={stylish}>
                    <Typography variant="h4" mb={2} > Información de Identificación de la publicación: </Typography>
                    <StyleDictionary title="ISBN:" text={values.isbn}/>
                    <StyleDictionary title="ISSN:" text={values.issn}/>
                    <StyleDictionary title="DOI:" text={values.doi} url={values.doi}/>
                </div>
                <br />
                <div style={stylish}>
                    <Typography variant="h4" mb={2} > Información del Medio de Publicación: </Typography>
                    <StyleDictionary title="Medio de publicación:" text={values.medio_publicacion}/>
                    <StyleDictionary title="Divulgación:" text={values.divulgacion}/>
                    <StyleDictionary title="Editorial:" text={values.editorial}/>
                    <StyleDictionary title="Edición:" text={values.edicion}/>
                    <StyleDictionary title="Volumen:" text={values.volumen}/>
                    <StyleDictionary title="N° Revista:" text={values.nro_revista}/>
                    <StyleDictionary title="Páginas:" text={"p. " + values.pagina_inicial + "-" + values.pagina_final + " ( " + 
                                                            (Math.abs(values.pagina_final - values.pagina_inicial)) + " páginas )"}/>
                    <StyleDictionary title="Base de datos:" text={values.motor_busqueda}/>
                    <StyleDictionary title="Especialidad Unesco:" text={values.especialidad_UNESCO}/>
                </div>
                <br />
                <div style={stylish}>
                    <Typography variant="h4" mb={2} >Información PUCP de la publicación: </Typography>
                    <StyleDictionary title="Filiación PUCP:" text={values.filiacion == 1 ? "Si" : "No"}/>
                    <StyleDictionary title="Tipo Referencia:" text={values.tipo_referencia == 1 ? "Por Docente" : "Terceros"}/>
                    <StyleDictionary title="Indicador de calidad:" text={values.indicador_calidad == 0 ? "Indizada" :
                                       values.indicador_calidad == 1 ? "Arbitrada" : "No Arbitrada"}/>
                    <StyleDictionary title="Identificador de Producción:" text={values.identificador_produccion}/>
                             
                    <StyleDictionary title="Publicación Validada:" text={values.validacion_preliminar == 1 ? "Si" : "No"}/>
                    <StyleDictionary title="Código de Validación:" 
                            text={
                                  values.validacion_preliminar == 0 ? "*SIN VALIDAR*" :
                                  values.codigo_validacion == 0 ? "A1" :
                                  values.codigo_validacion == 1 ? "L1" : 
                                  values.codigo_validacion == 2 ? "L2" : 
                                  values.codigo_validacion == 3 ? "P1" : 
                                  values.codigo_validacion == 4 ? "A2" : 
                                  values.codigo_validacion == 5 ? "L3" : 
                                  values.codigo_validacion == 6 ? "P2" : 
                                  "*SIN VALIDAR*"
                                  }/>
                </div>
 
            </Paper>
        </>
    );

}