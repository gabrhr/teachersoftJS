import React from 'react'
import { Stack, Paper, Grid, Avatar, Typography } from '@mui/material'
import Divider from '../controls/Divider'
import { styled } from '@mui/material/styles';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';



export default function Tracking(props) {
    const {estadosTracking}=props
    return (
        <div style={{marginTop:"20px",marginLeft:"5px"}}>
            <Stack 
                direction="column" 
                spacing={.2}
            >
               {
                   estadosTracking.map((item,index) =>
                        <Item key={index} estado={item.estado} completado={item.completado} item={item}/>
                       
                    )
               }
            </Stack>
        </div>
    )
}



function Item(props){
    const {estado, completado, item}=props
    const baseStyle ={width: 50, height: 50, mb:"0px"}
    const styleEnviado={...baseStyle,bgcolor:"enviado.main"}
    const styleEnRevision={...baseStyle,bgcolor:"pendiente.main"}
    const styleDelegado={...baseStyle,bgcolor:"delegado.main"}
    const styleAtendido={...baseStyle,bgcolor:"atendido.main"}
    const styleInactivo={...baseStyle,bgcolor:"inactivo.main"}
    const styleResultado={width: 20, height: 20, mt:"5px", ml:"16px",bgcolor:"primary.main"}
    
    function sxConditional(estado){
        if(completado===false) estado=6
        switch(estado){
            case 1: 
                return styleEnviado
            case 2: 
                return styleEnRevision
            case 3: 
                return styleDelegado  
            case 4: 
                return styleAtendido 
            case 5:
                return styleResultado 
            case 6:
                return styleInactivo 
             
        }
    }

    function iconColor(estado){
        if(completado===false) estado=5
        switch(estado){
            case 1: 
                return {color:"enviado.light"}
            case 2: 
                return {color:"pendiente.light"}
            case 3: 
                return {color:"delegado.light"}
            case 4: 
                return {color:"atendido.light"}
            case 5: 
                return {color:"inactivo.light"}
        }
    }

    function iconEstado(estado){
        switch(estado){
            case 1: 
                return <NearMeOutlinedIcon sx={iconColor(estado)}/>
            case 2: 
                return <AccessTimeOutlinedIcon sx={iconColor(estado)}/>
            case 3: 
                return <HowToRegOutlinedIcon sx={iconColor(estado)}/>
            case 4: 
                return <TaskAltOutlinedIcon sx={iconColor(estado)}/>
            case 5: 
                return <></>
        }
    }

    function getResultado(r){
        return (
            r===1? "Aceptado":r===2? "Rechazado": "-"
        )
    }

    function getContenido(estado, contenido){
        if(estado==2) return "Mesa de Partes"
        else if(estado==3){
            return contenido
        }
    }

    return(
        <>
        <Grid container>
            <Grid item xs={2}>
                <Avatar sx={sxConditional(estado)}>
                    {iconEstado(estado)}
                </Avatar>
                { estado==5? <> </>:
                <hr style={{
                         width: "1px", 
                         height:"25px", 
                         marginLeft:"25px",
                         marginTop:"5px",
                         marginBottom:"5px",
                         borderTop: "0px solid #D4D9EC"
                    }}/>
                }
            </Grid>
            <Grid item xs={9}>
                <Typography variant="body1" style={{fontWeight: "bold"}}>
                    {item.titulo}
                </Typography>
                <Typography variant="body1" style={{color:"primary.light"}}>
                    {getContenido(estado,item.contenido)}
                </Typography>
                <Typography variant="body2" >
                    {estado==5? getResultado(item.fecha) : item.fecha} 
                </Typography>
            </Grid>
        </Grid>
        </>
    );
}  