import React from 'react'
import { Box, Paper, Divider, TableRow, TableCell,InputAdornment, Grid, Typography } from '@mui/material';
import IconButton from './IconButton'
import AddIcon from '@mui/icons-material/Add';
import {makeStyles} from '@mui/styles';
 



 export default function DreamTitle(props){


    const {title, size, lineheight} = props;

    const useStyles = makeStyles(theme => ({
        letter: {
   
           
           /* H4 */
           fontFamily: 'Bell MT',
           fontStyle: 'normal',
           fontWeight: 'normal',
           fontSize: size,
           lineHeight: lineheight,
           
           /* or 25px */
           
           color: '#042354'
        }
    }))

    const classes = useStyles();

    return (
        <Grid direction="row" justifyContent="flex-start">
            <Box className={classes.letter}>
                    {title}
            </Box>
            
        </Grid>
    )
 }