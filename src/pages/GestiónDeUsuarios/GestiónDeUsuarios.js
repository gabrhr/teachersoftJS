import React from 'react'
import { makeStyles } from '@mui/styles';
import HeaderUser from '../../components/PageComponents/HeaderUser';
import fotoUsuario from '../../assets/images/profile-photo.png'
import { IconButton, Typography } from '@mui/material';
import { Paper, Grid} from '@mui/material';

const useStyles = makeStyles(theme => ({
    pageContent: {
        // margin: theme.spacing(10),
        // padding: theme.spacing(3),
    }
}))

export default function Employees() {
    const classes = useStyles()

    return (
        <>
            <HeaderUser
                nombre="New Employee"
                rol="Form design with validation"
                foto={fotoUsuario}
            />
            <Grid container  marginY={0} sx={{backgroundColor: 'white',
                                 width: '100%',
                                 height: '60vh' }}
            >
                zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzhola
            </Grid>
        </>
    )
}