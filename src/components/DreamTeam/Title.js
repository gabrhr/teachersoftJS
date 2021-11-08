/* Author: Mitsuo 
 *
 * Same as title in ContentHeader.js,  but as a reusable component.
 */
import React from 'react'
import { Typography } from '@mui/material'

export default function Title(props) {
    const { text, ...other } = props
    let variant = "h3"      // size="big"  (default)
    let pb = 2              // padding bottom (default)
    if (props.size === "medium") {
        variant = "h5"  // h3 > h5 > h4  (LO SIENTO TANTO)
    } else if (props.size === "small") {
        variant = "h4"
        pb = 1
    }
    return (
        <Typography 
            variant={variant}
            // fontWeight={"bold"}
            // paddingTop="5px"
            // paddingBottom="4px"
            pb={pb}
            align="left"
            color="primary.light"
            {...other}
        >
            {text}
        </Typography>
    )
}
