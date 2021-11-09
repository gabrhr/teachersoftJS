import React, {useState, useEffect} from 'react'
import Header1 from '../../constants/Header1'
import { Paper, Grid, Typography} from '@mui/material';
import { Controls } from '../../components/controls/Controls'
import { DT } from '../../components/DreamTeam/DT'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function ErrorDireccionamiento() {
  const divStyle={position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}
  const paperStyle={padding: 20, height:'40vh', width:'100vh', margin:"20px auto"}
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
                  onClick = {() => {}}
                />
              </Grid>
            </Paper>
          </div>
        </>
    )
}
