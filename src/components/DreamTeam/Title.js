/* Author: Mitsuo 
 *
 * Same as title in ContentHeader.js,  but as a reusable component.
 */
import React from 'react'
import { Typography } from '@mui/material'

export default function Title(props) {
    return (
        <Typography 
            variant="h3"
            component="div"
            paddingTop="5px"
            paddingBottom="4px"
            align="left"
            color="primary"
        >
            {props.text}
        </Typography>
    )
}
