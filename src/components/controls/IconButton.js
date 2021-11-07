import React from 'react'
import { Stack, IconButton as MuiIconButton, Typography } from '@mui/material/'

export default function IconButton(props) {
    let {text, size, color, onClick, sx, ...other} = props

    return (
        <Stack direction="row" spacing={1}>
            <Typography
                size={size || "medium"}
                color={color || "primary"}
                {...other}
            >
                {text}
            </Typography>
            <MuiIconButton
                size="small"
                color={color || "DTButton"}
                disableFocusRipple={true}
                onClick={onClick}
                {...other}
                sx={sx}
            >

            </MuiIconButton>
        </Stack>
    )
}
