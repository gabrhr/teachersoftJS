
import React, {useState,useEffect, Component } from 'react'
import { Grid, Typography, Paper } from '@mui/material';


export default function BigStatistics(props){

    const {title, text, fontWeight , variantTitle, variantText} = props;

    return (

        <Grid
            container
            spacing={0}
            align="center"
            justify="center"
            direction="column"
        >
        <Grid item >

            <Typography   variant={variantText ? variantText : "h1"} fontWeight={fontWeight ? fontWeight : "550"} my={1}  sx={{color:"primary.light"}} > {text } </Typography>
            <Typography   variant={variantTitle ? variantTitle : "h4"} my={1}  sx={{color:"primary.light"}} > {title } </Typography>
   
        </Grid>
      </Grid>

    );
}