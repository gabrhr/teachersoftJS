import React from 'react'
import { Grid } from '@mui/material';

export default function Footer() {
    return (
        <div>
             <Grid 
                spacing={0} 
                sx={{
                    width: "100%",
                    height: "3vh",
                    backgroundColor:'primary.main', 
                }}
            />
        </div>
    )
}
