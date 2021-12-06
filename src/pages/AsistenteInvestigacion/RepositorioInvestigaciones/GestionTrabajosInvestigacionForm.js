
//localhost:3000/ai/repoInvestigacionesForm
import React, { useEffect, useState } from 'react'
import { Redirect,useLocation, useHistory, useRouteMatch } from 'react-router-dom'

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
import AgregarEditarInvestiga from  './AgregarEditarInvestiga';
import logout from "../../../assets/images/log-out.png";
/* SERVICES */ 
import TrabajoService from '../../../services/investigacionService';
import Notification from '../../../components/util/Notification'

const styles = {
    columnGridItem: {
      padding: 2
    }
}


export default function GestionTrabajosInvestigacionDetalle(props){

    
    const location = useLocation();
    const {recordForEdit, addOrEdit} = location.state;
    const [recordEdit, setRecordEdit] = useState(null);
    const history = useHistory();
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''});
    const [change, setChange] = useState(false);
 
    const handleLinkClick = () => {

      history.push({
        pathname: './repoInvestigaciones',
 
      });
    }
     


    return(
      <>
        <Controls.Button
          title="Regresar"
          text="Regresar"
          
          startIcon={<img src={logout} />}
          //startIcon={<DeleteIcon />}
          onClick = {() => {handleLinkClick(); }}
        />
        <AgregarEditarInvestiga
          addOrEdit={addOrEdit}    
          recordForEdit={recordForEdit}
          handleLinkClick={handleLinkClick}
          notify={notify}
          setNotify={setNotify}
          change={change}
        />
        <Notification
          notify={notify}
          setNotify={setNotify}
        />
      </>
    )

}
