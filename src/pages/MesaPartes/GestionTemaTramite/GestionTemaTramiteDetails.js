import React, { useEffect, useState } from 'react'
// import ContentHeader from '../../../components/AppMain/ContentHeader'
import ContentHeader from '../../../components/AppMain/ContentHeader'
import { Avatar, Divider, Grid, Input, Stack, Typography, Paper } from '@mui/material'
import { DT } from '../../../components/DreamTeam/DT'
import { Controls } from '../../../components/controls/Controls'
import { useForm, Form } from '../../../components/useForm';
import { useTheme } from '@mui/material/styles'
/* fake BackEnd */
import * as DTLocalServices from '../../../services/DTLocalServices';
import DepartamentoService from '../../../services/departamentoService';
import SeccionService from '../../../services/seccionService.js';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Box } from '@mui/system';
import tematramiteService from '../../../services/tematramiteService';


 

/*SERVICES*/ 


const styles = {
    columnGridItem: {
      padding: 2
    }
  }

  export default function GestionTemaTramiteDetails(props){

    const id_tramite = localStorage.getItem("id_tramite");
    console.log( 'HiJO:  ' + id_tramite);
    const { idTramite, detail, setDetail} = props;
    
    
    const PaperStyle = { borderRadius: '20px', pb: 4, pt: 2, px: 2, color: "primary.light", elevatio: 0 }

    
    useEffect(() => {
        if (detail != null) {
        // object is not empty
        setDetail( localStorage.getItem("id_tramite"));
        }
    }, [detail])

    


    return(
        <>
         <Paper variant="outlined" sx={PaperStyle}>
            {idTramite}
         </Paper>
        </>
    )
 

  }
