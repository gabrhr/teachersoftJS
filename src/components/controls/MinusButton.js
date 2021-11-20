/* Author: m4rc3l0
 * 
 * Reusable component text + MinusIcon
 */
import React from 'react'
import RemoveIcon from '@mui/icons-material/Remove';
import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/material';
import Button from "./Button";

export default function MinusButton(props) {

    const { title, variant, color, onClick} = props;

    return (
        <Grid   direction="row" container 
            justifyContent="flex-end" alignItems="center"
            marginTop={2}
        >
            <Grid item xs = {12} md ={2}>
              <Box  x={{width: .25, display: "flex", justifyContent: 'flex-end'}}>
                <Typography align="right">
                  {title || props.text}
                </Typography>
              </Box>
            </Grid>
            <Grid >
              <Box  x={{width: .25, display: "flex", justifyContent: 'flex-end'}}>
                <Button
                  variant= {variant}
                  startIcon={<RemoveIcon/>}
                  onClick = {onClick}
                />
              </Box>
            </Grid>
          </Grid>
    )
}
