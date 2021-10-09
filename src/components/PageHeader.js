import React from 'react'
import { Paper, Card, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(themex => ({
    root: {
        backgroundColor: '#fdfdff'
    },
    pageHeader: {
        padding: themex.spacing(4),
        display: 'flex',
        marginBottom: themex.spacing(2)
    },
    pageIcon: {
        display: 'inline-block',
        padding: themex.spacing(2),
        color: '#3c44b1'
    },
    pageTitle: {
        paddingLeft: themex.spacing(4),
        '& .MuiTypography-body1': {
            opacity: '0.6'
        }
    }
}))

export default function PageHeader(props) {
    const classes = useStyles();
    const {title, subtitle, icon} = props;

    return (
        <Paper elevation={0} square className={classes.root}>
            <div>
                <Card className={classes.pageIcon}>
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
