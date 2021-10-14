import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/material';
import Button from "./Button";

export default function AddButton(props) {

    const { title, variant, onClick} = props;

    return (
        <Grid   direction="row" container justifyContent="flex-end" alignItems="center" >
            <Grid item xs = {12} md ={2}>
              <Box  x={{width: .25, display: "flex", justifyContent: 'flex-end'}}>
                <Typography align="center">
                  {title}
                </Typography>
              </Box>
            </Grid>
            <Grid >
              <Box  x={{width: .25, display: "flex", justifyContent: 'flex-end'}}>
                <Button
                  variant= {variant}
                  startIcon={<AddIcon/>}
                  onClick = {onClick}
                />
              </Box>
            </Grid>
          </Grid>
    )
}