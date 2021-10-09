import React from 'react'
import { Paper, Card, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fdfdff'
    },
    pageHeader: {
        padding: theme.spacing(4),
        display: 'flex',
        marginBottom: theme.spacing(2)
    },
    pageIcon: {
        display: 'inline-block',
        padding: theme.spacing(2),
        // No hace nada
        // color: '#3c44b1'
    },
    pageTitle: {
        paddingLeft: theme.spacing(4),
        '& .MuiTypography-body1': {
            opacity: '0.6'
        }
    },
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    }
}))

export default function PageHeader(props) {
    const classes = useStyles();
    const {title, subtitle, icon} = props;

    return (
        <Paper elevation={0} square className={classes.pageContent}>
            <div>
                <Card classes={{root:classes.pageIcon}}>
                    {icon}
                </Card>
                <div className={classes.pageIcon}>
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body1" component="div">
                        {subtitle}
                    </Typography>
                </div>
            </div>
        </Paper>
    )
}
