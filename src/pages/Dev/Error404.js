import React, {useContext, useEffect} from 'react'
import Header1 from '../../constants/Header1'
import { Paper, Grid, Typography} from '@mui/material';
import { Controls } from '../../components/controls/Controls'
import { DT } from '../../components/DreamTeam/DT'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useHistory } from 'react-router';
import { UserContext } from '../../constants/UserContext';

export default function ErrorDireccionamiento() {
  const divStyle={position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}
  const paperStyle={padding: 20, height:'40vh', width:'100vh', margin:"20px auto"}
  const history = useHistory();
  const { rol} = useContext(UserContext);

    function getPaginaInicial(){
      switch (rol) {
        case 0:
            return history.push("/admin");
        case 1:
            return history.push("/doc");
        case 2:
            return history.push("/as");
        case 3:
            return history.push("/cord");
        case 4:
            return history.push("/ad"); 
        case 5:
            return history.push("/jd"); 
        case 6:
            return history.push("/secretaria");
        case 7:
            return history.push("/invitado");
        default:
            return history.push("/registro");
            //return history.push("/noRoles");
      }
    }
    return (
        <>
          <Header1 />
          <div style={divStyle}>
            <Paper elevation={10} style={paperStyle}>
              <Grid container
                spacing={0}
                direction="column" 
                alignItems="center" 
                justify="center"
                style={{minHeight: '100vh'}}
              >
                <ErrorOutlineIcon color="error" style={{ fontSize: 100 }}/>
                <DT.Title size="big" text="ERROR 404" />
                <Controls.Divider/>
                <DT.Title size="medium" text="Esta página no se encuentra disponible en estos momentos."/>
                <DT.Title size="medium" text="Disculpe las molestias"/>
                <Controls.Button
                  text="Volver a la página principal"
                  type="submit"
                  onClick = {() => {getPaginaInicial()}}
                />
              </Grid>
            </Paper>
          </div>
        </>
    )
}
