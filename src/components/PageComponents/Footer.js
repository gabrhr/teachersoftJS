import React from 'react'
import { Grid } from '@mui/material';

export default function Footer() {
    return (
        <div>
             <Grid 
             container
                spacing={0} 
                sx={{
                    width: "100%",
                    height: "20px",
                    backgroundColor:'primary.main', 
                }}
            />
        </div>
    )
}
