import React from 'react'
import ControlForm from './ControlForm'
import PageHeader from '../../components/PageHeader'
import AdbIcon from '@mui/icons-material/Adb';
import { Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    }
}))

export default function Employees() {
    const classes = useStyles()

    return (
        <>
            {/* <PageHeader 
                // USELESS,  needs to be passed down or something
                // className={classes.pageContent}
                title="Showcasing Components"
                subtitle="by DreamTeam"
                icon={<AdbIcon fontSize="large"/>}
                /> */}
            <Paper className={classes.pageContent}>
                <ControlForm />
            </Paper>
        </>
    )
}
