import React, { useEffect, useState } from 'react'
// import ContentHeader from '../../../components/AppMain/ContentHeader'
import ContentHeader from '../../../components/AppMain/ContentHeader'
import { Avatar, Divider, Grid, Input, Stack, Typography } from '@mui/material'
import { DT } from '../../../components/DreamTeam/DT'
import { Controls } from '../../../components/controls/Controls'
import { useForm, Form } from '../../../components/useForm';
import { useTheme } from '@mui/material/styles'

import * as DTLocalServices from '../../../services/DTLocalServices';
import DepartamentoService from '../../../services/departamentoService';
import SeccionService from '../../../services/seccionService.js';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Box } from '@mui/system';

/* SERVICES */ 
import TrabajoService from '../../../services/investigacionService';

const styles = {
    columnGridItem: {
      padding: 2
    }
}


const initialFieldValues = {
    id: 0,
    
    nombre: '',
    apellidoMaterno: '',
    apellidoPaterno: '',
    DNI: '',
    correo: '',
  
    //Originalmente, rol aparecía con '', se cambió para que aparezca al menos uno seleccionado
    
    rol: 1,
   
    foto_URL: '',
    departmentId: 0,
    nombreDepartamento: '',
    seccionId: 0,
    nombreSeccion: '',
    departamento: {
      id: '',
      nombre: ''
    },
    seccion: {
      id: '',
      nombre: ''
    },
    foto_URL: ''
}

  
