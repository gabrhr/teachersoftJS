import React from 'react'
import { Stack, IconButton as MuiIconButton, Typography, Checkbox } from '@mui/material/'

export default function RowCheckBox(props) {
    let {text, size, color, onClick, sx, ...other} = props

    return (
        <Stack direction="row" spacing={0.1}>
            <Checkbox
                size="small"
                color={color || "DTButton"}
                onClick={onClick}
                {...other}
                sx={sx}
            >

            </Checkbox>
        </Stack>
    )
}